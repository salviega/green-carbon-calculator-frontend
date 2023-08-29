import React from 'react'
import {
	Stack,
	Flex,
	Button,
	Text,
	Spacer,
	useBreakpointValue,
	Progress,
	Avatar,
	HStack
} from '@chakra-ui/react'
import { Project } from '@/models/project.model'
export interface ProjectProps {
	project: Project
	owner?: boolean
}
export default function OverviewPublic({ project, owner }: ProjectProps) {
  const sliderValue = project.raisedTotal === 0 ? 0 : ((project.raisedTotal)/(project.totalToraise))*100;
  
	return (
		<>
			<Text fontWeight='semibold' pb='2'>
				Project Overview
			</Text>
			<Flex
				h={'250px'}
				backgroundImage={`url(${project.banner})`}
				backgroundSize={'cover'}
				borderRadius='lg'
				pos='relative'
			>
				<HStack pos='absolute' bottom='2' left='2'>
					<Avatar name={project.name[0]} src={`url(${project.logo})`} size='lg' />
					<Text textColor='white' fontWeight='bold' fontSize='2xl'>
						{project.name}
					</Text>
				</HStack>
			</Flex>
			<HStack w={'full'} align='start' pt='2'>
				<Stack align='start' w='full'>
					<Text
						fontWeight={700}
						lineHeight={1.2}
						fontSize={useBreakpointValue({ base: 'xl', md: '2xl' })}
					>
						{`$ ${project.raisedTotal}`}
					</Text>
					<Text textColor='gray.500'>
						Raised from <strong>{project.totalContributors}</strong> contributors
					</Text>
					<Progress size='md' value={sliderValue} w='80%' borderRadius='lg' />
				</Stack>
				<Stack direction={'column'} w='1/2' alignItems='flex-end'>
					<Spacer />
					<Spacer />
					<Spacer />
					<Spacer />
					{!owner && 
					<Button w='200px' variant='darkie'>
						Donate
					</Button>}
				</Stack>
			</HStack>
		</>
	)
}
