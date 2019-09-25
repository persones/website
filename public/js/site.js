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

window.onload = (event) => {
  document.querySelector('#filter-type-selector')
	.addEventListener('change', async (event) => {
		let filterType = event.target.value;
		const response = await fetch(event.target.value);
		const json = await response.json();
		document.querySelector('#filter-selector').innerHTML = '';
		for (let item of json[filterType]) {
			let elem = document.createElement('option');
			elem.setAttribute('value', item._id);
			elem.innerHTML = item.name;
			document.querySelector('#filter-selector').appendChild(elem);
		}
	});

	document.querySelector('#filter-selector')
	.addEventListener('change', async (event) => {
		let filter =  event.target.value;
		let filtertype = document.querySelector('#filter-type-selector').value
		const response = await fetch(`project?${filtertype}=${event.target.value}`);
		const json = await response.json();
		for (let item of json.project) {
			console.log(item);
		}
	});

};



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