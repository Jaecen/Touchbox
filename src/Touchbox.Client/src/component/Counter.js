import React from 'react'
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import ClearIcon from '@material-ui/icons/Clear';

const Counter = ({ value, incrementValue, decrementValue, clearValue }) => (
	<div>
		<div>
			{value}
		</div>
		<Button variant="contained" color="primary" onClick={incrementValue}>
			<AddIcon />
		</Button>
		<Button variant="contained" color="secondary" onClick={decrementValue}>
			<RemoveIcon />
		</Button>
		<Button variant="contained" color="default" onClick={clearValue}>
			<ClearIcon />
		</Button>
	</div>
);

export default Counter;