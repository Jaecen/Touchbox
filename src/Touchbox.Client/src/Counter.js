import React from 'react'
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import ClearIcon from '@material-ui/icons/Clear';

const Counter = () => (
	<div>
		<div>
		0
		</div>
		<Button variant="contained" color="primary">
			<AddIcon />
		</Button>
		<Button variant="contained" color="secondary">
			<RemoveIcon />
		</Button>
		<Button variant="contained" color="default">
			<ClearIcon />
		</Button>
	</div>
);

export default Counter;