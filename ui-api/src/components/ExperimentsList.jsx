import { Box, Button, Dialog, Grid, Typography, Stack } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useState, useEffect } from 'react';
import ExperimentActions from '../components/ExperimentActions';

const columns = [
	{ field: 'id', headerName: 'ID', width: 70 },
	{
		field: 'experimentName',
		headerName: 'Name',
		width: 130,
	},
	{ field: 'date', headerName: 'Date', width: 130 },
	{ field: 'modified', headerName: 'Modified', width: 130 },
	{
		field: 'numberOfCities',
		headerName: 'Cities',
		type: 'number',
		width: 70,
	},
	{
		field: 'owner',
		headerName: 'Owner',
		width: 200,
	},
	{
		field: 'actions',
		headerName: '',
		type: 'actions',
		width: 250,
		renderCell: (params) => <ExperimentActions />,
	},
];

const columnsMobile = [
	{ field: 'id', headerName: 'ID', width: 70 },
	{
		field: 'experimentName',
		headerName: 'Name',
		width: 110,
	},
	{ field: 'date', headerName: 'Date', width: 100 },

	{
		field: 'actions',
		headerName: '',
		type: 'actions',
		width: 200,
		renderCell: (params) => <ExperimentActions />,
	},
];

const rows = [
	{
		id: 1,
		experimentName: 'Experiment 1',
		date: '07/25/2023',
		modified: '3 days ago',
		numberOfCities: 3,
		owner: 'Andres Gamboa Baldi',
	},
	{
		id: 2,
		experimentName: 'Experiment 2',
		date: '06/25/2021',
		modified: '3 days ago',
		numberOfCities: 2,
		owner: 'Andres Gamboa Baldi',
	},
	{
		id: 3,
		experimentName: 'Experiment 3',
		date: '12/15/2020',
		modified: '3 days ago',
		numberOfCities: 2,
		owner: 'Andres Gamboa Baldi',
	},
	{
		id: 4,
		experimentName: 'Experiment 4',
		date: '11/25/2020',
		modified: '3 days ago',
		numberOfCities: 1,
		owner: 'Andres Gamboa Baldi',
	},
	{
		id: 5,
		experimentName: 'Experiment 5',
		date: '07/25/2023',
		modified: '3 days ago',
		numberOfCities: 3,
		owner: 'Andres Gamboa Baldi',
	},
	{
		id: 6,
		experimentName: 'Experiment 6',
		date: '07/25/2023',
		modified: '3 days ago',
		numberOfCities: 3,
		owner: 'Andres Gamboa Baldi',
	},
	{
		id: 7,
		experimentName: 'Experiment 7',
		date: '07/25/2023',
		modified: '3 days ago',
		numberOfCities: 1,
		owner: 'Andres Gamboa Baldi',
	},
];

