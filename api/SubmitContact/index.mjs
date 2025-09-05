import fetch from "node-fetch";
import FormData from "form-data";

/**
 * Fetch the reCAPTCHA score for the user's submission, as evaulated by Google.
 * @param token {string} reCAPTCHA token to evaluate.
 * @param ip {string|undefined} IP address of the user.
 * @returns {Promise<unknown>} JSON response from Google reCAPTCHA v3 verify API. This response is expected to have at
 *   least a floating point "score" value in the root level of the JSON.
 * @see {@link https://developers.google.com/recaptcha/docs/verify} Google reCAPTCHA verify API documentation
 * @see {@link https://developers.google.com/recaptcha/docs/v3} Google reCAPTCHA v3 verify API response definition
 */
async function fetchGoogleCaptchaScore(token, ip) {
  let body = `response=${token}&secret=${process.env.RecaptchaSecret}`;
  if (ip) {
    body += `&remoteip=${ip}`;
  }
  return fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    body: body,
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
}

/**
 * Generate an error message HTTP response for the client. This Response can be returned from an Azure Function
 * directly.
 * @param code {number} HTTP status code to return.
 * @param message {string} Error message to return.
 * @returns {{httpResponse: {status: number, body: {error: string}}}}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Response} JavaScript HTTP Response object definition
 */
function createError(code, message) {
  return {
    httpResponse: {
      status: code,
      body: { error: message },
    },
  };
}

/**
 * Send an email using Mailgun API.
 * @param name {string} Name of the person sending the email.
 * @param email {string} Email address of the person sending the email.
 * @param subject {string} Subject of the email.
 * @param body {string} Body of the email.
 * @returns {Promise<void>} Promise that resolves when the request to Mailgun to send an email is complete.
 * @throws Error if the email could not be sent.
 * @see {@link https://documentation.mailgun.com/docs/mailgun/api-reference/send/mailgun/messages/post-v3--domain-name--messages}
 *   Mailgun API documentation
 */
async function sendEmail(name, email, subject, body) {
  const form = new FormData();
  form.append("from", `${name} <${process.env.SenderEmail}>`);
  form.append("h:Reply-To", `${name} <${email}>`);
  form.append("to", `${process.env.RecipientEmail}`);
  form.append("subject", "[CONTACT] " + subject);
  form.append("text", body);

  const response = await fetch("https://api.mailgun.net/v3/ecr.dev/messages", {
    method: "POST",
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(`api:${process.env.MailgunApiKey}`).toString("base64"),
      ...form.getHeaders(),
    },
    body: form,
  });

  if (response.status !== 200) {
    throw new Error(response.statusText + ": " + (await response.text()));
  }
}

export default async function (context, req) {
  if (!req.body) {
    return createError(400, "Missing contact form submission.");
  }

  let name = req.body.name;
  let email = req.body.email;
  let subject = req.body.subject;
  let body = req.body.body;
  let token = req.body.token;

  if (!name || !email || !subject || !body) {
    return createError(400, "Missing required fields.");
  }

  if (!token) {
    return createError(401, "Missing Google Recaptcha token.");
  }

  let score;
  try {
    const assessment = await fetchGoogleCaptchaScore(
      token,
      req.headers["x-forwarded-for"]
    );
    const body = await assessment.json();
    if (!body.success) {
      const errorMessage =
        "Received reCAPTCHA error codes: " + body["error-codes"].join(", ");
      context.log(errorMessage);
      return createError(500, errorMessage);
    }
    if (body.action !== "contactSubmit") {
      context.log("Invalid reCAPTCHA action received");
      return createError(400, "Invalid reCAPTCHA action received");
    }
    score = body.score;
  } catch (err) {
    context.log(err);
    return createError(500, "reCAPTCHA error");
  }
  if (score < 0.7) {
    return createError(403, "Recaptcha failed. Try again, or come back later.");
  }

  name = name.substring(0, 300);
  email = email.substring(0, 300);
  subject = subject.substring(0, 100);
  body = body.substring(0, 2000);

  if (subject.length < 5 || body.length < 20) {
    return createError(
      400,
      "subject must be between 5 and 100 characters, and body must be between 20 and 2000 characters."
    );
  }

  try {
    await sendEmail(name, email, subject, body);
  } catch (err) {
    console.error(err);
    return createError(500, "Failed to send email. Please try again later.");
  }

  return {
    httpResponse: {
      body: {
        message:
          "Thank you for contacting me! I will get back to you as soon as possible.",
      },
    },
  };
}
