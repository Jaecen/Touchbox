import {
	INCREMENT_VALUE_REQUESTED,
	INCREMENT_VALUE_SUCCEEDED,
	DECREMENT_VALUE_REQUESTED,
	DECREMENT_VALUE_SUCCEEDED,
	CLEAR_VALUE_REQUESTED,
	CLEAR_VALUE_SUCCEEDED
} from "./actions";

const defaultState = {
	value: 0
};

export default function reducer(state = defaultState, action) {
	switch(action.type) {
		case INCREMENT_VALUE_REQUESTED:
		case DECREMENT_VALUE_REQUESTED:
		case CLEAR_VALUE_REQUESTED:
			// Put a spinner on the value
			return {
				...state,
				value: "?",
			};

		case INCREMENT_VALUE_SUCCEEDED:
		case DECREMENT_VALUE_SUCCEEDED:
		case CLEAR_VALUE_SUCCEEDED:
			// Clear the spinner and show the value
			return {
				...state,
				value: action.value,
			};

		default:
			return state;
	}
}