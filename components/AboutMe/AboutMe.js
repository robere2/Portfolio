import './AboutMe.css'

class AboutMe extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		this.innerHTML = `
		<h1>About Me</h1>
        <div class="row">
            <div class="col">
                <h2>Profiles</h2>
                <a class="profile-btn" href="https://github.com/robere2" aria-label="GitHub"><i class="fab fa-github"></i></a>
                <a class="profile-btn" href="https://github.com/robere2" aria-label="LinkedIn"><i class="fab fa-linkedin"></i></a>
                <a class="profile-btn" href="https://www.npmjs.com/~bugfroggy" aria-label="NPM"><i class="fab fa-npm"></i></a>
            </div>
            <div class="col">
                <h2>Languages</h2>
                <ul>
                    <li>JavaScript</li>
                    <li>TypeScript</li>
                    <li>HTML/CSS</li>
                    <li>Java</li>
                    <li>C/C++</li>
                    <li>SQL</li>
                    <li>PHP</li>
                </ul>
            </div>
            <div class="col">
                <h2>Technologies</h2>
                <ul>
                    <li>Vue</li>
                    <li>React</li>
                    <li>Angular</li>
                    <li>MongoDB</li>
                    <li>Microsoft Azure</li>
                    <li>Amazon Web Services</li>
                    <li>Express</li>
                    <li>Docker</li>
                    <li>GitHub Actions</li>
                    <li>Electron</li>
                    <li>Browser Extensions</li>
                    <li>Discord API</li>
                    <li>Minecraft Forge</li>
                    <li>OpenGL</li>
                    <li>Raspberry Pi</li>
                    <li>LDAP</li>
                </ul>
            </div>
        </div>`
	}
}

export { AboutMe }
