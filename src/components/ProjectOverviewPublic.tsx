import React from 'react'
import {
	Box,
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
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Project } from '@/models/project.model'
export interface ProjectProps {
	project: Project
	owner?: boolean
}

import FootprintContractJson from '../assets/contracts/Footprint.json'
import Link from 'next/link'

export default function OverviewPublic({ project, owner }: ProjectProps) {
	const sliderValue =
		project.raisedTotal === 0
			? 0
			: (project.raisedTotal / project.totalToraise) * 100

	return (
		<>
			<Box
				display={'flex'}
				alignItems={'center'}
				justifyContent={'space-between'}
			>
				<Text fontWeight='semibold' pb='2'>
					Project Overview
				</Text>
				<Box
					display={'flex'}
					alignItems={'center'}
					justifyContent={'space-between'}
					gap={1}
				>
					<Text fontWeight='semibold' pb='2'>
						Footprint address:
					</Text>

					<Text
						pb='1'
						fontSize={'xs'}
						_hover={{ textDecoration: 'none', color: 'green' }}
					>
						<Link
							href={`https://mumbai.polygonscan.com/address/${FootprintContractJson.address}`}
							target='blank'
							rel='noopener noreferrer'
						>
							{FootprintContractJson.address}
						</Link>
					</Text>
				</Box>
			</Box>
			<Flex
				h={'250px'}
				backgroundImage={`url(${project.banner})`}
				backgroundSize={'cover'}
				borderRadius='lg'
				pos='relative'
			>
				<HStack pos='absolute' bottom='2' left='2'>
					<Avatar name={project.name[0]} src={`${project.logo}`} size='lg' />
					<Text textColor='white' fontWeight='bold' fontSize='2xl'>
						{project.name}
					</Text>
				</HStack>
			</Flex>
			<Flex
				flexDirection={{ base: 'column', md: 'row' }}
				w={'full'}
				align='start'
				pt='2'
			>
				<Stack align='start' w='full'>
					<Text
						fontWeight={700}
						lineHeight={1.2}
						fontSize={useBreakpointValue({ base: 'xl', md: '2xl' })}
					>
						{`$ ${project.raisedTotal}`}
					</Text>
					<Text textColor='gray.500'>
						Raised from <strong>{project.totalContributors}</strong>{' '}
						contributors
					</Text>
					<Progress
						size='md'
						value={sliderValue}
						w={{ base: '100%', md: '80%' }}
						borderRadius='lg'
					/>
				</Stack>
				<Stack direction={'column'} w='1/2' alignItems='flex-end'>
					<Spacer />
					<Spacer />
					<Spacer />
					<Spacer />
					<Spacer />
					{!owner && (
						<Button w='200px' variant='darkie'>
							Donate
						</Button>
					)}
				</Stack>
			</Flex>
		</>
	)
}
