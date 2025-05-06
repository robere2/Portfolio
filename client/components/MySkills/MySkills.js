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
	                <repeating-list class="tech-section-content">
						<tech-icon data-name="JavaScript" data-icon="fab fa-js-square"></tech-icon>
						<tech-icon data-name="HTML/CSS" data-icon="fab fa-html5"></tech-icon>
						<tech-icon data-name="Java" data-icon="fab fa-java"></tech-icon>
						<tech-icon data-name="C/C++" data-icon="fak fa-cpp"></tech-icon>
						<tech-icon data-name="Lua" data-icon="fak fa-lua"></tech-icon>
						<tech-icon data-name="SQL" data-icon="fal fa-database"></tech-icon>
					</repeating-list>
				</div>
            </div>
            <div class="col">
                <h2>Technologies</h2>
                <p class="skills-description">These are just some of the skills and technologies I have worked with the most.</p>
                <div class="tech-section tech">
                	<div class="tech-section-fade"></div>
	                <repeating-list class="tech-section-content">
						<tech-icon data-name="Vue" data-icon="fab fa-vuejs"></tech-icon>
						<tech-icon data-name="React" data-icon="fab fa-react"></tech-icon>
						<tech-icon data-name="Angular" data-icon="fab fa-angular"></tech-icon>
						<tech-icon data-name="Node.js" data-icon="fab fa-node"></tech-icon>
						<tech-icon data-name="NestJS" data-icon="fak fa-nestjs"></tech-icon>
						<tech-icon data-name="Sass" data-icon="fab fa-sass"></tech-icon>
						<tech-icon data-name="GraphQL" data-icon="fak fa-graphql"></tech-icon>
						<tech-icon data-name="PostgreSQL" data-icon="fak fa-postgres"></tech-icon>
						<tech-icon data-name="MongoDB" data-icon="fak fa-mongodb"></tech-icon>
						<tech-icon data-name="Jira & Confluence" data-icon="fab fa-atlassian"></tech-icon>
						<tech-icon data-name="Agile Methodology" data-icon="fas fa-person-running-fast"></tech-icon>
						<tech-icon data-name="Microsoft Azure" data-icon="fak fa-azure"></tech-icon>
						<tech-icon data-name="Amazon Web Services" data-icon="fab fa-aws"></tech-icon>
						<tech-icon data-name="Docker" data-icon="fab fa-docker"></tech-icon>
						<tech-icon data-name="Redis" data-icon="fak fa-redis"></tech-icon>
						<tech-icon data-name="RabbitMQ" data-icon="fak fa-rabbitmq"></tech-icon>
						<tech-icon data-name="CI/CD" data-icon="fas fa-pipe-valve"></tech-icon>
						<tech-icon data-name="GitHub" data-icon="fab fa-github"></tech-icon>
						<tech-icon data-name="Cloudflare" data-icon="fab fa-cloudflare"></tech-icon>
						<tech-icon data-name="Networking Protocols" data-icon="fal fa-network-wired"></tech-icon>
						<tech-icon data-name="Browser Extensions" data-icon="fal fa-browser"></tech-icon>
						<tech-icon data-name="Linux" data-icon="fab fa-linux"></tech-icon>
						<tech-icon data-name="FFmpeg" data-icon="fas fa-video-arrow-up-right"></tech-icon>
						<tech-icon data-name="Discord API" data-icon="fab fa-discord"></tech-icon>
						<tech-icon data-name="Minecraft APIs" data-icon="fak fa-minecraft"></tech-icon>
	                </repeating-list>
				</div>
            </div>
        </div>`;
    }
}

export { MySkills };
