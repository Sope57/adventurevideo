import axios from 'axios'
import dispatcher from '../dispatcher'

export function updatePlayerCurrentTime(currentTime) {
	console.log(currentTime);
	dispatcher.dispatch({ type: "UPDATE_CURRENT_TIME", currentTime });
}

export function createNewPromptPoint() {
	dispatcher.dispatch({ type: "NEW_PROMPTPOINT", id: Date.now() });
}

export function deletePromptPoint(index) {
	dispatcher.dispatch({ type: "DELETE_PROMPTPOINT", index });
}

export function savePromptPoint(index, time, promptType, outcome) {
	dispatcher.dispatch({ type: "SAVE_PROMPTPOINT", index, time, promptType, outcome });
}

export function finishPromptPoint(index, question, options) {
	dispatcher.dispatch({ type: "FINISH_PROMPTPOINT", index, question, options });
}

export function newURLPromptPoint(index, url) {
	const vidkey = url.substr(url.length - 11, 11);
	axios.get("https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id="+vidkey+"&key=AIzaSyA0mhtFXzJ_cFy6PMdGqSUJsV8ve8ANDRg")
		.then((response) => {
			window.response = response;
			if (response.data.items[0].id) {
				dispatcher.dispatch({ type: "RECEIVED_VIDEO", index, data: response.data.items[0] });
			} else {
				dispatcher.dispatch({ type: "URL_FETCH_ERROR" });
			}
		}).catch((error) => {
			dispatcher.dispatch({ type: "URL_FETCH_ERROR" });
		});
}

export function resetPromptWindow() {
	dispatcher.dispatch({ type: "RESET_PROMPT_WINDOW" });
}

export function resetPromptWindowAndAdvance() {
	dispatcher.dispatch({ type: "RESET_PROMPT_WINDOW_AND_ADVANCE" });
}

