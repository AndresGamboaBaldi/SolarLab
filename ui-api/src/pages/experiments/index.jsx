import CitiesTypography from '../../components/CitiesTypography';
import CitiesCheckboxes from '../../components/CitiesCheckboxes';
import CitiesSelect from '../../components/CitiesSelect';
import ExperimentButtons from '../../components/ExperimentButtons';
import DepartamentExperiment from '../../components/DepartamentExperiment';
import { Box, Typography, Grid } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Head from 'next/head';

export default function Experiments() {
	return (
		<main>
			<div>
				<Head>
					<title>UPB Solar Remote Lab</title>
					<meta
						name='description'
						content='Remote Laboratory for Solar Energy'
					/>
					<link rel='icon' href='/logoYellow.png' />
				</Head>
			</div>
			<Box
				mt={{ xxs: 10, xs: 10, s: 10, sm: 12 }}
				px={{ xxs: 2, xs: 2, s: 4, sm: 6 }}
			>
				<Grid container>
					<Grid
						item
						sx={{
							display: 'flex',
							alignItems: 'center',
						}}
						xxs={12}
						xs={12}
						sm={5}
						md={3}
						mb={{ xxs: 2, xs: 2, s: 2, sm: 0, md: 0 }}
						justifyContent='flex-end'
						order={{ xxs: 1, xs: 1, s: 1, sm: 2 }}
					>
						<Typography variant='buttonsExperiments' color='primary.700'>
							Remaining Time:
						</Typography>
						<Typography
							ml={{ xxs: 1, xs: 1, s: 2, sm: 1 }}
							variant='buttonsExperiments'
							color='blacky.main'
						>
							10:32
						</Typography>
					</Grid>
					<Grid
						item
						sx={{
							display: 'flex',
							alignItems: 'center',
						}}
						xxs={12}
						xs={12}
						sm={7}
						md={9}
						order={{ xxs: 2, xs: 2, s: 2, sm: 1 }}
					>
						<CitiesTypography></CitiesTypography>
						<CitiesCheckboxes></CitiesCheckboxes>
						<CitiesSelect></CitiesSelect>
					</Grid>
				</Grid>
				<DepartamentExperiment></DepartamentExperiment>
				<ExperimentButtons></ExperimentButtons>
			</Box>
		</main>
	);
}
