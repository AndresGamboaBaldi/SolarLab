import { Box, Grid, Card, Typography, Stack, Button } from '@mui/material';
import { toast } from 'react-toastify';
import CreateCourseDialog from '../../components/CourseDialog';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

import Head from 'next/head';

export default function Experiments() {
	const { data: session, status } = useSession();

	const checkSession = async () => {
		if (status === 'authenticated') {
			await loadData();
		} else if (status === 'unauthenticated') {
			router.push('/');
		}
	};

	const loadData = async () => {
		var response;
		if (!window.localStorage.getItem('EXPERIMENT')) {
			response = await fetch(`/api/experiments/readFirst`, {
				headers: {
					'Content-Type': 'application/json',
				},
				method: 'POST',
				body: JSON.stringify({ email: session.user.email }),
			});
		}

		const answer = await response.json();
		if (!answer.status) {
			toast.error('Something Went Wrong, Please Try Again');
		} else {
			if (answer.experiment) {
			} else {
			}
		}
	};

	useEffect(() => {
		checkSession();
	}, []);

	const router = useRouter();

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
				px={{ xxs: 2, xs: 2, s: 3, sm: 4 }}
			>
				<Card
					elevation={5}
					my={{ xxs: 2, xs: 3, s: 3, sm: 4 }}
					mx={{ xxs: 2, xs: 2, s: 2, sm: 2 }}
					sx={{
						height: '100%',
						width: 'auto',
					}}
				>
					<Box
						my={{ xxs: 2, xs: 3, s: 3, sm: 4 }}
						mx={{ xxs: 3, xs: 3, s: 4, sm: 5 }}
					></Box>
				</Card>
			</Box>
		</main>
	);
}
