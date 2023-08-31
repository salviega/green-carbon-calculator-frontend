import React, { useState } from 'react'
import { getAccount } from '@wagmi/core'
import { Container, Text, Center, VStack, Button, Flex } from '@chakra-ui/react'
import Projectsection, { SectionType } from '../../components/ProjectsSection'
import Head from 'next/head'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'

const metadata = {
	title: 'Footprint',
	description: 'Decentralized calculator'
}

const MyProjects = () => {
	const account = getAccount()
	const [walletConnected, setWalletConnected] = useState(false)
	const { address } = useAccount({
		onConnect({ address, connector, isReconnected }) {
			setWalletConnected(true)
		},
		onDisconnect() {
			setWalletConnected(false)
			console.log('Disconnected')
		}
	})
	const onCreateProject = () => {

	}
	return (
		<>
			<Head>
				<title>{metadata.title}</title>
				<meta name='description' content={metadata.description} />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/Images/favicon.ico' sizes='any' />
			</Head>
			{walletConnected ? (
				<>
					<Flex justifyContent="flex-start" alignItems="center" my="12">
						<Text
							as='h2'
							fontSize='5xl'
							fontWeight='bold'
							textColor='brand.newBlack'
						>
							My projects
						</Text>
						<Button
							w='10rem'
							onClick={onCreateProject}
							variant='primary'
							ml="10" // Agregar un margen izquierdo para dar espacio entre el texto y el botón
						>
							Create Project
						</Button>
					</Flex>
					<Projectsection type={SectionType.MY_PROJECTS}/>
				</>
			) : (
				<>
					<Container>
						<Center h='800px' w='100%'>
							<VStack>
								<Text
									fontSize='5xl'
									fontWeight='bold'
									textColor='brand.newBlack'
								>
									{"We don't bite🥹"}
								</Text>
								<Text fontSize='lg' textColor='gray.600' mb='4'>
									{
										'Please connect your wallet to see all your awesome projects🌴'
									}
								</Text>
								<ConnectButton />
							</VStack>
						</Center>
					</Container>
				</>
			)}
		</>
	)
}

export default MyProjects
