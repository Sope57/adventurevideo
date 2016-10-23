import React from 'react';

import MainStore from '../../stores/MainStore';
import * as mainActions from '../../actions/mainActions';

export default class PromptPoint extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			edit: true,
			detail: false,
			time: null,
			type: null,
			outcome: null,
			error: null
		}
	}
	
	_cancelPromptPoint() {
		mainActions.deletePromptPoint(this.props.index);
	}

	_editPromptPoint() {
		this.setState({
			edit: true
		})
	}

	_advancePromptPoint() {
		const { time, type, outcome } = this.refs;
		if (time.value && parseFloat(time.value)) {
			this.setState({
				detail: true,
				time: time.value,
				type: type.value,
				outcome: outcome.value,
				error: null
			});
			mainActions.savePromptPoint(this.props.index, time.value, type.value, outcome.value);
		} else {
			this.setState({
				error: "Please enter a valid time in seconds."
			});
		}
	}

	_finishPromptPoint() {
		if (this.state.type == "Question") {
			const { question, option1, option2, option3, option4, option5, option6 } = this.refs;
			if (question.value && option1.value && option2.value) {
				const options = [option1.value, option2.value, option3.value, option4.value, option5.value, option6.value];
				const validOptions = [];
				options.map((option) => {
					if(option != "") { validOptions.push(option) }
				})
				this.setState({
					edit: false,
					details: false,
					error: null
				});
				mainActions.finishPromptPoint(this.props.index, question.value, validOptions);
			} else {
				this.setState({
					error: "Please fill out the Question and at least Options 1 and 2."
				});
			}		
		}
	}

	_renderEdit2() {
		const { type, outcome, error } = this.state;
		let typeInput, outcomeInput;
		switch(type) {
			case "Question": {
				typeInput = (
					<div>
						<div className="prompt-row">Question:</div>
						<div className="prompt-row"><textarea ref="question"/></div>
						<div className="prompt-row"><div>Option 1:</div><input type="text" ref="option1"/></div>
						<div className="prompt-row"><div>Option 2:</div><input type="text" ref="option2"/></div>
						<div className="prompt-row"><div>Option 3:</div><input type="text" ref="option3"/></div>
						<div className="prompt-row"><div>Option 4:</div><input type="text" ref="option4"/></div>
						<div className="prompt-row"><div>Option 5:</div><input type="text" ref="option5"/></div>
						<div className="prompt-row"><div>Option 6:</div><input type="text" ref="option6"/></div>
					</div>	
				)
				break;
			}
		}

		return (
			<div className="prompt-point">
				{ typeInput }
				<div className="prompt-row">
					<button className="btn btn-danger" onClick={this._cancelPromptPoint.bind(this)}>
						<i className="fa fa-trash" aria-hidden="true"></i>
					</button>
					<button className="btn btn-success" onClick={this._finishPromptPoint.bind(this)}>Done!</button>
				</div>
				<div className="error">{error}</div>
			</div>
		)
	}

	_renderEdit1() {
		const { error } = this.state;
		return(
			<div className="prompt-point">
				<div className="prompt-row">
					<div>Time:</div>
					<input type="text" placeholder="In seconds..." ref="time"/>
				</div>
				<div className="prompt-row">
					<div>Type:</div>
					<select ref="type">
  						<option value="Question">Question</option>
					</select>
				</div>
				<div className="prompt-row">
					<div>Outcome:</div>
					<select ref="outcome">
  						<option value="Continue">Continue Video</option>
					</select>
				</div>
				<div className="prompt-row">
					<button className="btn btn-danger" onClick={this._cancelPromptPoint.bind(this)}>
						<i className="fa fa-trash" aria-hidden="true"></i>
					</button>
					<button className="btn btn-success" onClick={this._advancePromptPoint.bind(this)}>Enter Details</button>
				</div>
				<div className="error">{error}</div>
			</div>
		)
	}

	_renderComplete() {
		const { time, type, outcome } = this.state;
		return(
			<div className="prompt-point">
				<div className="prompt-row">Time: { time } secs</div>
				<div className="prompt-row">Type: { type }</div>
				<div className="prompt-row">Outcome: { outcome }</div>
				<div className="prompt-row">
					<button className="btn btn-danger" onClick={this._cancelPromptPoint.bind(this)}>
						<i className="fa fa-trash" aria-hidden="true"></i>
					</button>
					<button className="btn btn-success" onClick={this._editPromptPoint.bind(this)}>
						<i className="fa fa-pencil" aria-hidden="true"></i>
					</button>
				</div>
			</div>
		);
	}

	render() {
		const { edit, detail } = this.state;
		
		let promptPoint;
		if (edit && detail) {
			promptPoint = this._renderEdit2();
		} else if(edit) {
			promptPoint = this._renderEdit1();
		} else {
			promptPoint = this._renderComplete();
		}

		return promptPoint;
	}
}