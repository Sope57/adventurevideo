import { EventEmitter } from 'events';

import dispatcher from "../dispatcher"

class MainStore extends EventEmitter {
	constructor() {
		super();
		this.intro = true;
		this.course = null;
		this.promptPoints = [];
		this.promptReady = false;
		this.promptRef = 0;
		this.playerData = null;
		this.promptWindow = null;
		this.fetchError = null;
	}

	handleActions(action) {
		switch(action.type) {
			case "BEGIN_COURSE_CREATION": {
				this.intro = false;
				this.course = action.course;
				this.emit("change");
				break;
			}
			case "NEW_PROMPTPOINT": {
				this.promptPoints.push({
					id: action.id,
					time: null,
					type: null,
					outcome: null,
					params: [],
					responses: []
				});
				this.emit("change");
				break;
			}
			case "DELETE_PROMPTPOINT": {
				this.promptPoints.splice(action.index, 1);
				this.emit("change");
				break;
			}
			case "SAVE_PROMPTPOINT": {
				this.promptPoints[action.index].time = parseFloat(action.time);
				this.promptPoints[action.index].type = action.promptType;
				this.promptPoints[action.index].outcome = action.outcome;
				this.emit("change");
				break;
			}
			case "FINISH_PROMPTPOINT": {
				this.promptPoints[action.index].params.push(action.question);
				this.promptPoints[action.index].params.push(action.options);
				this.emit("change");
				break;
			}
			case "RECEIVED_VIDEO": {
				this.promptPoints[action.index].params.push(action.data.id);
				this.course.videos.push(action.data);
				this.emit("urlReceived");
				break;
			}
			case "URL_FETCH_ERROR": {
				this.fetchError = "Please insert a valid Youtube Video URL.";
				this.emit("urlError");
				break;
			}
			case "RESET_PROMPT_WINDOW": {
				this.promptWindow = null;
				this.emit("resetPrompt");
				break;
			}
			case "RESET_PROMPT_WINDOW_AND_ADVANCE": {
				this.promptRef = this.promptRef + 1;
				this.emit("resetPromptAndAdvance");
				break;
			}
		}
	}
}

const mainStore = new MainStore;
dispatcher.register(mainStore.handleActions.bind(mainStore));
window.mainStore = mainStore;

export default mainStore;