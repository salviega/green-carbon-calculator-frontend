import React from 'react'
import {
	Flex,
	Avatar,
	VStack,
	Card,
	CardHeader,
	HStack,
	Stack,
	CardBody,
	CardFooter,
	Text,
	Link
} from '@chakra-ui/react'
import { Project } from '@/models/project.model'
interface ProjectCardInput {
	project: Project
}
const ProyectCard = ({ project }: ProjectCardInput) => {
	return (
		<Link
			href={`dashboard?id=${project.project_id}`}
			isExternal
			target='_blank'
			rel='noopener noreferrer'
		>
			<Card maxW='sm' borderRadius='3xl'>
				<CardHeader>
					<Flex
						h={'250px'}
						backgroundImage={`url(${project.banner})`}
						backgroundSize={'cover'}
						borderRadius='lg'
						pos='relative'
					>
						<HStack pos='absolute' bottom='2' left='2'>
							<Avatar name='T P' src={`${project.logo}`} size='lg' />
						</HStack>
					</Flex>
				</CardHeader>
				<CardBody>
					<Stack align='start' w='full'>
						<Text fontWeight={700} lineHeight={1.2} fontSize='xl'>
							{project.name}{' '}
						</Text>
						<Text textColor='gray.500'>{project.description}</Text>
					</Stack>
				</CardBody>
				<CardFooter justify='left' flexWrap='wrap'>
					<Flex justifyContent='space-between' width='100%'>
						<VStack gap='1'>
							<Text fontSize='xs' textColor='gray.400' fontWeight='semibold'>
								Total Raised
							</Text>
							<Text fontSize='xl' textColor='gray.700' fontWeight='bold'>
								{`$ ${project.raisedTotal}`}
							</Text>
						</VStack>
						<VStack gap='1'>
							<Text fontSize='xs' textColor='gray.400' fontWeight='semibold'>
								Goals
							</Text>
							<Text fontSize='xl' textColor='gray.700' fontWeight='bold'>
								{`$ ${project.totalToraise}`}
							</Text>
						</VStack>
						<VStack gap='1'>
							<Text fontSize='xs' textColor='gray.400' fontWeight='semibold'>
								Left
							</Text>
							<Text fontSize='xl' textColor='gray.700' fontWeight='bold'>
								{`$ ${project.totalToraise - project.raisedTotal}`}
							</Text>
						</VStack>
					</Flex>
				</CardFooter>
			</Card>
		</Link>
	)
}

export default ProyectCard
