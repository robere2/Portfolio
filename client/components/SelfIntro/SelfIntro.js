import './SelfIntro.css'
import headshot from '../../assets/headshot.webp'

class SelfIntro extends HTMLElement {

	constructor() {
		super();
		this.innerHTML = `
			<div class="row intro">
                <h1 class="intro-text-title">Erik Roberts</h1>
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
	        <div class="profiles">
                <a class="profile-btn" href="https://github.com/robere2" aria-label="GitHub" rel="noopener"><i class="fab fa-github"></i></a>
                <a class="profile-btn" href="https://www.linkedin.com/in/erik-roberts-5664171a1/" aria-label="LinkedIn" rel="noopener"><i class="fab fa-linkedin"></i></a>
                <a class="profile-btn" href="https://www.npmjs.com/~bugfroggy" aria-label="NPM" rel="noopener"><i class="fab fa-npm"></i></a>
			</div>
		`;
	}
}

export { SelfIntro };
