import "./ColorTrack.css";

class ColorTrack extends HTMLElement {

	static get observedAttributes() {
		return ['color', 'duration'];
	}

	constructor() {
		super();

		const pathAndBallTemplate = document.createElement("div");
		pathAndBallTemplate.classList.add("color-track-path-and-ball");
		// Colors and animation are added on mount (connectedCallback())
		pathAndBallTemplate.innerHTML = `
			<div class="color-track-path"></div>
			<div class="color-track-ball"></div>
		`;

		this.trackPieces = [
			pathAndBallTemplate.cloneNode(true),
			pathAndBallTemplate.cloneNode(true),
			pathAndBallTemplate.cloneNode(true)
		];
	}

	connectedCallback() {
		for(let i = 0; i < this.trackPieces.length; i++) {
			this.append(this.trackPieces[i]);
		}
	}

	attributeChangedCallback(name, oldVal, newVal) {
		if(name === "color") {
			// Update color for the track element and the ball element.
			for(let i = 0; i < this.trackPieces.length; i++) {
				const piece = this.trackPieces[i];
				const path = piece.querySelector(".color-track-path");
				const ball = piece.querySelector(".color-track-ball");

				path.style.backgroundImage = `linear-gradient(to right, var(--background-color), ${newVal})`
				ball.style.backgroundColor = newVal;
			}
		} else if (name === "duration") {
			// Style isn't being immediately applied by ColorTrackHeader. Perhaps you can't style before mounting?
			setTimeout(() => {
				this.style.animationDuration = newVal;
			}, 0)
		}
	}
}

export { ColorTrack };
