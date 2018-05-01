import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import firebase, { db } from './firebase';
import { processPreview } from './helpers';

import Index from './pages/Index';
import Snippets from './pages/Snippets';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';

import './styles/styles.scss';

const App = () => (
	<BrowserRouter>
		<Switch>
			<Route exact path="/" component={Index} />
			<Route exact path="/snippets" component={Snippets} />
			<Route exact path="/admin" component={Admin} />
			<Route component={NotFound} />
		</Switch>
	</BrowserRouter>
)

export default App;