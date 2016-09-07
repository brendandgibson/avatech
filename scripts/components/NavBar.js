import React from 'react';
import NavBarTab from './NavBarTab';
import CompassHolder from './CompassHolder';

const style = {
	width: '100%',
	height: 44,
	background: 'white',
	display: 'inline'
};

/**
*
* Mock of Avatech NavBar across top of map
*
*/
const NavBar = React.createClass({

	render: function () {

		const aspectDropdown = <CompassHolder />;

		return (
			<div style={style}>
				<NavBarTab>TYPE</NavBarTab>
				<NavBarTab>TIME <span style={{color: '#999'}}>PAST WEEK</span></NavBarTab>
				<NavBarTab>ELEVATION</NavBarTab>
				<NavBarTab dropdown={aspectDropdown}>ASPECT</NavBarTab>
				<NavBarTab>SLOPE</NavBarTab>
			</div>
		);
	}
})

export default NavBar;
