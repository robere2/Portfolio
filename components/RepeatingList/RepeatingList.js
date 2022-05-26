import './RepeatingList.css'

class RepeatingList extends HTMLElement {
	#interval = null;
	#listElements = [];

	static get observedAttributes() {
		return ['data-margin-width'];
	}

	constructor() {
		super();
		// Copy the list of child elements and then remove them, as they will be added by #generate().
		for(const child of this.children) {
			this.#listElements.push(child.cloneNode(true));
		}
		this.innerHTML = ``;
	}

	connectedCallback() {
		this.#generate();
		new ResizeObserver(() => {
			this.#generate();
		}).observe(this);
	}

	attributeChangedCallback() {
		this.#generate();
	}

	/**
	 * Get the margin width attribute, or the default if one wasn't provided. Also put a warning out if the default
	 *   was used.
	 * @returns {number} The parsed integer value of the data-margin-width attribute, or the current width of this
	 *   element if no data-margin-width attribute was provided.
	 */
	#getMarginWidth() {
		let marginWidth = this.clientWidth;
		if(this.hasAttribute("data-margin-width")) {
			marginWidth = parseInt(this.getAttribute("data-margin-width"));
		} else {
			console.warn('repeating-list does not have a data-margin-width set, which could result in unexpected behavior.')
		}
		return marginWidth;
	}

	/**
	 * Get the speed attribute, or the default if one wasn't provided.
	 * @returns {number} The parsed float value of the data-speed attribute, or the default of 1 if one wasn't provided.
	 */
	#getSpeed() {
		let speed;
		if(this.hasAttribute("data-speed")) {
			speed = parseFloat(this.getAttribute("data-speed"));
		} else {
			speed = 1;
		}
		return speed;
	}

	/**
	 * Generate the list and it's animation loop. Also delete any previous list/animation loop if
	 *   this method was called previously. If no animation is necessary because all of the elements
	 *   fit inside this list without it, then all the elements are simply added and no loop is started.
	 *   Animation speed is dependent on data-speed attribute, where higher numbers are faster. Changing this
	 *   data-speed attribute will not restart the animation (it will simply update in-place), but changing
	 *   data-margin-width will.
	 */
	#generate() {
		// Reset every time this method is called. Used for watching resize or attributes.
		if(this.#interval !== null) {
			clearInterval(this.#interval);
			this.innerHTML = ``;
		}
		// Disable auto-scrolling if reduced motion is enabled on OS/browser. User can scroll manually.
		if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			this.innerHTML = ``;
			for(let i = 0; i < this.#listElements.length; i++) {
				this.append(this.#listElements[i].cloneNode(true));
			}
			return;
		}

		let firstElementInstances = [];
		const marginWidth = this.#getMarginWidth();
		// Index of the list element which is to be added next.
		let currentIdx = 0;
		// Speed of the scrolling is independent of framerate, so timestamps must be used.
		let lastFrameTimestamp = null;

		// Attempt to run at 60fps
		this.#interval = setInterval(() => {
			const speed = this.#getSpeed();
			// Auto-scroll if the user isn't hovering.
			if(!this.matches(":hover")) {
				const timeDiff = Date.now() - lastFrameTimestamp;
				this.scrollLeft += timeDiff / (13 / speed);
			}
			// If we've made a full loop by reaching the second instance of the first element,
			//   go back to the front of the list.
			if(this.scrollLeft >= firstElementInstances[1]?.offsetLeft) {
				this.scrollLeft = firstElementInstances[0]?.offsetLeft;
			}
			// Add elements until there is no longer a gap between the last element and the right
			//   edge of this repeating list. A data-margin-width is used to account for the size of the
			//   gap between elements.
			for(;
				this.scrollWidth - this.scrollLeft - marginWidth < this.clientWidth;
				currentIdx = (currentIdx + 1) % this.#listElements.length // Increment & wrap around
			) {

				const element = this.#listElements[currentIdx].cloneNode(true);
				// Every time we come across an instance of the first element in the list,
				//   save it to the list to keep track of how large our list is. A properly-configured
				//   data-margin-width would mean this is always less than or equal to 3.
				if(currentIdx === 0) {
					// If we've already reached the first element a second time within the first frame, then
					//   all the content clearly fits in the list without scrolling, and we should just stop.
					if(!lastFrameTimestamp && firstElementInstances.length === 1) {
						clearInterval(this.#interval);
						return;
					}
					firstElementInstances.push(element);
				}

				this.append(element);
				// If data-margin-width is not configured properly, elements will likely be added endlessly, which will
				//   slow down clients over time.
				if(firstElementInstances.length === 4 && currentIdx === 0) {
					console.warn('repeating-list probably has a misconfigured data-margin-width, which could result in an infinitely-growing document.')
				}
			}
			lastFrameTimestamp = Date.now();
		}, (1 / 60) * 1000);
	}

}

export { RepeatingList }
