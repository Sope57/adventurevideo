import React from 'react';
import TransitionGroup from 'react-addons-transition-group';

import Editor from '../Editor/Editor';
import Intro from '../Intro/Intro';
import MainStore from '../../stores/MainStore';

export default class Main extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			intro: MainStore.intro
		}
	}

	componentWillMount() {
		MainStore.on("change", () => {
			this.setState({
				intro: MainStore.intro,
			})
		});
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