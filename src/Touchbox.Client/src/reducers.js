import { INCREMENT_VALUE, DECREMENT_VALUE, CLEAR_VALUE } from "./actions"

const defaultState = {
	value: 0
};

export default function reducer(state = defaultState, action) {
	switch(action.type) {
		case INCREMENT_VALUE:
			console.log('inc');
			return {
				...state,
				value: state.value + 1,
			};

		case DECREMENT_VALUE:
			return {
				...state,
				value: state.value - 1,
			};

		case CLEAR_VALUE:
			return {
				...state,
				value: 0,
			};

		default:
			return state;
	}
}