import './MyProjects.css'
class MyProjects extends HTMLElement {

	constructor() {
		super();
		this.innerHTML = `
			<h1 id="projects">Projects</h1>
	        <div class="row">
	            <p>
	                TODO
	            </p>
	        </div>
		`;
	}

}

export { MyProjects }
