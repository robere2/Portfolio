import "./RepeatingList.css";

class RepeatingList extends HTMLElement {
    /**
     * A list containing a copy of all the HTML elements that were originally fed into the body of this RepeatingList.
     *   These are used to determine what elements to add to the list, and when. Custom elements should be prepared to
     *   be constructed and destructed on-demand.
     * @type {Node[]}
     */
    #listElements = [];
    /**
     * Constant to get the default speed of 1 to something more desirable.
     * @type {number}
     */
    #speedMultiplier = 13;
    /**
     * Timestamp at which this repeating list was last rendered.
     * @type {null|number}
     */
    #lastRenderTimestamp = null;
    /**
     * Flag storing whether the last render was in frozen state, i.e. the user either had reduced motion enabled
     *   or all elements were able to fit within the list without the need for scrolling. Used to check if we need to
     *   modify the DOM, as there's no point in modifying if previous frame is same as current one.
     * @type {boolean}
     */
    #lastRenderWasFrozen = false;
    /**
     * Width of one instance of each element in the list. We need this to check how wide the list needs to be in order
     *   for scrolling to be unnecessary, and we can just display the elements statically.
     * @type {null}
     */
    #widthOfAllElements = null;
    /**
     * Index of the element in {@link ##listElements} which is to be added next to the DOM.
     * @type {number}
     */
    #currentIdx = 0;
    /**
     * List of instances of copies of nodes of the first element in {@link ##listElements}. We use this to
     *   check A) how many elements are in the DOM (and log a warning if it gets too many) and B) get the pixel
     *   to jump back to when looping back around in the list.
     * @type {[]}
     */
    #firstElementInstances = [];
    /**
     * Last known X position of the mouse cursor. Used for hover-based scrolling. Mouse position can only be fetched
     *   when the user actually moves their mouse, so this is -1 if position isn't known.
     * @type {number}
     */
    #lastKnownMouseX = -1;

    static get observedAttributes() {
        return ["data-margin-width"];
    }

    constructor() {
        super();
        // Copy the list of child elements and then remove them, as they will be added by #generate().
        for (const child of this.children) {
            this.#listElements.push(child.cloneNode(true));
        }
    }

    connectedCallback() {
        this.setup();
        requestAnimationFrame(this.render.bind(this));
    }

    attributeChangedCallback() {
        this.setup();
    }

