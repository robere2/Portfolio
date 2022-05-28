module.exports = async function(context, req) {
	if(!req.body) {
		return {
			httpResponse: {
				status: 400,
				body: { error: "Missing contact form submission." }
			}
		};
	}

	const name = req.body.name?.substring(0, 300);
	const email = req.body.email?.substring(0, 300);
	const subject = req.body.subject?.substring(0, 100);
	const body = req.body.body?.substring(0, 2000);

	if(!name || !email || !subject || !body) {
		return {
			httpResponse: {
				status: 400,
				body: { error: "Missing required fields." }
			}
		};
	}
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
			subject: subject,
			content: [{
				type: "text/plain",
				value: body
			}]
		}
	};
};
