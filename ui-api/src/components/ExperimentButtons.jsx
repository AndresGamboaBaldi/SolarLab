import { Typography, Box, Stack, Button } from '@mui/material';
import SaveExperimentDialog from './SaveExperimentDialog';
import ExperimentsListDialog from './ExperimentsList';
import React, { useEffect, useState } from 'react';
export default function ExperimentButtons() {
	const [openSaveExperiment, setOpenSaveExperiment] = useState(false);
	const [openExperimentsList, setOpenExperimentsList] = useState(false);

	return (
		<Box>
			<Stack
				direction='row'
				justifyContent='end'
				my={{ xxs: 2, xs: 3, s: 3, sm: 4 }}
				sx={{
					display: 'none',

					'@media (min-width:418px)': {
						display: 'flex',
					},
				}}
			>
				<Button
					variant='contained'
					sx={{
						textTransform: 'none',
						bgcolor: 'primary.700',
						mr: { xxs: 1, xs: 1, s: 2, sm: 3 },
					}}
					onClick={() => setOpenSaveExperiment(true)}
				>
					<Typography
						color='white.main'
						variant='buttonsHome'
						sx={{
							mx: { xxs: 0, xs: 0, s: 1, sm: 1 },
						}}
					>
						Save Current Experiment
					</Typography>
				</Button>
				<Button
					variant='outlined'
					sx={{
						textTransform: 'none',
						border: 1,
						textTransform: 'none',
						borderColor: 'primary.700',
					}}
					onClick={() => setOpenExperimentsList(true)}
				>
					<Typography
						color='primary.700'
						variant='buttonsHome'
						sx={{
							mx: { xxs: 0, xs: 0, s: 1, sm: 1 },
							'&:hover': {
								color: '#fff',
							},
						}}
					>
						Load Previous Experiment
					</Typography>
				</Button>
			</Stack>
			<Stack
				direction='row'
				justifyContent='end'
				my={{ xxs: 2, xs: 3, s: 3, sm: 4 }}
				sx={{
					display: 'flex',

					'@media (min-width:418px)': {
						display: 'none',
					},
				}}
			>
				<Button
					variant='contained'
					sx={{
						textTransform: 'none',
						bgcolor: 'primary.700',
						mr: { xxs: 1, xs: 1, s: 2, sm: 3 },
					}}
					onClick={() => setOpenSaveExperiment(true)}
				>
					<Typography
						color='white.main'
						variant='buttonsExperiments'
						sx={{
							mx: { xxs: 0, xs: 0, s: 1, sm: 1 },
						}}
					>
						Save Experiment
					</Typography>
				</Button>
				<Button
					variant='contained'
					color='white'
					sx={{
						textTransform: 'none',
						border: 1,
						textTransform: 'none',
						borderColor: 'primary.700',
					}}
					onClick={() => setOpenExperimentsList(true)}
				>
					<Typography
						color='primary.700'
						variant='buttonsExperiments'
						sx={{
							mx: { xxs: 0, xs: 0, s: 1, sm: 1 },
						}}
					>
						Load Experiment
					</Typography>
				</Button>
				<SaveExperimentDialog
					open={openSaveExperiment}
					handleClose={() => setOpenSaveExperiment(false)}
				/>
				<ExperimentsListDialog
					open={openExperimentsList}
					handleClose={() => setOpenExperimentsList(false)}
				/>
			</Stack>
		</Box>
	);
}
