import React, { useState } from 'react'
import { SimpleGrid } from '@chakra-ui/react';
import ProyectCard from './ProyectCard';
import { Project } from '@/models/project.model';
import { useAccount } from 'wagmi';
import { firebaseApi } from '../../services/firebaseApi';
const ProjectsSection = () => {
	const { getProjectsByOwnerAddress } = firebaseApi()
  const cardArray = Array.from({ length: 3 }, (_, index) => index);
  const [projects, setProjects] = useState<Project[] | null>(null)
	const [walletConnected, setWalletConnected] = useState<boolean>(false)
	const { address } = useAccount({
		onConnect({ address, connector, isReconnected }) {
			setWalletConnected(true)
			readProjects()
		},
		onDisconnect() {
			setWalletConnected(false)
			console.log('Disconnected')
		}
	})
	const readProjects = async () => {
		console.log('read projects')
		try {
			if (address) {
				const projects = await getProjectsByOwnerAddress(address)
				console.log(projects)
				setProjects(projects)
			}
		} catch (error) {
			console.log(error)
			console.log('error reading projects')
		}
	}
  return (
    <SimpleGrid columns={[1, 2, 3]} spacing={5}>
      {cardArray.map((_, index) => <ProyectCard key={index} />)}
    </SimpleGrid>
  )
}

export default ProjectsSection
