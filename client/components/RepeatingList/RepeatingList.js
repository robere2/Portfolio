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
    /**
     * scrollLeft cannot take fractional values in some browsers, so we store the next scrollLeft value here and
     *   attempt to add it's non-fractional value to the actual scrollLeft value every frame. E.g., if this value
     *   is 4.25, then on the next frame, 4 will be added to scrollLeft and this will be set back to 0.25.
     * @type {number}
     */
    #nextScrollLeft = 0;

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
        this.#firstElementInstances = [];
        this.#lastRenderTimestamp = null;
        this.innerHTML = ``;

        this.onmousemove = (ev) => {
            this.#lastKnownMouseX = ev.x;
        };

        // Add all elements once at first
        for (let i = 0; i < this.#listElements.length; i++) {
            const element = this.#listElements[i].cloneNode(true);
            this.append(element);
            if (i === 0) {
                this.#firstElementInstances.push(element);
            }
        }

        const shouldReduceAnimation = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;
        // Repeat adding elements until we've reached the width of the list, to make the transition of jumping back to
        //   the first element seamless.
        if (this.scrollWidth > this.clientWidth && !shouldReduceAnimation) {
            let repeatedWidth = 0;
            for (
                let i = 0;
                repeatedWidth < this.clientWidth &&
                i < this.#listElements.length;
                i++
            ) {
                const element = this.#listElements[i].cloneNode(true);
                this.append(element);
                if (i === 0) {
                    this.#firstElementInstances.push(element);
                }
                repeatedWidth += element.clientWidth;
            }
        }
    }

    /**
     * Render a frame. This should be passed to requestAnimationFrame().
     * @param timestamp {number} Timestamp passed by requestAnimationFrame(). Probably milliseconds since page load.
     */
    render(timestamp) {
        const speed = this.#getSpeed();
        const timeDiff = timestamp - this.#lastRenderTimestamp;
        const normalScrollSpeed = timeDiff / (this.#speedMultiplier / speed);

        // Auto-scroll if the user isn't hovering.
        if (
            !this.matches(":hover") &&
            !this.matches(":active") &&
            this.#lastRenderTimestamp !== null
        ) {
            this.#nextScrollLeft += normalScrollSpeed;
        } else {
            // Scroll manually if the user is hovering
            const leftPos = this.getBoundingClientRect().left;
            const centerPos = leftPos + this.clientWidth / 2;
            // Distance from either edge in which the mouse cursor will cause movement
            const scrollMargin = 250;
            // Distance from either edge before the movement speed is proportional to distance from edge
            const scrollPadding = 75;
            const distanceFromEitherEdge =
                this.clientWidth / 2 -
                Math.abs(centerPos - this.#lastKnownMouseX);

            // Scroll speed is adjusted to be proportional to mouse's position between the start of margins and
            // start of padding, clamped between 0 and 1. Multiply by 3 to allow for fast scrolling.
            const adjustedScrollSpeed =
                normalScrollSpeed *
                (1 -
                    Math.min(
                        1,
                        Math.max(
                            0,
                            (distanceFromEitherEdge - scrollPadding) /
                                (scrollMargin - scrollPadding)
                        )
                    )) *
                3;
            if (this.#lastKnownMouseX < centerPos) {
                this.#nextScrollLeft -= adjustedScrollSpeed;
            } else {
                this.#nextScrollLeft += adjustedScrollSpeed;
            }
        }

        // Once we've reached at least one full pixel, scroll by that pixel(s) and then remove it from the next scroll.
        if (Math.abs(this.#nextScrollLeft) >= 1) {
            this.scrollLeft += Math.trunc(this.#nextScrollLeft);
            this.#nextScrollLeft = this.#nextScrollLeft % 1;
        }

        // If we've made a full loop by reaching the second instance of the first element,
        //   go back to the front of the list.
        if (this.scrollLeft >= this.#firstElementInstances[1]?.offsetLeft) {
            this.scrollLeft = this.#firstElementInstances[0]?.offsetLeft;
        }
        // If we're scrolling backwards and reach the first element, go to the second instance of the first
        //   element.
        if (this.scrollLeft < this.#firstElementInstances[0]?.offsetLeft) {
            this.scrollLeft = this.#firstElementInstances[1]?.offsetLeft - 1;
        }

        this.#lastRenderTimestamp = timestamp;
        requestAnimationFrame(this.render.bind(this));
    }
}

export { RepeatingList };
