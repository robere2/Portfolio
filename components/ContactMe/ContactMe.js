import './ContactMe.css'

class ContactMe extends HTMLElement {

	constructor() {super();}

	connectedCallback() {
		this.innerHTML = `
			<h1>Contact Me</h1>
			<div class="row">
			    <div class="col">
			        <form>
			            <div class="row">
			                <div class="name-wrapper">
			                    <label for="contact-name">Your Name</label>
			                    <input type="text" id="contact-name">
			                </div>
			                <div class="email-wrapper">
			                    <label for="contact-email">Your Email</label>
			                    <input type="email" id="contact-email">
			                </div>
			            </div>
			            <label for="contact-subject">Subject</label>
			            <input type="text" id="contact-subject">
			            <label for="contact-body">Body</label>
			            <textarea id="contact-body"></textarea>
			        </form>
			        <button id="contact-submit" type="submit">Submit</button>
			    </div>
			</div>
		`;
	}
}

export { ContactMe };