    /**
     * Get the margin width attribute, or the default if one wasn't provided. Also put a warning out if the default
     *   was used.
     * @returns {number} The parsed integer value of the data-margin-width attribute, or the current width of this
     *   element if no data-margin-width attribute was provided.
     */
    #getMarginWidth() {
        let marginWidth = this.clientWidth;
        if (this.hasAttribute("data-margin-width")) {
            marginWidth = parseInt(this.getAttribute("data-margin-width"));
        }
        return marginWidth;
    }

    /**
     * Get the speed attribute, or the default if one wasn't provided.
     * @returns {number} The parsed float value of the data-speed attribute, or the default of 1 if one wasn't provided.
     */
    #getSpeed() {
        let speed = 1;
        if (this.hasAttribute("data-speed")) {
            speed = parseFloat(this.getAttribute("data-speed"));
        }
        return speed;
    }

    /**
     * Set up the render by resetting all the settings and verifying attributes.
     */
    setup() {
        if (!this.hasAttribute("data-margin-width")) {
            console.warn(
                "repeating-list does not have a data-margin-width set, which could result in unexpected behavior."
            );
        }
        this.#currentIdx = 0;
        this.#firstElementInstances = [];
        this.#lastRenderTimestamp = null;
        this.#lastRenderWasFrozen = false;
        this.innerHTML = ``;

        this.onmousemove = (ev) => {
            this.#lastKnownMouseX = ev.x;
        }
    }

    /**
     * Render a frame. This should be passed to requestAnimationFrame().
     * @param timestamp {number} Timestamp passed by requestAnimationFrame(). Probably milliseconds since page load.
     */
    render(timestamp) {
        const shouldReduceAnimation = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;
        // If the user has reduced motion enabled on their OS/browser, OR if all the elements are able to fit within
        //   this list without it scrolling, then all we need to do is add all the elements and allow the user to scroll
        //   manually (if applicable).
        if (
            shouldReduceAnimation ||
            (this.#widthOfAllElements !== null &&
                this.#widthOfAllElements <= this.clientWidth)
        ) {
            if (!this.#lastRenderWasFrozen) {
                this.setup();
                for (let i = 0; i < this.#listElements.length; i++) {
                    this.append(this.#listElements[i].cloneNode(true));
                }
                this.#lastRenderWasFrozen = true;
            }
        } else {
            this.#lastRenderWasFrozen = false;
            const speed = this.#getSpeed();
            const timeDiff = timestamp - this.#lastRenderTimestamp;
            const normalScrollSpeed = timeDiff / (this.#speedMultiplier / speed);

            // Auto-scroll if the user isn't hovering.
            if (
                !this.matches(":hover") &&
                !this.matches(":active") &&
                this.#lastRenderTimestamp !== null
            ) {
                this.scrollLeft += normalScrollSpeed;
            } else {
                // Scroll manually if the user is hovering
                const leftPos = this.getBoundingClientRect().left;
                const centerPos = leftPos + this.clientWidth / 2;
                // Distance from either edge in which the mouse cursor will cause movement
                const scrollMargin = 200;
                // Distance from either edge before the movement speed is proportional to distance from edge
                const scrollPadding = 75;
                const distanceFromEitherEdge = this.clientWidth / 2 -  Math.abs(centerPos - this.#lastKnownMouseX);

                // Scroll speed is adjusted to be proportional to mouse's position between the start of margins and
                // start of padding, clamped between 0 and 1.
                const adjustedScrollSpeed = normalScrollSpeed * (1 - Math.min(1, Math.max(0, ((distanceFromEitherEdge - scrollPadding) / (scrollMargin - scrollPadding)))))
                if(this.#lastKnownMouseX < centerPos) {
                    this.scrollLeft -= adjustedScrollSpeed;
                } else {
                    this.scrollLeft += adjustedScrollSpeed;
                }
            }

            // If we've made a full loop by reaching the second instance of the first element,
            //   go back to the front of the list.
            if (this.scrollLeft >= this.#firstElementInstances[1]?.offsetLeft) {
                this.scrollLeft = this.#firstElementInstances[0]?.offsetLeft;
            }

            // Add elements until there is no longer a gap between the last element and the right
            //   edge of this repeating list. A data-margin-width is used to account for the size of the
            //   gap between elements.
            for (
                ;
                this.scrollWidth - this.scrollLeft - this.#getMarginWidth() <
                this.clientWidth;
                this.#currentIdx =
                    (this.#currentIdx + 1) % this.#listElements.length // Increment & wrap around
            ) {
                const element =
                    this.#listElements[this.#currentIdx].cloneNode(true);
                this.append(element);

                // We want to take a few actions every time we get back to the first element in the list...
                if (this.#currentIdx === 0) {
                    // First, save this element instance. We use this list to know how many are in the DOM.
                    this.#firstElementInstances.push(element);
                    // When we come across the second instance of the first element, save the current width.
                    //   We need that to know at what point the scrolling animation isn't necessary.
                    if (this.#firstElementInstances.length === 2) {
                        // setTimeout must be used to allow the element to be mounted to the DOM. It means results might
                        //   not be 100% accurate in edge cases, but is the easiest solution.
                        setTimeout(() => {
                            this.#widthOfAllElements =
                                this.scrollLeft +
                                element.offsetLeft +
                                this.#getMarginWidth();
                        }, 0);
                    }

                    // If data-margin-width is not configured properly, elements will likely be added endlessly, which will
                    //   slow down clients over time.
                    if (this.#firstElementInstances.length === 4) {
                        console.warn(
                            "repeating-list probably has a misconfigured data-margin-width, which could result in an infinitely-growing document."
                        );
                    }
                }
            }
        }

        this.#lastRenderTimestamp = timestamp;
        requestAnimationFrame(this.render.bind(this));
    }
}

export { RepeatingList };
