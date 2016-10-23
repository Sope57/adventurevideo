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
	const vidkey = url.substr(url.length - 11, 11);
	axios.get("https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id="+vidkey+"&key=AIzaSyA0mhtFXzJ_cFy6PMdGqSUJsV8ve8ANDRg")
		.then((response) => {
			window.response = response;
			if (response.data.items[0].id) {
				dispatcher.dispatch({ type: "RECEIVED_MAIN_VIDEO", data: response.data.items[0] });
			} else {
				dispatcher.dispatch({ type: "URL_FETCH_ERROR" });
			}
		}).catch((error) => {
			dispatcher.dispatch({ type: "URL_FETCH_ERROR" });
		});
}

export function sendCourseData(title, description, author) {
	dispatcher.dispatch({ type: "RECEIVE_COURSE_DATA", data: {title, description, author} });
}

export function initMain(course) {
	dispatcher.dispatch({ type: "BEGIN_COURSE_CREATION", course });
}