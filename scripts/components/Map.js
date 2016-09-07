import React from 'react';
import _ from 'lodash';
import NavBar from './NavBar';

const imageStyle = {
		display: 'block',
		margin: 0,
		padding: 0,
		border: 'none',
		width: 960,
		top: 0,
		left: 0,
		position: 'absolute'
	},

	// stub data for items on a map
	mapItems = [
		{type: 'avalanche', aspect: 45, x: 500, y: 720}
	];

/**
*
* Show Map with selections
*
*/
const Map = React.createClass({

	propTypes: {
		filters: React.PropTypes.object.isRequired // filters for items on the map
	},

	render: function () {

		// TODO: get this working, with nice icons etc
		const aspectFilter = this.props.filters.aspect,
			items = _.map(
						_.filter(mapItems, (item) => item.aspect > aspectFilter.start && item.aspect > aspectFilter.end),
						(filteredItem, index) => {
							return <div key={'item_' + index} style={{top: filteredItem.x, left: filteredItem.y, height: 5, width: 5, background: 'red'}} />
						}
					);
		return (
			<div style={{display: 'inline-block', border: '1px solid gray'}}>
				<NavBar />
				<div style={{position: 'relative'}}>
					<img src='http://raw.githubusercontent.com/brendandgibson/avatech/master/images/yotei.png'  style={imageStyle} />
					{items}
				</div>
			</div>
		);
	}
});

export default Map;
