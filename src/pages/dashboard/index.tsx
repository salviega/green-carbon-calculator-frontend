import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { firebaseApi } from '../../../services/firebaseApi'
import { getAccount } from '@wagmi/core'
import {
	Box,
	SimpleGrid,
	GridItem,
	Button,
	Text,
	useColorModeValue,
	Spacer,
	HStack,
	Flex,
	Spinner
} from '@chakra-ui/react'
import OverviewPublic from '../../components/ProjectOverviewPublic'
import OverviewPrivate from '../../components/ProjectOverviewPrivate'
import EventList from '../../components/EventList'
import EventDetails from '../../components/EventDetails'
import EventTable from '../../components/EventTable'
import ResultsChart from '../../components/charts/ResultsChart'
import { EmissionDetails } from '../../models/emission-details.model'
import Head from 'next/head'

import { Project, Event } from '@/models/project.model'

const metadata = {
	title: 'Footprint',
	description: 'Decentralized calculator'
}

const Dashboard = () => {
	const router = useRouter()
	const account = getAccount()
	const [results, setResults] = useState<EmissionDetails>(initValuesResults)
	const bg = useColorModeValue('red.500', 'red.200')
	const { getProjectById } = firebaseApi()
	const [projectInfo, setProjectInfo] = useState<Project | null>(null)
	const [eventOnDetail, setEventOnDetail] = useState<Event | null>(null)
	const [loading, setLoading] = useState<boolean>(true)
	const [owner, setOwner] = useState<boolean>(false)
	const [emissionSummary, setEmissionSummary] =
		useState<EmissionDetails | null>(null)
	useEffect(() => {
		console.log(router.query.id)
		if (router.query.id) readInfo(router.query.id as string)
	}, [router.query.id])
	const readInfo = async (id: string) => {
		try {
			const info: Project | null = await getProjectById(id)
			console.log(info)
			if (info) {
				setProjectInfo(info)
				setLoading(false)
				calculateTotalEmissions(info)
				setEventOnDetail(info.events[0])
        checkOwner(info);
			} else router.push('/')
		} catch (error) {
			console.log(error)
			router.push('/')
		}
	}
	const calculateTotalEmissions = (info: Project) => {
		const totales = info.events.reduce(
			(acc: EmissionDetails, obj: Event) => {
				acc.co2_amount += obj.emissionDetails.co2_amount

				for (let key in obj.emissionDetails.sections) {
					if ((acc.sections as any)[key] === undefined) {
						;(acc.sections as any)[key] = 0
					}
					;(acc.sections as any)[key] += (obj.emissionDetails.sections as any)[
						key
					]
				}

				return acc
			},
			{
				co2_amount: 0,
				sections: {
					Mobility: 0,
					Accommodation: 0,
					Catering: 0,
					Energy: 0,
					Materials: 0,
					Transport: 0,
					Waste: 0
				}
			}
		)

		console.log(totales)
		setEmissionSummary(totales)
	}
  const checkOwner = (info: Project) => {
    if(account?.address){
      if(account.address as string === info.ownerWallet){
        setOwner(true)
      } else {
        setOwner(false) 
      }
    }else {
      setOwner(false)
    }
  }
	return !loading ? (
		<>
			<Head>
				<title>{metadata.title}</title>
				<meta name='description' content={metadata.description} />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/Images/favicon.ico' sizes='any' />
			</Head>
			<SimpleGrid
				h='1000px'
				templateRows='2fr 350px auto'
				columns={[1, null, 6]}
				gap={4}
				width='100%'
				margin='2rem auto'
			>
				{projectInfo && (
					<GridItem
						colSpan={{ base: 6, md: 4 }}
						borderRadius='lg'
						rowSpan={1}
						border='1px'
						borderColor='gray.200'
						p='4'
						bg='white'
					>
						<OverviewPublic project={projectInfo} owner={owner}/>
						<OverviewPrivate project={projectInfo} />
					</GridItem>
				)}
				<GridItem
					rowSpan={1}
					colSpan={{ base: 6, md: 2 }}
					borderRadius='lg'
					border='1px'
					borderColor='gray.200'
					p='4'
					bg='white'
				>
					<Text fontWeight='semibold' pb='2'>
						{' '}
						CO2 Ammount
					</Text>
					{emissionSummary && (
						<ResultsChart
							co2_amount={emissionSummary.co2_amount}
							sections={emissionSummary.sections}
						/>
					)}
				</GridItem>
				<GridItem
					colSpan={{ base: 6, md: 3 }}
					borderRadius='lg'
					rowSpan={1}
					p='4'
					border='1px'
					borderColor='gray.200'
					bg='white'
				>
					<HStack pb='4'>
						<Text fontWeight='semibold' pb='2' textColor='gray.700'>
							{' '}
							Event List
						</Text>
						<Spacer />
						{owner && <Button size='sm' textColor='gray.600'>
							+ New event
						</Button>}
					</HStack>

					{projectInfo?.events && (
						<Box gap='8' overflowY='auto' maxH='90%'>
							<EventList events={projectInfo?.events} owner={owner}/>
						</Box>
					)}
				</GridItem>

				{eventOnDetail && (
					<GridItem
						colSpan={{ base: 6, md: 3 }}
						rowSpan={1}
						borderRadius='lg'
						border='1px'
						borderColor='gray.200'
						p='4'
					>
						<Text fontWeight='semibold' pb='2'>
							{' '}
							Event details
						</Text>
						<EventDetails event={eventOnDetail} owner={owner} />
					</GridItem>
				)}
				{projectInfo?.events && (
					<GridItem colSpan={6} borderRadius='lg' rowSpan={1} bg='white'>
						<EventTable events={projectInfo?.events} owner={owner}/>
					</GridItem>
				)}
			</SimpleGrid>
		</>
	) : (
		<Flex align='center' justify='center' direction='column' mt='4'>
			<Spinner color='blue.500' size='xl' mb='2' />
			<Text fontSize='lg'>Loading project data...</Text>
		</Flex>
	)
}

const initValuesResults: EmissionDetails = {
	co2_amount: 0,
	sections: {
		Mobility: 0,
		Accommodation: 0,
		Catering: 0,
		Energy: 0,
		Materials: 0,
		Transport: 0,
		Waste: 0
	}
}

export default Dashboard
