let PROJECT_DISPLAY_STATE = {
	TITLE: 0,
	DATES: 1,
	TEXT: 2,
	ROLE: 3,
	COLLABORATORS: 4,
	SKILLS: 5,
	GALLERY: 6
}

class AnimatedProjects {
	constructor(params) {
		this.params = params;
		this.state = PROJECT_DISPLAY_STATE.TITLE;
		this.animatedText = new AnimatedText("#project_title", this.params.id);
	}
	
	draw(delta) {
		if (this.animatedText.draw(delta) == -1) {
			switch (this.state) {
				case (PROJECT_DISPLAY_STATE.TITLE):
					this.animatedText = new AnimatedText("#project_dates", this.params.start_date + " - " + this.params.end_date);
					this.state = PROJECT_DISPLAY_STATE.DATES;
					break;
				case (PROJECT_DISPLAY_STATE.DATES): {
					this.animatedText = new AnimatedText("#project_text", this.params.text);
					this.state = PROJECT_DISPLAY_STATE.ROLE;
					break;
				}
			}
		}		
	}
	
	
	
}