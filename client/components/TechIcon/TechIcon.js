import './TechIcon.css'

class TechIcon extends HTMLElement {

	static get observedAttributes() {
		return ['data-icon', 'data-name'];
	}

	constructor() {
		super();
		const icon = this.getAttribute("data-icon");
		const name = this.getAttribute("data-name");
		this.innerHTML = `
			<i class="${icon} tech-icon-icon"></i>
			<p class="tech-icon-name">${name}</p>
		`
	}

	attributeChangedCallback(attrName, oldVal, newVal) {
		if(attrName === "data-icon") {
			this.querySelector("i").setAttribute("class", newVal + ' tech-icon-icon');
		} else if (attrName === "data-name") {
			this.querySelector("p").innerText = newVal;
		}
	}
}

export { TechIcon }
