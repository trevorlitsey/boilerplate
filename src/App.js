import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import firebase, { db } from './firebase';
import { processPreview } from './helpers';

import Index from './pages/Index';
import Snippets from './pages/Snippets';
import NotFound from './pages/NotFound';

import './styles/styles.scss';

class App extends React.Component {

	render() {

		return (
			<BrowserRouter>
				<Switch>
					<Route exact path="/" render={Index} />
					<Route exact path="/snippets" component={Snippets} />
					<Route component={NotFound} />
				</Switch>
			</BrowserRouter>
		)
	}
}


export default App;