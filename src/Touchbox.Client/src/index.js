import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';

import reducer from './reducers';
import valueSagaBuilder from './actions';

import EventApiClient from './EventApiClient';

import './index.css';
import App from './component/App';
import * as serviceWorker from './serviceWorker';

const eventApiClient = new EventApiClient('ws://localhost:18954');
eventApiClient.connect();

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
	reducer,
	composeEnhancers(applyMiddleware(sagaMiddleware)));

const valueSaga = valueSagaBuilder(eventApiClient);
sagaMiddleware.run(valueSaga);

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
