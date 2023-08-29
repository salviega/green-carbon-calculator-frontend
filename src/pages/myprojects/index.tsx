import React, { useEffect, useState } from 'react'
import { getAccount } from '@wagmi/core'
import {
	Stack,
	Flex,
	Spacer,
	Button,
	Text,
	VStack,
	useBreakpointValue,
	Box,
	HStack,
	Image,
	SimpleGrid,
	GridItem
} from '@chakra-ui/react'
import Projectsection from '../../components/ProjectsSection'
import Head from 'next/head'
import { firebaseApi } from '../../../services/firebaseApi'

const metadata = {
	title: 'Footprint',
	description: 'Decentralized calculator'
}

const MyProjects = () => {
	const account = getAccount()
	const { getProjectsByOwnerAddress } = firebaseApi()
  const [isConnected, setIsConnected] = useState(false)
	useEffect(() => {
    setIsConnected(account.isConnected)
    if(isConnected) {
      readProjects();
    }
  }, [account.isConnected])
  const readProjects = async () => {

  }
	return (
		<>
			<Head>
				<title>{metadata.title}</title>
				<meta name='description' content={metadata.description} />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/Images/favicon.ico' sizes='any' />
			</Head>
			{isConnected ?
			<>
        <Text as="h2" fontSize="5xl" marginY="12" fontWeight="bold" textColor="brand.newBlack">My projects</Text>
				<Projectsection />
			</>
			:
			<>

				Please connect your wallet
			</>}
		</>
	)
}

export default MyProjects
