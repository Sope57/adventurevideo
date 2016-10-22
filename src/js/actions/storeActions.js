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
	setTimeout(() => {
		const response = {
			"html":"\u003ciframe width=\"480\" height=\"270\" src=\"https:\/\/www.youtube.com\/embed\/k3O01EfM5fU?feature=oembed\" frameborder=\"0\" allowfullscreen\u003e\u003c\/iframe\u003e",
			"height":270,"author_name":"LastWeekTonight",
			"thumbnail_url":"https:\/\/i.ytimg.com\/vi\/k3O01EfM5fU\/hqdefault.jpg",
			"type":"video",
			"thumbnail_width":480,
			"provider_url":"https:\/\/www.youtube.com\/",
			"version":"1.0",
			"thumbnail_height":360,
			"width":480,
			"provider_name":"YouTube",
			"author_url":"https:\/\/www.youtube.com\/user\/LastWeekTonight",
			"title":"Third Parties: Last Week Tonight with John Oliver (HBO)"};
		dispatcher.dispatch({ type: "RECEIVED_MAIN_VIDEO", data: response });
	}, 500);
	// axios.get("https://www.youtube.com/oembed?url=" + url + "&format=json")
	// 	.then((response) => {
	// 		dispatcher.dispatch({ type: "RECEIVED_MAIN_VIDEO", data: response });
	// 	})
	// 	.catch((error) => {
 //    		console.log(error);
 //  		});;
}

export function sendCourseData(title, description, author) {
	dispatcher.dispatch({ type: "RECEIVE_COURSE_DATA", data: {title, description, author} });
}