import "./styles/style.css";
import { ColorTrack } from "./components/ColorTrack/ColorTrack";
import { ColorTrackHeader } from "./components/ColorTrackHeader/ColorTrackHeader";
import { SelfIntro } from "./components/SelfIntro/SelfIntro";
import { MySkills } from "./components/MySkills/MySkills";
import { ContactMe } from "./components/ContactMe/ContactMe";
import { MyProjects } from "./components/MyProjects/MyProjects";
import { MyFooter } from "./components/MyFooter/MyFooter";
import { TechIcon } from "./components/TechIcon/TechIcon";
import { RepeatingList } from "./components/RepeatingList/RepeatingList";
import { MyAlert } from "./components/MyAlert/MyAlert";

window.customElements.define("my-alert", MyAlert);
window.customElements.define("color-track", ColorTrack);
window.customElements.define("color-track-header", ColorTrackHeader);
window.customElements.define("self-intro", SelfIntro);
window.customElements.define("repeating-list", RepeatingList);
window.customElements.define("tech-icon", TechIcon);
window.customElements.define("my-skills", MySkills);
window.customElements.define("contact-me", ContactMe);
window.customElements.define("my-projects", MyProjects);
window.customElements.define("my-footer", MyFooter);
