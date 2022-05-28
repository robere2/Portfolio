import './ContactMe.css'

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
			                    <input type="text" class="contact-name" maxlength="200">
			                </div>
			                <div class="email-wrapper">
			                    <label for="contact-email">Your Email<span class="required" aria-label="required"> *</span></label>
			                    <input type="email" class="contact-email" maxlength="300">
			                </div>
			            </div>
			            <label for="contact-subject">Subject<span class="required" aria-label="required"> *</span></label>
			            <input type="text" class="contact-subject" minlength="5" maxlength="100">
			            <label for="contact-body">Body<span class="required" aria-label="required"> *</span></label>
			            <textarea class="contact-body" minlength="20" maxlength="2000"></textarea>
			        </form>
			        <button class="contact-submit" type="submit">Submit</button>
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
		if(message === null) {
			this.querySelector(".contact-error-wrapper").innerHTML = ``;
		} else {
			this.querySelector(".contact-error-wrapper").innerHTML = `<my-alert data-type="${style}">${message}</my-alert>`;
		}
	}

	connectedCallback() {
		const submitButton = this.querySelector(".contact-submit");
		this.#setAlert(null);

		submitButton.addEventListener("click", async () => {
			const name = this.querySelector(".contact-name").value;
			const email = this.querySelector(".contact-email").value;
			const subject = this.querySelector(".contact-subject").value;
			const body = this.querySelector(".contact-body").value;

			if(!name) {
				this.#setAlert("You must provide your name.", "error");
			} else if(!email || !email.includes("@")) {
				this.#setAlert("You must provide a valid email address.", "error");
			} else if(!subject || subject.length < 5 || subject.length > 100) {
				this.#setAlert("Subject must be between 5 and 100 characters in length.", "error");
			} else if(!body || body.length < 20 || body.length > 2000) {
				this.#setAlert("Body must be between 20 and 2000 characters in length.", "error");
			} else {
				await this.send(name, email, subject, body);
			}
		});
	}

	/**
	 * Send the form off
	 * @param name
	 * @param email
	 * @param subject
	 * @param body
	 */
	async send(name, email, subject, body) {
		const response = await fetch("/api/SubmitContact", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				name,
				email,
				subject,
				body
			}) });
		const responseBody = await response.json();
		if(response.status === 200) {
			this.#setAlert(responseBody.message, "success");
		} else {
			this.#setAlert(responseBody.error, "error");
		}
	}
}

export { ContactMe };
