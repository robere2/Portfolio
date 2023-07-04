import "./MyProjects.css";

class MyProjects extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
			<h1>Projects</h1>
			<div class="row projects-row">
				<div>
					<h2>RPI TV Glimpse</h2>
					<p>
						Glimpse is the infrastructure behind RPI TV, the television club at Rensselaer Polytechnic
						Institute. I worked on it through most of my college career. It is responsible for the creation
						and management of club events, communication channels, and more. 
					</p>
					
                    <ul class="merriweather links-list">
                        <li>
                            <a href="https://rpi.tv/" rel="noopener">Website</a>
                        </li>
                        <li>
                            <a href="https://github.com/orgs/rpitv/repositories?q=glimpse&type=source&language=&sort=" rel="noopener">Repositories</a>
                        </li>
                    </ul>  
				</div>
				<div>
					<h2>Badlion Client</h2>
					<p>
						I worked on the Badlion Client during the Summer of 2021. Badlion Client is a modded version of
						Minecraft with a large set of features and enhancements for multiplayer gameplay.
					</p>
					<ul class="merriweather links-list">
                        <li>
                            <a href="https://client.badlion.net/" rel="noopener">Website</a>
                        </li>
                    </ul>  
				</div>
				<div>
					<h2>Quickplay</h2>
					<p>
						Quickplay is a Minecraft mod I founded in 2016 with the goal of navigating around multiplayer 
						servers faster. While the project is still active, I have mostly stepped away from development
						and instead focus on maintenance, infrastructure/deployment, and general oversight.
					</p>
					<ul class="merriweather links-list">
                        <li>
                            <a href="https://bugg.co/quickplay" rel="noopener">Website</a>
                        </li>
                        <li>
                            <a href="https://github.com/quickplaymod" rel="noopener">Repositories</a>
                        </li>
                    </ul>  
				</div>
			</div>
		`;
    }
}

export { MyProjects };
