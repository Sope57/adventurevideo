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

export function resetPromptWindow() {
	dispatcher.dispatch({ type: "RESET_PROMPT_WINDOW" });
}
