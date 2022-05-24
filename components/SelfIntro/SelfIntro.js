import './SelfIntro.css'
import headshot from '../../assets/headshot.webp'

class SelfIntro extends HTMLElement {

	constructor() {
		super();
		this.innerHTML = `
			<div class="row">
	            <div class="intro">
	                <h1 class="intro-text-title">Erik Roberts</h1>
	            </div>
	            <div class="headshot-wrapper">
	                <img class="headshot" alt="A picture of me." src="${headshot}">
	            </div>
	        </div>
	        <div class="row">
	            <div class="intro-text-body">
                    <h2 class="intro-text-subtitle">Full Stack Developer</h2>
	                <p>
	                    Hi, my name is Erik. I'm a software engineer with a particular love for JavaScript and the web.
	                    I'm a Computer Science graduate from the Class of 2022 at Rensselaer Polytechnic Institute.
	                </p>
	            </div>
	            <div class="intro-text-spacer"></div>
	        </div>
		`;
	}
}

export { SelfIntro };
