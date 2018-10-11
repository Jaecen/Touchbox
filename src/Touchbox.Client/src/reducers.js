import {
	INCREMENT_VALUE_REQUESTED,
	INCREMENT_VALUE_FAILED,
	INCREMENT_VALUE_RESOLVED,
	INCREMENT_VALUE_REJECTED,

	DECREMENT_VALUE_REQUESTED,
	DECREMENT_VALUE_FAILED,
	DECREMENT_VALUE_RESOLVED,
	DECREMENT_VALUE_REJECTED,

	CLEAR_VALUE_REQUESTED,
	CLEAR_VALUE_FAILED,
	CLEAR_VALUE_RESOLVED,
	CLEAR_VALUE_REJECTED,
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

		case INCREMENT_VALUE_FAILED:
		case DECREMENT_VALUE_FAILED:
		case CLEAR_VALUE_FAILED:
			// Display the error message
			return state;

		case INCREMENT_VALUE_RESOLVED:
		case DECREMENT_VALUE_RESOLVED:
		case CLEAR_VALUE_RESOLVED:
			// Clear the spinner and show the value
			return {
				...state,
				value: action.value,
			};

		case INCREMENT_VALUE_REJECTED:
		case DECREMENT_VALUE_REJECTED:
		case CLEAR_VALUE_REJECTED:
			// Display the error message
			return state;

		default:
			return state;
	}
}