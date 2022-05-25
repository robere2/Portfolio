import './ColorTrackHeader.css'
import { Color } from "../../Color";
import { ColorTrack } from "../ColorTrack/ColorTrack";

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
		// Create the div which all tracks will be encapsulated by. Necessary for styling.
		this.div = document.createElement("div");
		// The options for each track.
		this.colorTrackOptions = [
			new ColorTrackOption(new Color(324, 77, 55), '8s', "transform: translateX(30%)"),
			new ColorTrackOption(new Color(1, 77, 55), '8.5s', "transform: translateX(10%)"),
			new ColorTrackOption(new Color(27, 77, 55), '8.2s', "transform: translateX(60%)"),
			new ColorTrackOption(new Color(48, 77, 55), '8.5s', "transform: translateX(45%)")
		];

		// Create the tracks and append to div, but div isn't mounted yet (connectedCallback()).
		for(let i = 0; i < 4; i++) {
			const newTrack = new ColorTrack();
			newTrack.setAttribute("color", this.colorTrackOptions[i].color);
			newTrack.setAttribute("duration", this.colorTrackOptions[i].duration);
			newTrack.setAttribute("style", this.colorTrackOptions[i].style);

			this.div.append(newTrack);
		}
	}

	connectedCallback() {
		this.append(this.div);
		this.registerEasterEgg();
	}

	/**
	 * Register the Konami Code Easter egg event listener. Whenever the user types the proper sequence of keystrokes,
	 *   the color tracks should speed up and start changing colors.
	 */
	registerEasterEgg() {
		const sequence = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
		let currentSequenceIndex = 0;
		let sequenceTimer = null;

		document.addEventListener("keydown", (e) => {
			// Every time the user gets a character right, move forward in sequence. If they get it wrong, reset.
			if(e.key === sequence[currentSequenceIndex]) {
				currentSequenceIndex++;
			} else {
				currentSequenceIndex = 0;
			}
			// Once the user reaches the end of the sequence, take action.
			if(currentSequenceIndex === sequence.length) {
				currentSequenceIndex = 0;
				const tracks = this.div.querySelectorAll("color-track");
				// If the Easter egg isn't running yet, start it
				if(sequenceTimer === null) {
					// Update the speed of the tracks just once
					for(let i = 0; i < tracks.length; i++) {
						tracks[i].setAttribute('duration', '1s');
					}
					// Update the color of the tracks at 60fps
					sequenceTimer = setInterval(() => {
						for(let i = 0; i < tracks.length; i++) {
							this.colorTrackOptions[i].color.h += 2;
							tracks[i].setAttribute('color', this.colorTrackOptions[i].color.toString());
						}
					}, (1 / 60) * 1000);
				} else {
					// If the Easter egg is already running, then stop it and go back to normal speed
					//   (but keep the colors).
					clearInterval(sequenceTimer);
					sequenceTimer = null;
					for(let i = 0; i < tracks.length; i++) {
						tracks[i].setAttribute('duration', this.colorTrackOptions[i].duration);
					}
				}
			}
		});

	}
}

export { ColorTrackHeader };
