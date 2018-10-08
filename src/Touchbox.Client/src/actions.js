import { delay } from 'redux-saga'
import { call, put, takeEvery } from 'redux-saga/effects';

export const INCREMENT_VALUE_REQUESTED = 'INCREMENT_VALUE_REQUESTED';
export const INCREMENT_VALUE_SUCCEEDED = 'INCREMENT_VALUE_SUCCEEDED';
export const INCREMENT_VALUE_FAILED = 'INCREMENT_VALUE_FAILED';

export const DECREMENT_VALUE_REQUESTED = 'DECREMENT_VALUE_REQUESTED';
export const DECREMENT_VALUE_SUCCEEDED = 'DECREMENT_VALUE_SUCCEEDED';
export const DECREMENT_VALUE_FAILED = 'DECREMENT_VALUE_FAILED';

export const CLEAR_VALUE_REQUESTED = 'CLEAR_VALUE_REQUESTED ';
export const CLEAR_VALUE_SUCCEEDED = 'CLEAR_VALUE_SUCCEEDED ';
export const CLEAR_VALUE_FAILED = 'CLEAR_VALUE_FAILED';

let internal_value = 0;

export function incrementValueWork() {
	return ++internal_value;
}

export function decrementValueWork() {
	return --internal_value;
}

export function clearValueWork() {
	return internal_value = 0;
}

function* incrementValueHandler(action) {
	try {
		yield call(delay, 1000);
		const value = yield call(incrementValueWork);
		yield put({ type: INCREMENT_VALUE_SUCCEEDED, value: value });
	} catch(e) {
		yield put({ type: INCREMENT_VALUE_FAILED, message: e.message });
	}
}

function* decrementValueHandler(action) {
	try {
		yield call(delay, 1000);
		const value = yield call(decrementValueWork);
		yield put({ type: DECREMENT_VALUE_SUCCEEDED, value: value });
	} catch(e) {
		yield put({ type: DECREMENT_VALUE_FAILED, message: e.message });
	}
}

function* clearValueHandler(action) {
	try {
		yield call(delay, 1000);
		const value = yield call(clearValueWork);
		yield put({ type: CLEAR_VALUE_SUCCEEDED, value: value });
	} catch(e) {
		yield put({ type: CLEAR_VALUE_FAILED, message: e.message });
	}
}

export function* valueSaga() {
	yield takeEvery(INCREMENT_VALUE_REQUESTED, incrementValueHandler);
	yield takeEvery(DECREMENT_VALUE_REQUESTED, decrementValueHandler);
	yield takeEvery(CLEAR_VALUE_REQUESTED, clearValueHandler);
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
