import './MyFooter.css'

class MyFooter extends HTMLElement {

	constructor() {
		super();
		this.innerHTML = `
			<footer>
		        <small>Copyright &copy; ${new Date().getFullYear().toString()} Erik Roberts</small>
		        <small><a href="https://github.com/robere2/Portfolio" rel="noopener">Open Source on GitHub</a></small>
		    </footer>
		`;
	}
}

export { MyFooter }
