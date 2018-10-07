import React from 'react';
import { connect } from 'react-redux';

import { incrementValue, decrementValue, clearValue } from '../actions';

import Counter from './Counter'
import logo from './logo.svg';
import './App.css';

const App = ({ value, incrementValue, decrementValue, clearValue }) => (
	<div className="App">
		<main className="App-main">
			<img src={logo} className="App-logo" alt="logo" />
			<Counter value={value} incrementValue={incrementValue} decrementValue={decrementValue} clearValue={clearValue} />
		</main>
	</div>
);

export default connect(
	(state) => state,
	{
		incrementValue,
		decrementValue,
		clearValue
	})(App);
