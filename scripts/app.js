import React from 'react';
import ReactDOM from 'react-dom';
import Main from './components/Main';

/**
*
* Main file for the javascript and rendering.
*
*/
var entryId = 'entry',

	app = (function() {

		return function() {
			ReactDOM.render(<Main />, document.getElementById(entryId));
		};

	})();

window.onload = app;
