import "./style.css";
import { ColorTrack } from "./ColorTrack";
import { Color } from "./Color";

window.customElements.define("color-track", ColorTrack);

const tabs = document.querySelectorAll(".tabs button");
const tabContent = document.querySelectorAll(".tab-content");
const colorTracks = document.querySelectorAll("color-track");

function tabClicked(button) {
	// Reset tabs/visible content
	for(const tab of tabs) {
		tab.removeAttribute("data-active");
	}
	for(const content of tabContent) {
		content.setAttribute("aria-hidden", "true");
	}

	const target = button.getAttribute("data-target");
	window.location.hash = '#' + target;

	button.setAttribute("data-active", true);
	const contentToShow = document.querySelector(".tab-content." + target)
	if(contentToShow) {
		contentToShow.setAttribute("aria-hidden", "false");
	}
}

tabs.forEach((elem) => {
	elem.addEventListener("click", (e) => tabClicked(e.target));
});

// Switch tabs if the hash is set
if(window.location.hash) {
	let hashContent = window.location.hash.substring(1);
	const button = document.querySelector(`.tabs button[data-target="${hashContent}"]`)
	if(button) {
		tabClicked(button);
	}
}

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
