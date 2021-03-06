import { EventEmitter } from 'events';

import dispatcher from "../dispatcher"

class IntroStore extends EventEmitter {
	constructor() {
		super();
		this.stage = 0;
		this.fetching = false;
		this.mainVideo = null;
		this.courseInfo = null;
		this.fetchError = null;
	}

	handleActions(action) {
		switch(action.type) {
			case "BACK_INTRO_STAGE": {
				this.stage = this.stage - action.count;
				this.emit("change");
				break;
			}
			case "ADVANCE_INTRO_STAGE": {
				this.stage = this.stage + action.count;
				this.emit("change");
				break;
			}
			case "FETCHING_MAIN_VIDEO": {
				this.fetching = true;
				this.emit("change");
				break;
			}
			case "RECEIVED_MAIN_VIDEO": {
				this.stage = this.stage + 1;
				this.fetching = false;
				this.fetchError = null;
				this.mainVideo = action.data;
				this.emit("change");
				break;
			}
			case "URL_FETCH_ERROR": {
				this.fetching = false;
				this.fetchError = "Please insert a valid Youtube Video URL.";
				this.emit("urlError");
				break;
			}
			case "RECEIVE_COURSE_DATA": {
				this.stage = this.stage + 1;
				this.courseInfo = {
					title: action.data.title,
					description: action.data.description,
					author: action.data.author
				};
				this.emit("change");
				break;
			}
		}
	}
}

const introStore = new IntroStore;
dispatcher.register(introStore.handleActions.bind(introStore));
window.introStore = introStore;

export default introStore;