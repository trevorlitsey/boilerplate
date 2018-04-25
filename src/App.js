import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import firebase, { db } from './firebase';
import { processPreview } from './helpers';

import Index from './pages/Index';
import Snippets from './pages/Snippets';
import NotFound from './pages/NotFound';

import './styles/styles.scss';

class App extends React.Component {

	state = {
		user: {},
	}

	componentWillMount = () => {
		firebase.auth().onAuthStateChanged((user) => {
			this.setState({ user });
		})
	}

	render() {

		const { user } = this.state;

		return (
			<BrowserRouter>
				<Switch>
					<Route exact path="/" render={(props) => <Index {...props} user={user} />} />
					<Route exact path="/snippets" component={(props) => <Snippets {...props} user={user} />} />
					<Route component={NotFound} />
				</Switch>
			</BrowserRouter>
		)
	}
}


export default App;