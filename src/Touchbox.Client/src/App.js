import React from 'react';
import Counter from './Counter'
import logo from './logo.svg';
import './App.css';

const App = () => (
	<div className="App">
		<main className="App-main">
			<img src={logo} className="App-logo" alt="logo" />
			<Counter />
		</main>
	</div>
);

export default App;
