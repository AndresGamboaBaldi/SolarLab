import { Box, IconButton, Typography, Grid } from '@mui/material';
import { Send } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
export default function ExperimentActions({ params, handleClose }) {
	const { data: session } = useSession();
	const requestToJoin = async () => {
		const response = await fetch(`/api/request/create`, {
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'POST',
			body: JSON.stringify({ courseId: params.id, email: session.user.email }),
		});
		const answer = await response.json();
		if (!answer.status) {
			toast.error("'Something Went Wrong, Please Try Again Later'");
		} else {
			toast.success('Request Sended Successfully!');
			handleClose();
		}
	};

	return (
		<Box>
			<Grid container>
				<Grid
					onClick={requestToJoin}
					item
					sx={{
						display: 'flex',
						alignItems: 'center',
						cursor: 'pointer',
					}}
				>
					<IconButton
						sx={{
							color: 'primary.700',
						}}
					>
						<Send
							sx={{
								fontSize: { xxs: '20px', xs: '24px', sm: '30px' },
							}}
						/>
					</IconButton>
					<Typography color='primary.700'>Request To Join</Typography>
				</Grid>
			</Grid>
		</Box>
	);
}
