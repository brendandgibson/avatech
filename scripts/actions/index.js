import fetch from 'isomorphic-fetch'

/**
*
* Redux actions for fetching and saving aspect angles
*
*/

// URLs on node server
const retrievalURL = '/retrieve',
	saveURL = '/save?';

// Action to update the compass angles
export const UPDATE_COMPASS = 'UPDATE_COMPASS';
export function updateCompass(angles) {
	return {
		type: UPDATE_COMPASS,
		angles
	}
};

// Make a request to the server for angle data
export function fetchCompassData() {
	return dispatch => {
		return fetch(retrievalURL)
			.then(response => response.json())
			.then(json =>
				dispatch(updateCompass(json))

			);
	}
};

// Save the current angle data to the server
export function saveCompassData(data) {
	return dispatch => {
		return fetch(saveURL + JSON.stringify(data));
	}
};
