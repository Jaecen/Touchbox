export const INCREMENT_VALUE = 'INCREMENT_VALUE';
export const DECREMENT_VALUE = 'DECREMENT_VALUE';
export const CLEAR_VALUE = 'CLEAR_VALUE';

export function incrementValue() {
	return {
		type: INCREMENT_VALUE
	};
}

export function decrementValue() {
	return {
		type: DECREMENT_VALUE
	};
}

export function clearValue() {
	return {
		type: CLEAR_VALUE
	};
}
