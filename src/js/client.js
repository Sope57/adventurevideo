import React from 'react'
import ReactDOM from 'react-dom'

import Main from './components/Main/Main'

class Client extends React.Component {
	render() {
		return(
			<div>
				<Main />
			</div>
		)
	}
}

const app = document.getElementById('app');

ReactDOM.render(<Client />, app)