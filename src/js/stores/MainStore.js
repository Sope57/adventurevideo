import { EventEmitter } from 'events';

import dispatcher from "../dispatcher"

class MainStore extends EventEmitter {
	constructor() {
		super();
		this.intro = true;
		this.course = null;

		this.intro = false;
		this.course = {
			title: "This is the Title",
			author: "Author",
			description: "This is a Description of the video",
			videos: [{
   "kind": "youtube#video",
   "etag": "\"I_8xdZu766_FSaexEaDXTIfEWc0/bMf5W_gue7rbxqkP13aUvNBJw34\"",
   "id": "uth-8cr4XFc",
   "snippet": {
    "publishedAt": "2015-03-07T03:59:04.000Z",
    "channelId": "UCEXAoGhPmdAmd-RekESfhiQ",
    "title": "Funny Clips in 30 Seconds",
    "description": "Funny Clips in 30 Seconds\n\nfunny video clips\nfunny clips\nfunny videos\nvideo\nyoutube\nfunny video\nfunny home videos\nfunniest home videos\nfunny home videos 2014\nvideo clips\nfunny compilations\nepic fails\nfail videos\nbloopers\nfunny bloopers\nfunny falls\nhahatv\nooops funny home videos\nworldsfunniestgags\nprankattacks\nFunny Videos\nFail Compilation\nFunny Pranks\nFunny People\nFunny Clips\nFunny Fails",
    "thumbnails": {
     "default": {
      "url": "https://i.ytimg.com/vi/uth-8cr4XFc/default.jpg",
      "width": 120,
      "height": 90
     },
     "medium": {
      "url": "https://i.ytimg.com/vi/uth-8cr4XFc/mqdefault.jpg",
      "width": 320,
      "height": 180
     },
     "high": {
      "url": "https://i.ytimg.com/vi/uth-8cr4XFc/hqdefault.jpg",
      "width": 480,
      "height": 360
     }
    },
    "channelTitle": "funny clips collection",
    "tags": [
     "Funny Clips in 30 Seconds Funny Clips",
     "funny video clips",
     "funny clips",
     "funny videos",
     "video",
     "youtube",
     "funny video",
     "funny home videos",
     "funniest home videos",
     "funny home videos 2014",
     "video clips",
     "funny compilations",
     "epic fails",
     "fail videos",
     "bloopers",
     "funny bloopers",
     "funny falls",
     "hahatv"
    ],
    "categoryId": "24",
    "liveBroadcastContent": "none",
    "localized": {
     "title": "Funny Clips in 30 Seconds",
     "description": "Funny Clips in 30 Seconds\n\nfunny video clips\nfunny clips\nfunny videos\nvideo\nyoutube\nfunny video\nfunny home videos\nfunniest home videos\nfunny home videos 2014\nvideo clips\nfunny compilations\nepic fails\nfail videos\nbloopers\nfunny bloopers\nfunny falls\nhahatv\nooops funny home videos\nworldsfunniestgags\nprankattacks\nFunny Videos\nFail Compilation\nFunny Pranks\nFunny People\nFunny Clips\nFunny Fails"
    },
    "defaultAudioLanguage": "en"
   },
   "contentDetails": {
    "duration": "PT33S",
    "dimension": "2d",
    "definition": "hd",
    "caption": "false",
    "licensedContent": false,
    "projection": "rectangular"
   }
  }]
		};

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