export default function SaveExperimentDialog({ open, handleClose }) {
	const [isMobile, setIsMobile] = useState(false);
	//choose the screen size
	const handleResize = () => {
		if (window.innerWidth < 644) {
			console.log;
			setIsMobile(true);
		} else {
			setIsMobile(false);
		}
	};

	useEffect(() => {
		handleResize();
		window.addEventListener('resize', handleResize);
	}, []);

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			PaperProps={{
				sx: {
					borderRadius: '24px',
					maxWidth: '100%',
				},
			}}
		>
			<Box
				my={{ xxs: 3, xs: 3, s: 4, sm: 5 }}
				mx={{ xxs: 3, xs: 4, s: 5, sm: 6 }}
				sx={{
					height: '100%',
					width: 'auto',
				}}
			>
				<Grid container>
					<Grid item xxs={12} xs={12} mb={{ xxs: 1, xs: 2, s: 3, sm: 5 }}>
						<Typography variant='header1' color='secondary'>
							Saved{' '}
						</Typography>
						<Typography variant='header1' color='primary.700'>
							Experiments
						</Typography>
					</Grid>
				</Grid>
				<Box height='80%'>
					{isMobile ? (
						<DataGrid
							columnVisibilityModel={{
								id: false,
							}}
							rows={rows}
							columns={columnsMobile}
							initialState={{
								pagination: {
									paginationModel: { page: 0, pageSize: 5 },
								},
							}}
							pageSizeOptions={[5, 10]}
							getRowSpacing={(params) => ({
								top: params.isFirstVisible ? 0 : 5,
								bottom: params.isLastVisible ? 0 : 5,
							})}
							getRowId={(row) => row.id}
							rowsPerPageOptions={[5, 10, 20]}
							sx={{
								display: 'flex',
								border: 'none',
								'& .MuiDataGrid-cell': {
									color: 'blacky.main',
									fontFamily: 'Lato',
									fontSize: '0.7rem',
									'@media (min-width:306px)': {
										fontSize: '0.7rem',
									},
									'@media (min-width:412px)': {
										fontSize: '0.8rem',
									},
									'@media (min-width:512px)': {
										fontSize: '0.9rem',
									},
								},
								'& .MuiDataGrid-columnHeader': {
									color: 'blacky.main',
									borderBottom: 3,
								},
								'& .MuiDataGrid-columnHeaderTitle': {
									fontFamily: 'Lato',
									fontWeight: 700,
									fontSize: '0.7rem',
									'@media (min-width:306px)': {
										fontSize: '1.0rem',
									},
									'@media (min-width:412px)': {
										fontSize: '1.1rem',
									},
								},
								'& .MuiDataGrid-footerContainer': {
									boxShadow: 0,
									borderBottom: 'none',
								},
							}}
						/>
					) : (
						<DataGrid
							columnVisibilityModel={{
								id: false,
							}}
							rows={rows}
							columns={columns}
							initialState={{
								pagination: {
									paginationModel: { page: 0, pageSize: 5 },
								},
							}}
							pageSizeOptions={[5, 10]}
							getRowSpacing={(params) => ({
								top: params.isFirstVisible ? 0 : 5,
								bottom: params.isLastVisible ? 0 : 5,
							})}
							getRowId={(row) => row.id}
							rowsPerPageOptions={[5, 10, 20]}
							sx={{
								display: 'flex',

								boxShadow: 0,
								border: 'none',
								'& .MuiDataGrid-cell': {
									color: 'blacky.main',
									fontFamily: 'Lato',
									fontSize: '0.7rem',
									'@media (min-width:644px)': {
										fontSize: '1.0rem',
									},
									'@media (min-width:900px)': {
										fontSize: '1.1rem',
									},
								},
								'& .MuiDataGrid-columnHeader': {
									color: 'blacky.main',
									borderBottom: 3,
								},
								'& .MuiDataGrid-columnHeaderTitle': {
									fontFamily: 'Lato',
									fontWeight: 700,
									fontSize: '0.7rem',
									'@media (min-width:644px)': {
										fontSize: '1.2rem',
									},
									'@media (min-width:900px)': {
										fontSize: '1.3rem',
									},
								},
								'& .MuiDataGrid-virtualScroller': {
									color: 'primary.700',
								},
								'& .MuiDataGrid-footerContainer': {
									boxShadow: 0,
									borderBottom: 'none',
								},
							}}
						/>
					)}
				</Box>
				<Stack
					direction='row'
					justifyContent='end'
					mt={{ xxs: 2, xs: 3, sm: 4 }}
				>
					<Button
						color='white'
						variant='contained'
						sx={{
							border: 1,
							textTransform: 'none',
							borderColor: 'primary.700',
						}}
						onClick={handleClose}
					>
						<Typography
							mx={{ xxs: 0, xs: 0, sm: 1 }}
							variant='buttons1'
							color='primary.700'
							sx={{
								'&:hover': {
									color: '#fff',
								},
							}}
						>
							Go Back
						</Typography>
					</Button>
				</Stack>
			</Box>
		</Dialog>
	);
}
