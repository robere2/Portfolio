import './MyFooter.css'

class MyFooter extends HTMLElement {

	constructor() {
		super();
		this.innerHTML = `
			<footer>
		        <div class="profiles">
	                <a class="profile-btn" href="https://github.com/robere2" aria-label="GitHub"><i class="fab fa-github"></i></a>
	                <a class="profile-btn" href="https://github.com/robere2" aria-label="LinkedIn"><i class="fab fa-linkedin"></i></a>
	                <a class="profile-btn" href="https://www.npmjs.com/~bugfroggy" aria-label="NPM"><i class="fab fa-npm"></i></a>
				</div>
		        <small>Copyright &copy; ${new Date().getFullYear().toString()} Erik Roberts</small>
		        <small><a href="https://github.com/robere2/Portfolio">Open Source on GitHub</a></small>
		    </footer>
		`;
	}
}

export { MyFooter }
