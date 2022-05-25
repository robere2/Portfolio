import './TechIcon.css'

class TechIcon extends HTMLElement {

	constructor() {
		super();
		const icon = this.getAttribute("data-icon");
		const name = this.getAttribute("data-name");
		this.innerHTML = `
			<i class="${icon} tech-icon-icon"></i>
			<p class="tech-icon-name">${name}</p>
		`
	}
}

export { TechIcon }
