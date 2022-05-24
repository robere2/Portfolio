import "./style.css";
import { ColorTrack } from "./ColorTrack";
import { Color } from "./Color";

window.customElements.define("color-track", ColorTrack);

const buttons = document.querySelectorAll(".tabs button");
const colorTracks = document.querySelectorAll("color-track");

function tabClicked(e) {
	for(const button of buttons) {
		button.removeAttribute("active");
	}
	e.target.setAttribute("active", true);
}

buttons.forEach((elem) => {
	elem.addEventListener("click", tabClicked);
});

// Konami Code easter egg
let colors = [
	new Color(0, 77, 55),
	new Color(50, 77, 55),
	new Color(125, 77, 55),
	new Color(270, 77, 55)
];

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
				for(let i = 0; i < colorTracks.length; i++) {
					colors[i].h += 2;
					colorTracks[i].setColor(colors[i]);
				}
			}, 1 / 60);
		} else {
			clearInterval(sequenceTimer);
			sequenceTimer = null;
		}
	}
});
// End easter egg
