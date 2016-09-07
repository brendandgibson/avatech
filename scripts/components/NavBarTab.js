import React from 'react';

const caretStyle = {
		display: 'inline-block',
		borderTop: '4px solid black',
		borderLeft: '4px solid transparent',
		borderBottom: '4px solid transparent',
		borderRight: '4px solid transparent',
		verticalAlign: 'middle',
		height: 0,
		width: 0,
		marginLeft: 5
	};

/**
*
* Tab item on the NavBar
*
*/
const NavBarTab = React.createClass({

	propTypes: {
		dropdown: React.PropTypes.node
	},

	getInitialState: function () {
		return {
			open: false
		};
	},

	onClick: function () {
		this.setState({
			open: !this.state.open
		})
	},

	render: function () {
		const style = {
			position: 'relative',
			display: 'inline-block',
			padding: '0 12px 0 14px',
			lineHeight: '42px',
			fontSize: 12,
			textAlign: 'center',
			borderRight: '1px solid #e0e0e0',
			background: this.state.open ? '#f5f5f5' : 'white',
			cursor: this.props.dropdown ? 'pointer' : null
		};

		return(
			<div style={style} onClick={this.onClick}>
				{this.props.children}
				<div style={caretStyle} />
				{this.state.open ? this.props.dropdown : null}
			</div>
		);
	}
});

export default NavBarTab;
