import './ColorTrackHeader.css'
import { Color } from "../../Color";

class ColorTrackOption {
	constructor(color, duration, style) {
		this.color = color;
		this.duration = duration;
		this.style = style;
	}
}

class ColorTrackHeader extends HTMLElement {
	constructor() {
		super();
		this.colorTrackOptions = [
			new ColorTrackOption(new Color(324, 77, 55), 8, "transform: translateX(30%)"),
			new ColorTrackOption(new Color(1, 77, 55), 8.5, "transform: translateX(10%)"),
			new ColorTrackOption(new Color(27, 77, 55), 8.2, "transform: translateX(60%)"),
			new ColorTrackOption(new Color(48, 77, 55), 8.5, "transform: translateX(45%)")
		];
	}

	connectedCallback() {
		this.createHTML();
		this.registerEasterEgg();
	}

	createHTML() {
		this.innerHTML = '';
		this.colorTracks = [];

		const div = document.createElement("div");
		for(let i = 0; i < 4; i++) {
			const newTrack = document.createElement("color-track");
			newTrack.setAttribute("color", this.colorTrackOptions[i].color);
			newTrack.setAttribute("duration", this.colorTrackOptions[i].duration);
			newTrack.setAttribute("style", this.colorTrackOptions[i].style);
			div.append(newTrack);
			this.colorTracks.push(newTrack);
		}
		this.append(div);
	}

	registerEasterEgg() {
		const colors = [
			new Color(0, 77, 55),
			new Color(50, 77, 55),
			new Color(125, 77, 55),
			new Color(270, 77, 55)
		];
		if(this.colorTracks && this.colorTracks.length === colors.length) {
			const sequence = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
			let currentSequenceIndex = 0;
			let sequenceTimer = null;

			document.addEventListener("keydown", (e) => {
				if(e.key === sequence[currentSequenceIndex]) {
					currentSequenceIndex++;
				} else {
					currentSequenceIndex = 0;
				}
				if(currentSequenceIndex === sequence.length) {
					currentSequenceIndex = 0;
					if(sequenceTimer === null) {
						sequenceTimer = setInterval(() => {
							for(let i = 0; i < this.colorTracks.length; i++) {
								colors[i].h += 2;
								this.colorTracks[i].setColor(colors[i]);
							}
						}, 1 / 60);
					} else {
						clearInterval(sequenceTimer);
						sequenceTimer = null;
					}
				}
			});
		}
	}
}

export { ColorTrackHeader };
