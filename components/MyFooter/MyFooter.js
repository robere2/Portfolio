import './MyFooter.css'

class MyFooter extends HTMLElement {

	connectedCallback() {
		this.innerHTML = `
			<footer>
		        <small>Copyright &copy; ${new Date().getFullYear().toString()} Erik Roberts</small>
		        <small><a href="https://github.com/robere2/Portfolio">Open Source on GitHub</a></small>
		    </footer>
		`;
	}
}

export { MyFooter }
