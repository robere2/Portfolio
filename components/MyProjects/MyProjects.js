import './MyProjects.css'

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
						and management of club events, communication channels, and more. You can visit the web page at
						<a href="https://rpi.tv/">https://rpi.tv/</a>.  
					</p>
				</div>
				<div>
					<h2>Badlion Client</h2>
					<p>
						I worked on the Badlion Client during the Summer of 2021. Badlion Client is a modded version of
						Minecraft with a large set of features and enhancements for multiplayer gameplay. You can
						download it at <a href="https://client.badlion.net/">https://client.badlion.net/</a>.   
					</p>
				</div>
				<div>
					<h2>Quickplay</h2>
					<p>
						Quickplay is a Minecraft mod I founded in 2016 with the goal of navigating around multiplayer 
						servers faster. While the project is still active, I have mostly stepped away from development
						and instead focus on maintenance, infrastructure/deployment, and general oversight. You can
						download or view its source code at
						<a href="https://github.com/quickplaymod">https://github.com/quickplaymod</a>.
					</p>
				</div>
			</div>
		`;
	}

}

export { MyProjects }
