module.exports = async function(context, req) {
	if(!req.body) {
		return {
			httpResponse: {
				status: 400,
				body: { error: "Missing contact form submission." }
			}
		};
	}

	let name = req.body.name;
	let email = req.body.email;
	let subject = req.body.subject;
	let body = req.body.body;

	if(!name || !email || !subject || !body) {
		return {
			httpResponse: {
				status: 400,
				body: { error: "Missing required fields." }
			}
		};
	}

	name = name.substring(0, 300);
	email = email.substring(0, 300);
	subject = subject.substring(0, 100);
	body = body.substring(0, 2000);

	if(subject.length < 5 || body.length < 20) {
		return {
			httpResponse: {
				status: 400,
				body: { error: "subject must be between 5 and 100 characters, and body must be between 20 and 2000 characters." }
			}
		};
	}

	return {
		httpResponse: {
            body: {
                message: "Thank you for contacting me! I will get back to you as soon as possible."
            }
        },
		emailOutput: {
			personalizations: [{
                to: [{ email: process.env.RecipientEmail }] ,
            }],
			reply_to: {
				email: email,
				name: name
			},
			from: {
                email: process.env.SenderEmail,
                name: name
            },
			subject: "[CONTACT] " + subject,
			content: [{
				type: "text/plain",
				value: body
			}]
		}
	};
};
