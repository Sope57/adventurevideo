import axios from 'axios'
import dispatcher from '../dispatcher'

export function backIntro(count) {
	dispatcher.dispatch({ type: "BACK_INTRO_STAGE", count });
}

export function advanceIntro(count) {
	dispatcher.dispatch({ type: "ADVANCE_INTRO_STAGE", count });
}

export function queryForVideo(url) {
	dispatcher.dispatch({ type: "FETCHING_MAIN_VIDEO" });
	axios.get("https://sope57.github.io/adventurevideo/src/php/getYoutube.php?url=" + url)
		.then((response) => {
			if (response.data.id) {
				dispatcher.dispatch({ type: "RECEIVED_MAIN_VIDEO", data: response.data });
			} else {
				dispatcher.dispatch({ type: "URL_FETCH_ERROR" });
			}
		});
}

export function sendCourseData(title, description, author) {
	dispatcher.dispatch({ type: "RECEIVE_COURSE_DATA", data: {title, description, author} });
}

export function initMain(course) {
	dispatcher.dispatch({ type: "BEGIN_COURSE_CREATION", course });
}