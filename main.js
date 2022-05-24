import "./styles/style.css";
import { ColorTrack } from "./components/ColorTrack/ColorTrack";
import { ColorTrackHeader } from "./components/ColorTrackHeader/ColorTrackHeader";
import { SelfIntro } from "./components/SelfIntro/SelfIntro";
import { AboutMe } from "./components/AboutMe/AboutMe";
import { ContactMe } from "./components/ContactMe/ContactMe";
import { MyProjects } from "./components/MyProjects/MyProjects";
import { MyFooter } from "./components/MyFooter/MyFooter";

window.customElements.define("color-track", ColorTrack);
window.customElements.define("color-track-header", ColorTrackHeader);
window.customElements.define("self-intro", SelfIntro);
window.customElements.define("about-me", AboutMe);
window.customElements.define("contact-me", ContactMe);
window.customElements.define("my-projects", MyProjects);
window.customElements.define("my-footer", MyFooter);
