import React from 'react';
import ReactDOM from 'react-dom';
import Main from './components/Main';
import configureStore from './configureStore';
import { Provider } from 'react-redux';

/**
*
* Main file for the javascript and rendering.
*
*/

const store = configureStore();

const entryId = 'entry',

	app = (function() {

		return function() {
			ReactDOM.render(<Provider store={store}><Main /></Provider>, document.getElementById(entryId));
		};

	})();

window.onload = app;
