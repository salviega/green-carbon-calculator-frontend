import React, { useEffect, useState } from 'react'
import { Flex, SimpleGrid, Spinner, Text } from '@chakra-ui/react'
import ProyectCard from './ProyectCard'
import { Project } from '@/models/project.model'
import { useAccount } from 'wagmi'
import { firebaseApi } from '../../services/firebaseApi'
export enum SectionType {
	'MY_PROJECTS',
	'GENERAL'
}
interface ProjectsSectionProps {
	type: SectionType
}
const ProjectsSection = (props: ProjectsSectionProps) => {
	const { getProjectsByOwnerAddress, getAllProjects } = firebaseApi()
	const cardArray = Array.from({ length: 3 }, (_, index) => index)
	const [projects, setProjects] = useState<Project[] | null>(null)
	const [loading, setLoading] = useState(true)
	const { address } = useAccount()
	useEffect(() => {
		readProjects()
	}, [props.type])

	const readProjects = async () => {
		console.log('read projects')
		try {
			switch (props.type) {
				case SectionType.MY_PROJECTS:
					if (address) {
						const projects = await getProjectsByOwnerAddress(address)
						console.log(projects)
						setProjects(projects)
						setLoading(false)
					}
					break
				case SectionType.GENERAL:
					const projects = await getAllProjects()
					console.log(projects)
					setProjects(projects)
					setLoading(false)
					break
				default:
					break
			}
		} catch (error) {
			console.log(error)
			console.log('error reading projects')
		}
	}
	if (loading) {
		return (
			<Flex align='center' justify='center' direction='column' mt='4'>
				<Spinner color='brand.dark' size='xl' mb='2' />
				<Text fontSize='lg' textColor='gray.500' fontWeight='medium'>
					Loading Projects...
				</Text>
			</Flex>
		)
	}
	return (
		<SimpleGrid columns={[1, 2, 3]} spacing={5}>
			{projects &&
				projects.map((project: Project) => {
					return <ProyectCard key={project.project_id} project={project} />
				})}
		</SimpleGrid>
	)
}

export default ProjectsSection
