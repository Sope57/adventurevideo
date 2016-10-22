import React from 'react';

import IntroStore from '../../stores/IntroStore';
import * as storeActions from '../../actions/storeActions';

class FlowButton extends React.Component {
	hancleClick() {
		if(this.props.click) {
			const flowcount = this.props.flowCount ? this.props.flowCount : 1;
			this.props.click(flowcount);
		}
	}

	render(){
		const { text, flow } = this.props;
		let buttonText;

		if (text) {
			buttonText = text;
		} else {
			if (flow == "prev") {
				buttonText = <i className="fa fa-flip-horizontal fa-play" aria-hidden="true"></i>;
			} else {
				buttonText = <i className="fa fa-play" aria-hidden="true"></i>;
			}
		}

		return(
			<button id={flow} className="btn" onClick={this.hancleClick.bind(this)}>
				{ buttonText }
			</button>		
		);
	}
}

class Loader extends React.Component {
	render() {
		return(
			<div id="fetching">
				<i className="fa fa-spinner fa-spin fa-3x fa-fw"></i>
			</div>
		);
	}
}

class Welcome extends React.Component {
	render() {
		return(
			<div>
				<h1>Welcome to the super awesome video adventure creation app!</h1>
				<FlowButton flow="next" click={storeActions.advanceIntro} />
			</div>
		);
	}
}

class FetchVideo extends React.Component {
	constructor() {
		super();
		this.state = {
			fetching: IntroStore.fetching
		}
	}

	handleChange(e) {
		const url = e.target.value;
		storeActions.queryForVideo(url);
	}

	render() {
		return(
			<div>
				<h3>Please insert your Main Video URL to continue.</h3>
				<p><i>You will be able to add more videos later on.</i></p>
				<input type="text" placeholder="Only youtube for the moment :') plz be happy :D" onChange={this.handleChange.bind(this)}/>
			</div>
		);
	}
}

class ConfirmVideo extends React.Component {
	render() {
		return(
			<div>
				<h3>Is this your video?</h3>
				<img src={IntroStore.mainVideo.thumbnail_url} alt=""/>
				<p><i>{IntroStore.mainVideo.title}</i></p>
				<div>
					<FlowButton text="Nope..." flow="prev" click={storeActions.backIntro} />
					<FlowButton text="Absolutely!" flow="next" click={storeActions.advanceIntro} />
				</div>
			</div>
		);
	}
}

class CourseData extends React.Component {
	constructor() {
		super();
		this.state = {
			alert: false
		}
	}
	
	checkForData() {
		const { title, description, author } = this.refs;
		if (title.value && description.value && author.value) {
			storeActions.sendCourseData(title.value, description.value, author.value);
		} else {
			this.setState({
				alert: true
			})
		}
	}

	render() {
		const alertMessage = this.state.alert ? "Please fill out all remaining information." : null;
		return(
			<div>
				<h3>Awesome! Please help us out with your course info:</h3>
				<div>
					<h4>Course Title:</h4>
					<input type="text" placeholder="Make it simple, make it remarkable!" ref="title"/>
				</div>
				<div>
					<h4>Course Description:</h4>
					<input type="text" placeholder="What awesome skills will you be teaching?" ref="description"/>
				</div>
				<div>
					<h4>Author:</h4>
					<input type="text" placeholder="-Your name here-" ref="author"/>
				</div>
				<p><i>{alertMessage}</i></p>
				<FlowButton text="Changed my mind" flow="prev" click={storeActions.backIntro} flowCount={2}/>
				<FlowButton text="Almost Done!" flow="next" click={this.checkForData.bind(this)} />
			</div>
		);
	}
}

class ConfirmCourse extends React.Component {
	constructor() {
		super();
		this.state = {
			title: IntroStore.courseInfo.title,
			author: IntroStore.courseInfo.author,
			description: IntroStore.courseInfo.description,
			thumbnail: IntroStore.mainVideo.thumbnail_url,
		}
	}

	render() {
		const { title, author, description, thumbnail } = this.state;

		return(
			<div>
				<h3>Please review that all your information is correct:</h3>
				<h2>{title}</h2>
				<h4>By {author}</h4>
				<img src={thumbnail} alt=""/>
				<p>{description}</p>
				<FlowButton text="Not quite my course" flow="prev" click={storeActions.backIntro} flowCount={3}/>
				<FlowButton text="Perfect! Get me started" flow="next" click={storeActions.advanceIntro} />
			</div>
		);
	}
}

export default class Intro extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			stage: IntroStore.stage,
			fetching: IntroStore.fetching
		}
	}

	componentWillMount() {
		IntroStore.on("change", () => {
			this.setState({
				stage: IntroStore.stage,
				fetching: IntroStore.fetching
			});
		});
	}

	render() {
		const { stage, fetching } = this.state;
		const loader = (fetching ? <Loader /> : null);

		let renderView;
		switch(stage) {
			case 0: {
				renderView = <Welcome />;
				break;
			}
			case 1: {
				renderView = <FetchVideo />;
				break; 
			}
			case 2: {
				renderView = <ConfirmVideo />;
				break; 
			}
			case 3: {
				renderView = <CourseData />;
				break; 
			}
			case 4: {
				renderView = <ConfirmCourse />;
				break; 
			}
		}

		return (
			<div id="intro" className="text-center">
				<div className="container">
					<div className="row">
						{loader || null}
						{renderView}
					</div>
				</div>
			</div>
		)
	}
}