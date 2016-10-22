import React from 'react'
import ReactDOM from 'react-dom'

import Main from './components/Main/Main'
import Sidebar from './components/Sidebar/Sidebar'

class Client extends React.Component {
	render() {
		return(
			<div>
				<Main />
				<Sidebar />
			</div>
		)
	}
}

const app = document.getElementById('app');

ReactDOM.render(<Client />, app)