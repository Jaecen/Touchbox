import { apply, put, takeEvery } from 'redux-saga/effects';

// A command starts by being REQUESTED.
// It's sent to the event API. If the API accepts it, it's DISPATCHED.
// If the API can't accept it, it's FAILED.
// Once the event is processed, if it was successful, it's RESOLVED.
// If it was unsuccessful, it's REJECTED.

// REQUESTED ---> DISPATCHED ---> RESOLVED
//            L-> FAILED     L-> REJECTED

export const INCREMENT_VALUE_REQUESTED = 'INCREMENT_VALUE_REQUESTED';
export const INCREMENT_VALUE_DISPATCHED = 'INCREMENT_VALUE_DISPATCHED';
export const INCREMENT_VALUE_FAILED = 'INCREMENT_VALUE_FAILED';
export const INCREMENT_VALUE_RESOLVED = 'INCREMENT_VALUE_RESOLVED';
export const INCREMENT_VALUE_REJECTED = 'INCREMENT_VALUE_REJECTED';

export const DECREMENT_VALUE_REQUESTED = 'DECREMENT_VALUE_REQUESTED';
export const DECREMENT_VALUE_DISPATCHED = 'DECREMENT_VALUE_DISPATCHED';
export const DECREMENT_VALUE_FAILED = 'DECREMENT_VALUE_FAILED';
export const DECREMENT_VALUE_RESOLVED = 'DECREMENT_VALUE_RESOLVED';
export const DECREMENT_VALUE_REJECTED = 'DECREMENT_VALUE_REJECTED';

export const CLEAR_VALUE_REQUESTED = 'CLEAR_VALUE_REQUESTED';
export const CLEAR_VALUE_DISPATCHED = 'CLEAR_VALUE_DISPATCHED';
export const CLEAR_VALUE_FAILED = 'CLEAR_VALUE_FAILED';
export const CLEAR_VALUE_RESOLVED = 'CLEAR_VALUE_RESOLVED';
export const CLEAR_VALUE_REJECTED = 'CLEAR_VALUE_REJECTED';

export default function (eventApiClient) {
	return function* () {
		yield takeEvery(INCREMENT_VALUE_REQUESTED, incrementValueHandler);
		yield takeEvery(DECREMENT_VALUE_REQUESTED, decrementValueHandler);
		yield takeEvery(CLEAR_VALUE_REQUESTED, clearValueHandler);

		function* incrementValueHandler(action) {
			try {
				yield apply(eventApiClient, eventApiClient.send, [{
					command: "INCREMENT_VALUE"
				}]);
				yield put({ type: INCREMENT_VALUE_DISPATCHED });
			}
			catch(error) {
				yield put({
					type: INCREMENT_VALUE_FAILED,
					error: error
				});
			}
		}

		function* decrementValueHandler(action) {
			try {
				yield apply(eventApiClient, eventApiClient.send, [{
					command: "DECREMENT_VALUE"
				}]);
				yield put({ type: DECREMENT_VALUE_DISPATCHED });
			}
			catch(error) {
				yield put({
					type: DECREMENT_VALUE_FAILED,
					error: error
				});
			}
		}

		function* clearValueHandler(action) {
			try {
				yield apply(eventApiClient, eventApiClient.send, [{
					command: "CLEAR_VALUE"
				}]);
				yield put({ type: CLEAR_VALUE_DISPATCHED });
			}
			catch(error) {
				yield put({
					type: CLEAR_VALUE_FAILED,
					error: error
				});
			}
		}
	}
}

export function incrementValue() {
	return {
		type: INCREMENT_VALUE_REQUESTED
	};
}

export function decrementValue() {
	return {
		type: DECREMENT_VALUE_REQUESTED
	};
}

export function clearValue() {
	return {
		type: CLEAR_VALUE_REQUESTED
	};
}
