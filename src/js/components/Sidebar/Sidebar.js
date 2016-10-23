import React from 'react';

import PromptPoint from '../PromptPoint/PromptPoint';
import MainStore from '../../stores/MainStore';
import * as mainActions from '../../actions/mainActions';

require('./sidebar.sass');

export default class Sidebar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			promptPoints: MainStore.promptPoints
		}
	}

	render() {
		const { promptPoints } = this.state;
		const showPromptPoints = promptPoints.map((point, index) => {
			return <PromptPoint key={point.id} index={index} />
		})

		return(
			<div id="sidebar" className="col-xs-3 text-center">
				<button className="btn btn-primary" onClick={mainActions.createNewPromptPoint}>
					<i className="fa fa-plus" aria-hidden="true"></i> Add a Prompt Point
				</button>
				{ showPromptPoints || null }
			</div>
		);
	}
}