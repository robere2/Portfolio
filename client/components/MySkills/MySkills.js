import "./MySkills.css";

class MySkills extends HTMLElement {
    constructor() {
        super();

        this.innerHTML = `
        <div class="row">
            <div class="col">
                <h2>Languages</h2>
                <p class="skills-description">These are the programming languages I have the most experience with.</p>
                <div class="tech-section languages">
                	<div class="tech-section-fade"></div>
	                <repeating-list class="tech-section-content" data-margin-width="21">
						<tech-icon data-name="JavaScript" data-icon="fab fa-js-square"></tech-icon>
						<tech-icon data-name="HTML/CSS" data-icon="fab fa-html5"></tech-icon>
						<tech-icon data-name="Java" data-icon="fab fa-java"></tech-icon>
						<tech-icon data-name="C/C++" data-icon="fak fa-cpp"></tech-icon>
						<tech-icon data-name="SQL" data-icon="fal fa-database"></tech-icon>
					</repeating-list>
				</div>
            </div>
            <div class="col">
                <h2>Technologies</h2>
                <p class="skills-description">This is just some of the technologies I have worked with the most.</p>
                <div class="tech-section tech">
                	<div class="tech-section-fade"></div>
	                <repeating-list class="tech-section-content" data-margin-width="21">
						<tech-icon data-name="Vue" data-icon="fab fa-vuejs"></tech-icon>
						<tech-icon data-name="React" data-icon="fab fa-react"></tech-icon>
						<tech-icon data-name="Angular" data-icon="fab fa-angular"></tech-icon>
						<tech-icon data-name="NestJS" data-icon="fak fa-nestjs"></tech-icon>
						<tech-icon data-name="GraphQL" data-icon="fak fa-graphql"></tech-icon>
						<tech-icon data-name="PostgreSQL" data-icon="fak fa-postgres"></tech-icon>
						<tech-icon data-name="MongoDB" data-icon="fak fa-mongodb"></tech-icon>
						<tech-icon data-name="Microsoft Azure" data-icon="fak fa-azure"></tech-icon>
						<tech-icon data-name="Amazon Web Services" data-icon="fab fa-aws"></tech-icon>
						<tech-icon data-name="Docker" data-icon="fab fa-docker"></tech-icon>
						<tech-icon data-name="GitHub Actions" data-icon="fab fa-github"></tech-icon>
						<tech-icon data-name="Browser Extensions" data-icon="fal fa-browser"></tech-icon>
						<tech-icon data-name="Discord API" data-icon="fab fa-discord"></tech-icon>
						<tech-icon data-name="Minecraft Forge" data-icon="fal fa-cube"></tech-icon>
	                </repeating-list>
				</div>
            </div>
        </div>`;
    }
}

export { MySkills };
