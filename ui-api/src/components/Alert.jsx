import React from 'react';
import { Snackbar, Alert, Typography, AlertTitle } from '@mui/material';
function AlertComponent(props) {
	const { open, handleClose, status, message } = props;

	const [state, setState] = React.useState({
		vertical: 'bottom',
		horizontal: 'center',
	});
	const { vertical, horizontal } = state;
	return (
		<div>
			<Snackbar
				open={open}
				autoHideDuration={5000}
				onClose={handleClose}
				anchorOrigin={{ vertical, horizontal }}
			>
				<Alert
					onClose={handleClose}
					severity={status}
					variant='filled'
					color={status}
				>
					{message}
				</Alert>
			</Snackbar>
		</div>
	);
}

export default AlertComponent;
