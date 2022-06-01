import "./ColorTrackHeader.css";
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
    /**
     * Div element which contains all the track elements. This is created at instantiation, but isn't inserted
     *   into the DOM until this (its parent) is mounted.
     * @type {HTMLDivElement|null}
     */
    #div = null;
    /**
     * Options for each of the color tracks to be created. This is used at instantiation
     *   and elements are inserted into {@link ##div}. This also defines how many tracks should actually be created.
     * @type {ColorTrackOption[]}
     */
    #colorTrackOptions = [];
    /**
     * Whether the Easter egg should be running or not. This controls the changing colors, but not
     *   the speed of the tracks, at the moment. That is set by {@link #setupEasterEgg}.
     * @type {boolean}
     */
    #isEasterEggActive = false;
    /**
     * Timestamp of the last time {@link #renderEasterEgg} was called, or null if it hasn't been called yet.
     * @type {number|null}
     */
    #easterEggLastFrameTimestamp = null;
    /**
     * Multiplier constant for the Easter egg to get the speed of the color animation to something desirable.
     * @type {number}
     */
    #easterEggSpeedMultiplier = 10;

    constructor() {
        super();
        this.#div = document.createElement("div");
        this.#colorTrackOptions = [
            new ColorTrackOption(
                new Color(324, 77, 55),
                "8s",
                "transform: translateX(30%)"
            ),
            new ColorTrackOption(
                new Color(1, 77, 55),
                "8.5s",
                "transform: translateX(10%)"
            ),
            new ColorTrackOption(
                new Color(27, 77, 55),
                "7.5s",
                "transform: translateX(75%)"
            ),
            new ColorTrackOption(
                new Color(48, 77, 55),
                "9s",
                "transform: translateX(45%)"
            ),
        ];

        // Create the tracks and append to div, but div isn't mounted yet (connectedCallback()).
        for (let i = 0; i < this.#colorTrackOptions.length; i++) {
            const newTrack = new ColorTrack();
            newTrack.setAttribute("color", this.#colorTrackOptions[i].color);
            newTrack.setAttribute(
                "duration",
                this.#colorTrackOptions[i].duration
            );
            newTrack.setAttribute("style", this.#colorTrackOptions[i].style);

            this.#div.append(newTrack);
        }
    }

    connectedCallback() {
        // Append divs and start animation, but the animation doesn't actually do anything until
        //   #isEasterEggActive is set to true.
        this.append(this.#div);
        requestAnimationFrame(this.renderEasterEgg.bind(this));

        // Sequence of characters the user has to enter to activate the easter egg.
        const sequence = [
            "ArrowUp",
            "ArrowUp",
            "ArrowDown",
            "ArrowDown",
            "ArrowLeft",
            "ArrowRight",
            "ArrowLeft",
            "ArrowRight",
            "b",
            "a",
        ];
        let currentSequenceIndex = 0;

        document.addEventListener("keydown", (e) => {
            if (this.#isEasterEggActive) {
                return;
            }
            // Every time the user gets a character right, move forward in sequence. If they get it wrong, reset.
            if (e.key === sequence[currentSequenceIndex]) {
                currentSequenceIndex++;
                if (currentSequenceIndex === sequence.length) {
                    this.setupEasterEgg();
                    this.#isEasterEggActive = true;
                }
            } else {
                currentSequenceIndex = 0;
            }
        });
    }

    /**
     * One-time actions to run at the start of Easter egg activation. Specifically, at the moment this
     *   sets up the speed at which each track should move while the Easter egg is active.
     */
    setupEasterEgg() {
        const tracks = this.#div.querySelectorAll("color-track");
        // Update the speed of the tracks just once
        for (let i = 0; i < tracks.length; i++) {
            tracks[i].setAttribute("duration", "1s");
        }
    }

    /**
     * Render a frame of the Easter egg. The Easter Egg javascript simply takes care of changing the colors.
     *   The rest is handled by CSS. In the future, color changing could also be offloaded to CSS animations.
     *   This method can run all the time, even if the Easter egg hasn't been activated yet, since it checks for
     *   {@link ##isEasterEggActive} to be true in its body.
     * @param timestamp {number} Timestamp passed by requestAnimationFrame(). Probably milliseconds since page load.
     */
    renderEasterEgg(timestamp) {
        if (this.#easterEggLastFrameTimestamp === null) {
            this.#easterEggLastFrameTimestamp = timestamp;
        }
        if (this.#isEasterEggActive) {
            const tracks = this.#div.querySelectorAll("color-track");
            for (let i = 0; i < tracks.length; i++) {
                this.#colorTrackOptions[i].color.h +=
                    (this.#easterEggSpeedMultiplier *
                        (timestamp = this.#easterEggLastFrameTimestamp)) /
                    1000;

                tracks[i].setAttribute(
                    "color",
                    this.#colorTrackOptions[i].color.toString()
                );
            }
        }
        requestAnimationFrame(this.renderEasterEgg.bind(this));
    }
}

export { ColorTrackHeader };
