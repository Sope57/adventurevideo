import React from 'react';
import YoutubeMoodVideo  from 'react-youtube';

import Prompt from '../Prompt/Prompt';
import Sidebar from '../Sidebar/Sidebar';
import MainStore from '../../stores/MainStore';
import * as mainActions from '../../actions/mainActions';

require('./editor.sass');

export default class Editor extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title: MainStore.course.title,
			promptReady: MainStore.promptReady,
			loadWithPrompts: false,
			videoPlayer: null,
			currentPrompt: 0,
			currentVideo: MainStore.promptRef,
			promptWindow: MainStore.promptWindow
		}

		this.playerCurrentTime = null;
	}

  	_onReady(event) {
    	this.setState({
      		videoPlayer: event.target,
    	});
  	}

  	_onStateChange(event) {
    	switch(event.data) {
    		case 1: {
    			this.playerCurrentTime = setInterval(() => {
    				if (MainStore.promptPoints[this.state.currentPrompt]) {
						if(this.state.videoPlayer.getCurrentTime() > MainStore.promptPoints[this.state.currentPrompt].time) {
							this.state.videoPlayer.pauseVideo();
							this.setState({
								currentPrompt: this.state.currentPrompt + 1,
								promptWindow: <Prompt index={this.state.currentPrompt} player={this.state.videoPlayer}/>
							})
						}
    				}
    			}, 500);
				break;
    		}
    		case 2: {
    			clearInterval(this.playerCurrentTime);
    			break;
    		}
    	}
  	}

  	_reloadVideo() {
		this.setState ({
			loadWithPrompts: true
		});
  	}

  	componentWillMount() {
  		MainStore.on("resetPrompt", ()=>{
  			this.setState({
  				promptWindow: null
  			});
  		});
  		MainStore.on("resetPromptAndAdvance", ()=>{
  			this.setState({
				currentVideo: MainStore.promptRef,
  				promptWindow: null
  			});
  		})
  	}

	render() {
		let player;

		if(this.state.loadWithPrompts) {
			const opts = {
      			playerVars: { // https://developers.google.com/youtube/player_parameters
	        		'autoplay': 1,
    	    		'controls': 0,
        			'disablekb': 1,
        			'rel': 0,
        			'showinfo': 0,
	        		'modestbranding': 1
    	  		}
			}
			player = <YoutubeMoodVideo
				videoId={MainStore.course.videos[this.state.currentVideo].id}
				opts={opts}
				onReady={this._onReady.bind(this)}
				onStateChange={this._onStateChange.bind(this)}/>
		} else {
			const opts = {
      			playerVars: { // https://developers.google.com/youtube/player_parameters
	        		'autoplay': 0,
        			'rel': 0,
    	  		}
			}
			player = <YoutubeMoodVideo videoId={MainStore.course.videos[this.state.currentVideo].id} opts={opts} />
		}

		return(
			<div className="container-fluid">
				<div className="row">
					<div id="editor" className="col-xs-9 text-center">
					 	<div>
							<h2>Welcome to your course editor!</h2>
							<h4>
								Begin by adding <span className="blue">Prompt Points</span>&nbsp;
								<i className="fa fa-long-arrow-right" aria-hidden="true"></i>
							</h4>
					 	</div>
					 	<div id="video-container">
					 		{ this.state.promptWindow }
					 		{ player }
					 	</div>
					 	<div>
							<h4>
								<i className="fa fa-arrow-down" aria-hidden="true"></i>
								&nbsp;<span className="green">Reload</span> the video to see the results.&nbsp;
								<i className="fa fa-arrow-down" aria-hidden="true"></i>
							</h4>
					 		<p><i>You can play and navigate the video to see where you want to add your Prompt Points.</i></p>
					 		<p><i>After reloading, you will not be able to use the player's controls except for Pause and Play.</i></p>
					 		<button className="btn btn-success" onClick={this._reloadVideo.bind(this)}>Reload with Prompts!</button>
					 	</div>

					</div>
					<Sidebar />
				</div>
			</div>
		);
	}
}