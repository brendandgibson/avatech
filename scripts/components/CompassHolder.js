import React from 'react';
import CompassSelector from '../containers/CompassSelector';

const style = {
		position: 'absolute',
		top: '100%',
		padding: 20,
		background: '#f5f5f5',
		left: 0,
		zIndex: 10,
		borderRadius: 5,
		boxShadow: '5px 5px 5px #ccc'
	},
	ctaStyle = {
		position: 'absolute',
		top: '110%',
		left: '110%',
		opacity: 0.8,
		padding: '12px 24px',
		background: 'yellow',
		width: 200
	};

/**
*
* Dropdown element that holds the compass aspect selector
*
*/
const CompassHolder = React.createClass({

	getInitialState: function () {
		return {
			showCTA: true
		};
	},

	// Hide CTA after a small amount of time
	componentDidMount: function () {
		this.hoverTimeout = window.setTimeout(() => {
			this.setState({
				showCTA: false
			});
		}, 3000)
	},

	onClick: function (e) {
		e.preventDefault();
		e.stopPropagation();
	},

	render: function () {

		return (
			<div style={style} key='compassHolder' onClick={this.onClick}>
				<CompassSelector />
				{this.state.showCTA ?
					<div style={ctaStyle}>Drag mouse around compass to select aspects</div>
				:
				null}
			</div>
		)
	}
})

export default CompassHolder;
