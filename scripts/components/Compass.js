import React from 'react';
import Radium from 'radium';

const radius = 30,
	ringWidth = 10,
	letterIndent = -5,
	size = 2 * radius + 2 * ringWidth,
	cx = size / 2,
	cy = cx,
	outerCircleStyle = {
		stroke: 'transparent',
		fill: 'transparent',
		strokeWidth: radius / 2,
		zIndex: 10
	},
	backgroundCircleStyle = {
		stroke: 'black',
		fill: 'transparent',
		strokeWidth: ringWidth,
		strokeDasharray: '1px, 4px'
	},
	letterStyle = {
		position: 'absolute',
		color: '#666',
		fontSize: 18,
		lineHeight: 1
	};

/**
*
* Component that renders selectable compass
*
*/
const Compass = React.createClass({

	propTypes: {
		start: React.PropTypes.number,
		end: React.PropTypes.number,
		onChange: React.PropTypes.func
	},

	getInitialState: function () {
		return {
			selecting: false,
			startAngle: null,
			endAngle: null
		};
	},

	// Calculate the aspect based on the mouse position in the supplied event e
	getAngle: function (e) {
		const wrapperBox = this.refs.outerCircle.getBoundingClientRect(),
			x = e.clientX - wrapperBox.left - (wrapperBox.width / 2),
			y =	e.clientY - wrapperBox.top - (wrapperBox.height / 2);
		return Math.atan2(y,x) * (180 / Math.PI) + 90;
	},


	// Set the first aspect point, listen for mouse events
	onMouseDown: function (e) {

		e.stopPropagation();
		e.preventDefault();

		window.addEventListener('mousemove', this.onMouseMove);
		window.addEventListener('mouseup', this.onMouseUp);

		const startAngle = this.getAngle(e);

		this.setState({
			selecting: true,
			startAngle: startAngle >= 0 ? startAngle : 360 + startAngle,
			endAngle: null
		});
	},

	// Monitor the mouse position, updating local state
	onMouseMove: function (e) {

		e.stopPropagation();
		e.preventDefault();

		if (!this.state.selecting) {
			return;
		}

		const endAngle = this.getAngle(e);

		this.setState({
			endAngle: endAngle >= 0 ? endAngle : 360 + endAngle
		});
	},

	// Pass the start and end angles up to the parent for storage
	onMouseUp: function (e) {

		e.stopPropagation();
		e.preventDefault();

		window.removeEventListener('mouseup', this.onMouseUp);
		window.removeEventListener('mousemove', this.onMouseMove);

		this.props.onChange && this.props.onChange({
			start: this.state.startAngle,
			end: this.state.endAngle
		});
		this.setState({
			selecting: false
		});
	},

	// Initialise state with props
	componentWillMount: function () {
		this.setState({
			startAngle: this.props.start,
			endAngle: this.props.end
		});
	},

	// Initialise state with props
	componentWillReceiveProps: function (nextProps) {
		this.setState({
			startAngle: nextProps.start,
			endAngle: nextProps.end
		});
	},

	componentWillUnmount: function () {
		window.removeEventListener('mouseup', this.onMouseUp);
		window.removeEventListener('mousemove', this.onMouseMove);
	},

	render: function () {

		const start = this.state.startAngle,
		 	end = this.state.endAngle,

			circumference = 2 * Math.PI * radius,
			diff = end > start ? end - start : end + (360 - start),
			percentage = end !== null && start !== null ? diff / 360 : null,
			strokeDasharray = percentage ? (percentage * circumference) + ', ' +
				(1 - percentage) * circumference : null;

		return (
			<div style={{position: 'relative', height: size, width: size}}>
				<div style={[letterStyle, {top: letterIndent, left: cx, transform: 'translate(-50%, -50%)'}]}>N</div>
				<div style={[letterStyle, {bottom: letterIndent, left: cx, transform: 'translate(-50%, 50%)'}]}>S</div>
				<div style={[letterStyle, {top: cy, right: letterIndent, transform: 'translate(50%, -50%)'}]}>E</div>
				<div style={[letterStyle, {top: cy, left: letterIndent, transform: 'translate(-50%, -50%)'}]}>W</div>

				<svg width={size} height={size} className='unselectable'>
					<circle className='unselectable'
						r={radius}
						cx={cx}
						cy={cy}
						style={backgroundCircleStyle}
					/>
					{percentage ? <circle className='unselectable'
						r={radius}
						cx={cx}
						cy={cy}
						style={{
							opacity: 0.5,
							stroke: this.state.selecting ? 'yellow' : 'blue',
							strokeDasharray: strokeDasharray,
							fill: 'transparent',
							strokeWidth: ringWidth,
							transformOrigin: cx + 'px ' + cy +'px',
							transform: `rotate(${start - 90}deg)`
						}}
					/> :
					null}
					<circle className='unselectable'
						ref='outerCircle'
						r={radius}
						cx={cx}
						cy={cy}
						style={outerCircleStyle}
						onMouseDown={this.onMouseDown}
					/>
				</svg>
			</div>
		);
	}
});

export default Radium(Compass);
