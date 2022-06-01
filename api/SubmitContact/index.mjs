import fetch from "node-fetch";

async function assess(token, ip) {
  let body = `response=${token}&secret=${process.env.RecaptchaSecret}`;
  if (ip) {
    body += `&ip=${ip}`;
  }
  return fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    body: body,
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
}

export default async function (context, req) {
  if (!req.body) {
    return {
      httpResponse: {
        status: 400,
        body: { error: "Missing contact form submission." },
      },
    };
  }

  let name = req.body.name;
  let email = req.body.email;
  let subject = req.body.subject;
  let body = req.body.body;
  let token = req.body.token;

  if (!name || !email || !subject || !body) {
    return {
      httpResponse: {
        status: 400,
        body: { error: "Missing required fields." },
      },
    };
  }

  if (!token) {
    return {
      httpResponse: {
        status: 401,
        body: { error: "Missing Google Recaptcha token" },
      },
    };
  }

  let assessment;
  let score;
  try {
    assessment = await assess(token, req.headers["x-forwarded-for"]);
    const body = await assessment.json();
    if (!body.success) {
      context.log(
        "Received reCAPTCHA error codes: " + body["error-codes"].join(", ")
      );
      return {
        httpResponse: {
          status: 500,
          body: {
            error:
              "Received reCAPTCHA error codes: " +
              body["error-codes"].join(", "),
          },
        },
      };
    }
    if (body.action !== "contactSubmit") {
      context.log("Invalid reCAPTCHA action received");
      return {
        httpResponse: {
          status: 400,
          body: { error: "Invalid reCAPTCHA action" },
        },
      };
    }
    score = body.score;
  } catch (err) {
    context.log(err);
    return {
      httpResponse: {
        status: 500,
        body: { error: "reCAPTCHA error" },
      },
    };
  }
  if (score < 0.7) {
    return {
      httpResponse: {
        status: 403,
        body: { error: "Recaptcha failed. Try again, or come back later." },
      },
    };
  }

  name = name.substring(0, 300);
  email = email.substring(0, 300);
  subject = subject.substring(0, 100);
  body = body.substring(0, 2000);

  if (subject.length < 5 || body.length < 20) {
    return {
      httpResponse: {
        status: 400,
        body: {
          error:
            "subject must be between 5 and 100 characters, and body must be between 20 and 2000 characters.",
        },
      },
    };
  }

  return {
    httpResponse: {
      body: {
        message:
          "Thank you for contacting me! I will get back to you as soon as possible.",
      },
    },
    emailOutput: {
      personalizations: [
        {
          to: [{ email: process.env.RecipientEmail }],
        },
      ],
      reply_to: {
        email: email,
        name: name,
      },
      from: {
        email: process.env.SenderEmail,
        name: name,
      },
      subject: "[CONTACT] " + subject,
      content: [
        {
          type: "text/plain",
          value: body,
        },
      ],
    },
  };
}
