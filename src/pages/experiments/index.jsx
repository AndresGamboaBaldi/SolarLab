import SaveExperimentDialog from '../../components/SaveExperimentDialog';
import ExperimentsListDialog from '../../components/ExperimentsList';
import { Box, Typography, Button, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';

export default function Experiments() {
	const [openSaveExperiment, setOpenSaveExperiment] = useState(false);
	const [openExperimentsList, setOpenExperimentsList] = useState(false);
	return (
		<Box
			sx={{
				mt: 10,
			}}
		>
			<Stack direction='row' justifyContent='end' mt={{ xxs: 2, xs: 4, sm: 4 }}>
				<Button
					variant='contained'
					sx={{
						textTransform: 'none',
						bgcolor: 'primary.700',
						mr: { xxs: 1, xs: 1, sm: 4 },
					}}
					onClick={() => setOpenSaveExperiment(true)}
				>
					<Typography
						color='white.main'
						variant='buttonsHome'
						sx={{
							mx: { xxs: 0, xs: 0, sm: 3 },
						}}
					>
						Save Current Experiment
					</Typography>
				</Button>
				<Button
					variant='contained'
					color='white'
					sx={{
						textTransform: 'none',
						mr: { xxs: 1, xs: 2, sm: 7 },
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
							mx: { xxs: 0, xs: 0, sm: 3 },
						}}
					>
						Load Previous Experiment
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
