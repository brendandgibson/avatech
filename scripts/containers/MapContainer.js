import React from 'react';
import { connect } from 'react-redux';
import Map from '../components/Map';

/**
*
* Redux container for the Map visual component
*
*
*/

const mapStateToProps = (state) => {

	return {
		filters: {
			aspect: {
				start: state.compassSelector.start,
				end: state.compassSelector.end
			}
		}
	};
}


export default connect(
	mapStateToProps
)(Map);
