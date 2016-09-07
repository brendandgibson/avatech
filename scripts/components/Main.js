import React from 'react';
import CompassSelector from '../containers/CompassSelector';
import {fetchCompassData} from '../actions';
import MapContainer from '../containers/MapContainer';

const Main = React.createClass({

	render: function () {
		return (
			<div>
				<h1>Aspect Selector</h1>
				<h5>Brendan Gibson 7 September 2016</h5>
				<MapContainer />
			</div>
		);
	}
})

export default Main;
