import React from 'react';
import { connect } from 'react-redux';
import Compass from '../components/Compass';
import { fetchCompassData, saveCompassData } from '../actions';

/**
*
* Redux container class for the Compass visual component
*
* Handles all the data passing to props
*
*/

const mapStateToProps = (state) => {

	return {
		start: state.compassSelector.start,
		end: state.compassSelector.end
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		onTodoClick: (id) => {
			dispatch(toggleTodo(id))
		}
	}
}

const CompassSelector = React.createClass({

	propTypes: {
		dispatch: React.PropTypes.func
	},

	componentWillMount: function () {
		this.props.dispatch(fetchCompassData());
	},

	// When Compass has updated, pass the new angles in here
	onChange: function (data) {
		this.props.dispatch(saveCompassData(data));
	},

	render: function () {
		return <Compass {...this.props} onChange={this.onChange} />;
	}
});

export default connect(
	mapStateToProps
)(CompassSelector);
