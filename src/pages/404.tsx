import React from 'react'

import { Box, Button, Text } from '@chakra-ui/react'
import Image from 'next/image'

import logo from '../assets/Images/brand-transparent.svg'
import { useRouter } from 'next/router'

export default function NotFoundPage() {
	const router = useRouter()

	const goHome = () => {
		router.push('/')
	}

	return (
		<Box
			width={'100%'}
			height={'75vh'}
			display={'flex'}
			flexDir={'column'}
			alignItems={'center'}
			justifyContent={'center'}
		>
			<Text marginY={6} fontSize='3xl' as='b'>
				This Page could not be found
			</Text>
			<Text marginBottom={6} fontSize='1xl'>
				ERRORCODE: 404
			</Text>
			<Button onClick={goHome}>GO BACK HOME</Button>
		</Box>
	)
}
