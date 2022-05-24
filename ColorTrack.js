import "./color-track.css";
import { Color } from "./Color";

class ColorTrack extends HTMLElement {

	constructor() {
		super();
		this.style.animationDuration = this.getAttribute("duration") ?? "2s"
		this.setColor(this.getAttribute("color"));
	}

	setColor(color) {
		let colorStr = color;
		if(color instanceof Color) {
			colorStr = color.toString();
		}
		this.innerHTML = `
		<div class="color-track-path-and-ball">
			<div class="color-track-path" style="background-image: linear-gradient(to right, var(--background-color), ${colorStr})"></div>
			<div class="color-track-ball" style="background-color: ${colorStr}"></div>
		</div>
		<div class="color-track-path-and-ball">
			<div class="color-track-path" style="background-image: linear-gradient(to right, var(--background-color), ${colorStr})"></div>
			<div class="color-track-ball" style="background-color: ${colorStr}"></div>
		</div>
		<div class="color-track-path-and-ball">
			<div class="color-track-path" style="background-image: linear-gradient(to right, var(--background-color), ${colorStr})"></div>
			<div class="color-track-ball" style="background-color: ${colorStr}"></div>
		</div>
		`;
	}
}

export { ColorTrack };
