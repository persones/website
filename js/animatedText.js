let TEXT_ANIMATION_SPEED = 0.1;

class AnimatedText {
	constructor(id, text) {
		this.element = document.querySelector(id);
		this.text = text;
		this.timeElapsed = 0;
	}
	
	draw(delta) {
		this.timeElapsed += delta;
		this.element.innerHTML = this.text.substr(0, this.timeElapsed * TEXT_ANIMATION_SPEED);
		if (this.timeElapsed * TEXT_ANIMATION_SPEED > this.text.length) {
			return -1;
		}
		return 0;
	}
}