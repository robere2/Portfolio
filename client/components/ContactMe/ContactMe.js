import "./ContactMe.css";
/* global grecaptcha */

class ContactMe extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
			<h1>Contact Me</h1>
			
			<div class="contact-error-wrapper"></div>
			<div class="row">
			    <div class="col">
			        <form>
			            <div class="row">
			                <div class="name-wrapper">
			                    <label for="contact-name">Your Name<span class="required" aria-label="required"> *</span></label>
			                    <input type="text" id="contact-name" maxlength="200">
			                </div>
			                <div class="email-wrapper">
			                    <label for="contact-email">Your Email<span class="required" aria-label="required"> *</span></label>
			                    <input type="email" id="contact-email" maxlength="300">
			                </div>
			            </div>
			            <label for="contact-subject">Subject<span class="required" aria-label="required"> *</span></label>
			            <input type="text" id="contact-subject" minlength="5" maxlength="100">
			            
			            <label for="contact-body">Body<span class="required" aria-label="required"> *</span></label>
			            <textarea id="contact-body" minlength="20" maxlength="2000"></textarea>
			        </form>
			        <small class="recaptcha-branding">
			        	<!-- https://developers.google.com/recaptcha/docs/faq -->
			        	This site is protected by reCAPTCHA and the Google
					    <a href="https://policies.google.com/privacy">Privacy Policy</a> and
					    <a href="https://policies.google.com/terms">Terms of Service</a> apply.
					</small>
			        <button class="contact-submit" type="submit">Submit</button>
			        <p class="submitting-text"></p>
			    </div>
			</div>
		`;
    }

    /**
     * Set or remove the error message to display.
     * @param message {string|null} Error message to display, or null to remove it.
     * @param style {"error"|"success"} Style of the alert
     */
    #setAlert(message, style) {
        if (message === null) {
            this.querySelector(".contact-error-wrapper").innerHTML = ``;
        } else {
            this.querySelector(
                ".contact-error-wrapper"
            ).innerHTML = `<my-alert data-type="${style}">${message}</my-alert>`;
        }
    }

    connectedCallback() {
        const submitButton = this.querySelector(".contact-submit");

        submitButton.addEventListener("click", async () => {
            const name = this.querySelector("#contact-name");
            const email = this.querySelector("#contact-email");
            const subject = this.querySelector("#contact-subject");
            const body = this.querySelector("#contact-body");

            if (!name) {
                this.#setAlert("You must provide your name.", "error");
            } else if (!email || !email.value || !email.value.includes("@")) {
                this.#setAlert(
                    "You must provide a valid email address.",
                    "error"
                );
            } else if (
                !subject ||
                !subject.value ||
                subject.value.length < 5 ||
                subject.value.length > 100
            ) {
                this.#setAlert(
                    "Subject must be between 5 and 100 characters in length.",
                    "error"
                );
            } else if (
                !body ||
                !body.value ||
                body.value.length < 20 ||
                body.value.length > 2000
            ) {
                this.#setAlert(
                    "Body must be between 20 and 2000 characters in length.",
                    "error"
                );
            } else {
                name.setAttribute("disabled", "disabled");
                email.setAttribute("disabled", "disabled");
                subject.setAttribute("disabled", "disabled");
                body.setAttribute("disabled", "disabled");
                submitButton.style.display = "none";
                this.querySelector(".submitting-text").innerText =
                    "Submitting...";
                this.#setAlert(null, "error"); // Remove alert
                grecaptcha.ready(() => {
                    grecaptcha
                        .execute("6LdseC4gAAAAAE-pa7N9ABJoLX2G6Z9Vs7tdPTcC", {
                            action: "contactSubmit",
                        })
                        .then((token) => {
                            this.send(
                                name.value,
                                email.value,
                                subject.value,
                                body.value,
                                token
                            );
                        });
                });
            }
        });
    }

    /**
     * Send the form off
     * @param name
     * @param email
     * @param subject
     * @param body
     * @param token
     */
    async send(name, email, subject, body, token) {
        const response = await fetch("/api/SubmitContact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                email,
                subject,
                body,
                token,
            }),
        });
        const responseBody = await response.json();
        if (response.status === 200) {
            this.#setAlert(responseBody.message, "success");
        } else {
            this.#setAlert(responseBody.error, "error");
            this.querySelector(".contact-submit").style.display = "";
        }
        this.querySelector(".submitting-text").innerText = "";
    }
}

export { ContactMe };
