import React from 'react';

import MainStore from '../../stores/MainStore';
import * as mainActions from '../../actions/mainActions';

require('./prompt.sass');

export default class Prompt extends React.Component {
	constructor(props) {
		super(props);
	}

	_continueVideo() {
		this.props.player.playVideo();
		mainActions.resetPromptWindow();
	}

	_renderQuestion() {
		const question = MainStore.promptPoints[this.props.index].params[0];
		const options = MainStore.promptPoints[this.props.index].params[1].map((option, index) => {
			return (
				<div className="option" key={index}>
					<button className="btn btn-success" onClick={this._continueVideo.bind(this)}>
						<i className="fa fa-hand-o-right" aria-hidden="true"></i>
					</button>
					<p>{option}</p>
				</div>
			);
		});

		return (
			<div>
				<h3 className="question">
					<i className="fa fa-question-circle" aria-hidden="true"></i>
					{question}
				</h3>
				<div className="options">{options}</div>
			</div>
		)
	}

	render() {
		const { type } = MainStore.promptPoints[this.props.index];

		let prompt;
		switch(type) {
			case "Question": {
				prompt = this._renderQuestion();
				break;
			}
		}

		return(
			<div id="prompt">
				<div className="window">
					{ prompt }
				</div>
			</div>
		);
	}
}