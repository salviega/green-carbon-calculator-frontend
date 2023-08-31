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
	Button
} from '@chakra-ui/react'
import Link from 'next/link'
import { Project } from '@/models/project.model'
interface ProjectCardInput {
	project: Project
}
const ProyectCard = ({ project }: ProjectCardInput) => {
	return (
		<Card maxW='sm' borderRadius='3xl'>
			<Link
				href={`dashboard?id=${project.project_id}`}
				target='_blank'
				rel='noopener noreferrer'
			>
				<CardHeader>
					<Flex
						h={'250px'}
						backgroundImage={`url(${project.banner})`}
						backgroundSize={'cover'}
						borderRadius='2xl'
						pos='relative'
					>
						<HStack pos='absolute' bottom='-7' right='4'>
							<Avatar name='T P' src={`${project.logo}`} size='lg' />
						</HStack>
					</Flex>
				</CardHeader>
				<CardBody minH='24' py={0}>
					<Stack align='start' w='full'>
						<Text fontWeight={700} lineHeight={1.2} fontSize='xl'>
							{project.name}{' '}
						</Text>
						<Text textColor='gray.500' noOfLines={2}>
							{project.description}
						</Text>
					</Stack>
				</CardBody>
				<CardFooter justify='left' flexWrap='wrap' pt={1}>
					<Flex justifyContent='space-between' width='100%'>
						<VStack gap='1'>
							<Text fontSize='xs' textColor='gray.400' fontWeight='semibold'>
								Total Raised
							</Text>
							<Text fontSize='xl' textColor='gray.700' fontWeight='bold'>
								{`$ ${project.raisedTotal.toFixed(2)}`}
							</Text>
						</VStack>
						<VStack gap='1'>
							<Text fontSize='xs' textColor='gray.400' fontWeight='semibold'>
								Goals
							</Text>
							<Text fontSize='xl' textColor='gray.700' fontWeight='bold'>
								{`$ ${project.totalToraise.toFixed(2)}`}
							</Text>
						</VStack>
						<VStack gap='1'>
							<Text fontSize='xs' textColor='gray.400' fontWeight='semibold'>
								Left
							</Text>
							<Text fontSize='xl' textColor='gray.700' fontWeight='bold'>
								{`$ ${(
									Number(project.totalToraise) - Number(project.raisedTotal)
								).toFixed(2)}`}
							</Text>
						</VStack>
					</Flex>
				</CardFooter>
			</Link>
		</Card>
	)
}

export default ProyectCard
