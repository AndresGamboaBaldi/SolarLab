import {
	Box,
	Dialog,
	Grid,
	TextField,
	Typography,
	Button,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import CoursesActions from '../components/CoursesActions';

export default function CoursesDialog({ open, handleClose, user }) {
	const { data: session, status } = useSession();

	const [name, setName] = useState('');

	const columns = [
		{ field: 'id', headerName: 'ID', width: 70 },
		{
			field: 'name',
			headerName: 'Name',
			width: 180,
		},
		{
			field: 'teacherId',
			headerName: 'Teacher',
			width: 180,
			valueGetter: (params) => params.row?.teacher?.user?.fullname,
		},
		{
			field: 'actions',
			headerName: '',
			type: 'actions',
			width: 180,
			renderCell: (params) => (
				<CoursesActions params={params} handleClose={handleClose} />
			),
		},
	];

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			PaperProps={{
				sx: {
					borderRadius: '24px',
					maxWidth: '660px',
				},
			}}
		>
			<Box
				m={{ xxs: 3, xs: 4, sm: 5 }}
				sx={{
					alignItems: 'center',
				}}
			>
				<Grid container justifyContent='center' rowSpacing={2}>
					<Grid item>
						<Typography variant='header1' color='secondary'>
							Solar{' '}
						</Typography>
						<Typography variant='header1' color='primary.700'>
							Remote Lab
						</Typography>
					</Grid>

					<Grid item xxs={12} xs={12}>
						<Typography variant='header2'>Available Courses:</Typography>
					</Grid>
					<Box height='80%' width='100%' mt={{ xxs: 1, xs: 1, s: 2, sm: 2 }}>
						{user ? (
							<DataGrid
								columnVisibilityModel={{
									id: false,
								}}
								rows={user.student.courses}
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
										fontSize: '1.0rem',
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
										fontSize: '1.1rem',
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
						) : null}
					</Box>
				</Grid>
			</Box>
		</Dialog>
	);
}
