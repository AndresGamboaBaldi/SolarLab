import { Box, IconButton, Typography, Grid } from '@mui/material';
import { Close, Launch } from '@mui/icons-material';
import React from 'react';
export default function ExperimentActions() {
	return (
		<Box>
			<Grid container>
				<Grid
					item
					mr={{ xxs: 1, xs: 2, s: 2, sm: 4 }}
					sx={{
						display: 'flex',
						alignItems: 'center',
					}}
				>
					<IconButton
						onClick={() => {}}
						sx={{
							color: 'secondary.main',
						}}
					>
						<Launch
							sx={{
								fontSize: { xxs: '20px', xs: '24px', sm: '30px' },
							}}
						/>
					</IconButton>
					<Typography>Open</Typography>
				</Grid>
				<Grid
					item
					sx={{
						display: 'flex',
						alignItems: 'center',
					}}
				>
					{' '}
					<IconButton
						onClick={() => {}}
						sx={{
							color: 'secondary.main',
						}}
					>
						<Close
							sx={{
								fontSize: { xxs: '20px', xs: '24px', sm: '30px' },
							}}
						/>
					</IconButton>
					<Typography>Delete</Typography>
				</Grid>
			</Grid>
		</Box>
	);
}
