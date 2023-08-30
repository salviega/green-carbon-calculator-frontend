import React, { useState } from 'react'
import Projectsection, { SectionType } from '../../components/ProjectsSection'
import Head from 'next/head'
import { Text } from '@chakra-ui/react'

const metadata = {
	title: 'Footprint',
	description: 'Decentralized calculator'
}

const Discovery = () => {
	return (
		<>
			<Head>
				<title>{metadata.title}</title>
				<meta name='description' content={metadata.description} />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/Images/favicon.ico' sizes='any' />
			</Head>
			<Text
				as='h2'
				fontSize='5xl'
				marginY='12'
				fontWeight='bold'
				textColor='brand.newBlack'
			>
				Discover Projects
			</Text>
			<Projectsection type={SectionType.GENERAL} />
		</>
	)
}

export default Discovery
