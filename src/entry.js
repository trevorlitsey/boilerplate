import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import './firebase';

ReactDOM.render(<App />, document.getElementById('root'));

if (module.hot) {
	module.hot.accept('./App.js', function () {
		const NextApp = require('./App').default;
		ReactDOM.render(<NextApp />, document.getElementById('root'));
	})
}