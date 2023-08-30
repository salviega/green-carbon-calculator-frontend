import React, { useState } from 'react'
import Projectsection from '../../components/ProjectsSection'
import Head from 'next/head'

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
			<Projectsection />
		</>
	)
}

export default Discovery
