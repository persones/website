let animatedItems = [];
let currentlyDispalyedProject = null;
let projects;
function init() {
	loadJSON("json/projects.json", (data) => {
		projects = data.projects;
		loadCategory("exploratorium");
	}, (err) => {
		console.log(err);
	});
}

function loadCategory(category) {
	document.querySelector("#item_list").innerHTML = "";
	projects.forEach((project) => {
		
		if (project.category == category) {
			let newButton = document.createElement("div");
			newButton.classList.add("item_button");
			newButton.innerHTML = project.id;
			newButton.addEventListener("click", (evt) => {
				displayProject(project);
			});
			document.querySelector("#item_list").appendChild(newButton);
		}
	});
}

function displayProject(project) {
	animatedItems.splice(animatedItems.indexOf(currentlyDispalyedProject), 1);
	currentlyDispalyedProject = new AnimatedProjects(project);
	animatedItems.push(currentlyDispalyedProject);
	
}

let previousTime = 0;
function step(timestamp) {
  let delta = timestamp - previousTime;
  for (let i = animatedItems.length - 1; i >= 0; i--) {
		if (animatedItems[i].draw(delta) == -1) {
			animatedItems.splice(i, 1);
		}
		i--;
	}
	previousTime = timestamp;
  window.requestAnimationFrame(step);
}
window.requestAnimationFrame(step);