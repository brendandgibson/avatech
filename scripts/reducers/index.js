import { combineReducers } from 'redux';
import { UPDATE_COMPASS } from '../actions';

const compassSelector = (state, action) => {

	// It is important to have a default aspect selection so that
	// the user has an easier time understanding what the Compass widget can do
	if (state === undefined) {
		return {
			start: 0,
			end: 90
		};
	}
	switch (action.type) {
		case UPDATE_COMPASS:
			return {
				start: action.angles.start,
				end: action.angles.end
			}

		default:
			return state
	}
},

avatechApp = combineReducers({
	compassSelector
});

export default avatechApp
