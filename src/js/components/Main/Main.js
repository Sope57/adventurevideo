import React from 'react';
import TransitionGroup from 'react-addons-transition-group';

import Intro from '../Intro/Intro';

export default class Main extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			intro: true
		}
	}

	render() {
		const { intro } = this.state;
		let View = intro ? <Intro /> : <Editor />;
		return(
			<div>
				{View}
			</div>
		);
	}
}