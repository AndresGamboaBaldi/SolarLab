import {
	Typography,
	Box,
	Grid,
	AppBar,
	Tabs,
	Tab,
	Button,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import PropTypes from 'prop-types';
function TabPanel(props) {
	const { children, value, index } = props;

	return (
		<div role='tabpanel' hidden={value !== index}>
			{value === index && (
				<Box p={3} pt={0}>
					<Typography component={'span'}>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
};

export default function ShowSpecs({ city }) {
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<Box
			sx={{
				flexGrow: 1,
				bgcolor: 'background.paper',
				display: 'flex',
				maxWidth: '40vh',
			}}
		>
			<AppBar position='static' color='white'>
				<Grid container>
					<Grid
						item
						xxs={12}
						xs={12}
						sx={{
							display: 'flex',
							alignItems: 'center',
						}}
						justifyContent='center'
					></Grid>
					<Tabs
						value={value}
						onChange={handleChange}
						textColor='secondary'
						indicatorColor='secondary'
						variant='scrollable'
						scrollButtons
						allowScrollButtonsMobile
					>
						<Tab
							label='Angle'
							sx={{
								textTransform: 'none',
							}}
						/>
						<Tab
							label='Solar Panel'
							sx={{
								textTransform: 'none',
							}}
						/>
						<Tab
							label='UVA Sensor'
							sx={{
								textTransform: 'none',
							}}
						/>
						<Tab
							label='Radiation Sensor'
							sx={{
								textTransform: 'none',
							}}
						/>
					</Tabs>

					<Grid
						item
						xxs={12}
						xs={12}
						sx={{
							display: 'flex',
							alignItems: 'center',
						}}
						justifyContent='center'
					>
						<TabPanel value={value} index={0}>
							<Grid container>
								<Grid
									item
									xxs={12}
									xs={12}
									sx={{
										display: 'flex',
										alignItems: 'center',
									}}
									justifyContent='center'
								>
									<Typography
										variant='titleDepartment'
										color='primary.700'
										mt={2}
										component={'span'}
									>
										Information
									</Typography>
								</Grid>
								<Grid item xxs={12} xs={12}>
									<Typography
										variant='titleDepartment'
										color='blacky.main'
										mr={1}
										component={'span'}
									>
										Used Angle:
									</Typography>
								</Grid>
							</Grid>
						</TabPanel>
						<TabPanel value={value} index={1}>
							<Grid container>
								<Grid item xxs={12} xs={12} mt={2}>
									<Typography
										variant='titleDepartment'
										color='blacky.main'
										mr={1}
										component={'span'}
									>
										Model:
									</Typography>
									<Typography variant='dataDepartment' color='blacky.main'>
										Photovoltaic Module I-75/12
									</Typography>
								</Grid>

								<Grid
									item
									xxs={12}
									xs={12}
									sx={{
										display: 'flex',
										alignItems: 'center',
									}}
									justifyContent='center'
								>
									<Typography
										variant='titleDepartment'
										color='primary.700'
										component={'span'}
									>
										Specifications
									</Typography>
								</Grid>

								<Grid item xxs={12} xs={12}>
									<Typography
										variant='titleDepartment'
										color='blacky.main'
										mr={1}
									>
										Maximun Power:
									</Typography>
									<Typography variant='dataDepartment' color='blacky.main'>
										75 W (+-10%)
									</Typography>
								</Grid>
								<Grid item xxs={12} xs={12}>
									<Typography
										variant='titleDepartment'
										color='blacky.main'
										mr={1}
									>
										Short Circuit Current:
									</Typography>
									<Typography variant='dataDepartment' color='blacky.main'>
										4.67 A
									</Typography>
								</Grid>
								<Grid item xxs={12} xs={12}>
									<Typography
										variant='titleDepartment'
										color='blacky.main'
										mr={1}
									>
										Open Circuit Voltage:
									</Typography>
									<Typography variant='dataDepartment' color='blacky.main'>
										21.6 V
									</Typography>
								</Grid>
								<Grid item xxs={12} xs={12}>
									<Typography
										variant='titleDepartment'
										color='blacky.main'
										mr={1}
									>
										Maximun Power Current:
									</Typography>
									<Typography variant='dataDepartment' color='blacky.main'>
										4.34 A
									</Typography>
								</Grid>
								<Grid item xxs={12} xs={12}>
									<Typography
										variant='titleDepartment'
										color='blacky.main'
										mr={1}
									>
										Maximun Power Voltage:
									</Typography>
									<Typography variant='dataDepartment' color='blacky.main'>
										17.3 V
									</Typography>
								</Grid>
								<Grid
									item
									xxs={12}
									xs={12}
									mt={1}
									sx={{
										display: 'flex',
									}}
									justifyContent={'flex-end'}
								>
									<Button
										variant='contained'
										href='https://www.pvxchange.com/Solar-Modules/Isofoton/UL-I-75S-12_1-2100261'
										sx={{
											bgcolor: 'primary.700',
											textTransform: 'none',
										}}
									>
										<Typography variant='buttons2' color='white'>
											More Info
										</Typography>
									</Button>
								</Grid>
							</Grid>
						</TabPanel>
						<TabPanel value={value} index={2}>
							<Grid container>
								<Grid item xxs={12} xs={12} mt={2}>
									<Typography
										variant='titleDepartment'
										color='blacky.main'
										mr={1}
									>
										Model:
									</Typography>
									<Typography variant='dataDepartment' color='blacky.main'>
										LP UVA 02
									</Typography>
								</Grid>
								<Grid
									item
									xxs={12}
									xs={12}
									sx={{
										display: 'flex',
										alignItems: 'center',
									}}
									justifyContent='center'
									my={1}
								>
									<Image
										src='/lpUVA.jpg'
										alt='Upb Logo White'
										width={144}
										height={144}
									/>
								</Grid>
								<Grid
									item
									xxs={12}
									xs={12}
									sx={{
										display: 'flex',
										alignItems: 'center',
									}}
									justifyContent='center'
								>
									<Typography
										variant='titleDepartment'
										color='primary.700'
										component={'span'}
									>
										Specifications
									</Typography>
								</Grid>

								<Grid item xxs={12} xs={12}>
									<Typography
										variant='titleDepartment'
										color='blacky.main'
										mr={1}
									>
										Sensitivity:
									</Typography>
									<Typography variant='dataDepartment' color='blacky.main'>
										38.5 u(W/m2)
									</Typography>
								</Grid>
								<Grid
									item
									xxs={12}
									xs={12}
									mt={1}
									sx={{
										display: 'flex',
									}}
									justifyContent={'flex-end'}
								>
									<Button
										variant='contained'
										href='https://www.deltaohm.com/wp-content/uploads/document/DeltaOHM-LPUVA02-manual-en.pdf'
										sx={{
											bgcolor: 'primary.700',
											textTransform: 'none',
										}}
									>
										<Typography variant='buttons2' color='white'>
											More Info
										</Typography>
									</Button>
								</Grid>
							</Grid>
						</TabPanel>
						<TabPanel value={value} index={3}>
							<Grid container>
								<Grid item xxs={12} xs={12} mt={2}>
									<Typography
										variant='titleDepartment'
										color='blacky.main'
										mr={1}
									>
										Model:
									</Typography>
									<Typography variant='dataDepartment' color='blacky.main'>
										Pyranometer CMP6
									</Typography>
								</Grid>
								<Grid
									item
									xxs={12}
									xs={12}
									sx={{
										display: 'flex',
										alignItems: 'center',
									}}
									justifyContent='center'
									my={1}
								>
									<Image
										src='/CMP6.jpg'
										alt='Upb Logo White'
										width={144}
										height={144}
									/>
								</Grid>
								<Grid
									item
									xxs={12}
									xs={12}
									sx={{
										display: 'flex',
										alignItems: 'center',
									}}
									justifyContent='center'
								>
									<Typography
										variant='titleDepartment'
										color='primary.700'
										mt={2}
										component={'span'}
									>
										Specifications
									</Typography>
								</Grid>

								<Grid item xxs={12} xs={12}>
									<Typography
										variant='titleDepartment'
										color='blacky.main'
										mr={1}
									>
										Sensitivity:
									</Typography>
									<Typography variant='dataDepartment' color='blacky.main'>
										15.87 u(W/m2)
									</Typography>
								</Grid>
								<Grid
									item
									xxs={12}
									xs={12}
									mt={1}
									sx={{
										display: 'flex',
									}}
									justifyContent={'flex-end'}
								>
									<Button
										variant='contained'
										href='https://www.kippzonen.com/Product/12/CMP6-Pyranometer#.Ymw4ztrMJPZ'
										sx={{
											bgcolor: 'primary.700',
											textTransform: 'none',
										}}
									>
										<Typography variant='buttons2' color='white'>
											More Info
										</Typography>
									</Button>
								</Grid>
							</Grid>
						</TabPanel>
					</Grid>
				</Grid>
			</AppBar>
		</Box>
	);
}
