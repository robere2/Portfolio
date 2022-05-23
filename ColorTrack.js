import "./color-track.css";

class ColorTrack extends HTMLElement {

	constructor() {
		super();
		let color = parseInt(this.getAttribute("color"), 16);
		if(!color) {
			color = 0xffffff;
		}
		this.style.animationDuration = this.getAttribute("duration") ?? "2s"
		const colorStr = color.toString(16);
		this.innerHTML = `
		<div class="color-track-path-and-ball">
			<div class="color-track-path" style="background-image: linear-gradient(to right, #${colorStr}00, #${colorStr})"></div>
			<div class="color-track-ball" style="background-color: #${colorStr}"></div>
		</div>
		<div class="color-track-path-and-ball">
			<div class="color-track-path" style="background-image: linear-gradient(to right, #${colorStr}00, #${colorStr})"></div>
			<div class="color-track-ball" style="background-color: #${colorStr}"></div>
		</div>
		<div class="color-track-path-and-ball">
			<div class="color-track-path" style="background-image: linear-gradient(to right, #${colorStr}00, #${colorStr})"></div>
			<div class="color-track-ball" style="background-color: #${colorStr}"></div>
		</div>
		`;
	}
}

export { ColorTrack };
