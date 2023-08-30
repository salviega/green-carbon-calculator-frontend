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
  Spinner,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	ModalFooter
} from '@chakra-ui/react'
import OverviewPublic from '../../components/ProjectOverviewPublic'
import OverviewPrivate from '../../components/ProjectOverviewPrivate'
import EventList from '../../components/EventList'
import EventDetails from '../../components/EventDetails'
import EventTable from '../../components/EventTable'
import ResultsChart from '../../components/charts/ResultsChart'
import { EmissionDetails } from '../../models/emission-details.model'
import Head from 'next/head'
import FootprintContractJson from '../../assets/contracts/Footprint.json'
import { Project, Event } from '@/models/project.model'
import { BigNumber, Contract, ethers } from 'ethers'
import ProjectCertificate from '@/components/ProjectCertificate'
import Calculator from '../calculator'
import { EventDetails as EventDetailsModel } from '@/models/event-details.model'
import { nanoid } from 'nanoid'
const metadata = {
  title: 'Footprint',
  description: 'Decentralized calculator'
}

const Dashboard = () => {
	const router = useRouter()
	const account = getAccount()
	const [results, setResults] = useState<EmissionDetails>(initValuesResults)
	const bg = useColorModeValue('red.500', 'red.200')
	const { getProjectById, updateProject } = firebaseApi()
	const [projectInfo, setProjectInfo] = useState<Project | null>(null)
	const [eventOnDetail, setEventOnDetail] = useState<Event | null>(null)
	const [loading, setLoading] = useState<boolean>(true)
	const [owner, setOwner] = useState<boolean>(false)
	const [createEvent, setCreateEvent] = useState(true)
	const [emissionSummary, setEmissionSummary] =
		useState<EmissionDetails | null>(null)
	useEffect(() => {
		console.log(router.query.id)
		if (router.query.id) readInfo(router.query.id as string)
	}, [router.query.id])
	const readInfo = async (id: string) => {
		try {
			readCertificates()
			const info: Project | null = await getProjectById(id)
			console.log(info)
			if (info) {
				setProjectInfo(info)
				setLoading(false)
				calculateTotalEmissions(info)
				setEventOnDetail(info.events[0])
				checkOwner(info)
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
            ; (acc.sections as any)[key] = 0
          }
          ; (acc.sections as any)[key] += (obj.emissionDetails.sections as any)[
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
    if (account?.address) {
      if ((account.address as string) === info.ownerWallet) {
        setOwner(true)
      } else {
        setOwner(false)
      }
    } else {
      setOwner(false)
    }
  }
	const readCertificates = async () => {
		try {
			const provider = new ethers.providers.Web3Provider((window as any).ethereum); // Usa el proveedor de Metamask
			const contract = new ethers.Contract(FootprintContractJson.address, FootprintContractJson.abi, provider);
			const balance = await contract.balanceOf(account.address);
			console.log('balance is ', balance);
			console.log(BigNumber.from(balance._hex).toString());
			const balances = await contract.balances(account.address);
			console.log('balances are ', balances);
			console.log(BigNumber.from(balances._hex).toString());

		} catch (error) {
			console.log(error);
		}
	}
	const onCreateEvent = async (event: EventDetailsModel, results: EmissionDetails) => {
		console.log('starting new event')
		console.log(event);
		console.log(results);
		console.log(projectInfo);
		
		const newEvent : Event = {
			event_id: nanoid(),
			isCertified: false,
			name: event.event_name,
			description: event.event_description,
			details: event,
			emissionDetails: results,
		}
		projectInfo?.events.push(newEvent);
		console.log(projectInfo);
		const update = await updateProject(projectInfo)
		console.log('event updated')
	}
	const ModalCreateEvent = () => {
		return (
			<>
				<Modal isCentered isOpen={createEvent} onClose={() => setCreateEvent(false)} size={'6xl'}>
					<ModalOverlay
						bg='blackAlpha.300'
						backdropFilter='blur(10px) hue-rotate(90deg)'
					/>
					<ModalContent>
						<ModalHeader>Create & Calculate New Event</ModalHeader>
						<ModalCloseButton />
						<ModalBody>
							<Calculator isInternal={true} onCreateEvent={onCreateEvent}/>
						</ModalBody>
					</ModalContent>
				</Modal>
			</>
		)
	}
  return !loading ? (
    <>
    <Flex>
      <Head>
        <title>{metadata.title}</title>
        <meta name='description' content={metadata.description} />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/Images/favicon.ico' sizes='any' />
      </Head>

      <SimpleGrid
        h='1000px'
        templateRows='auto 1fr auto'
        columns={[1, null, 6]}
        gap={6}
        width='100%'
        margin='2rem auto'
        mb='36'
      >
        {projectInfo && (
          <GridItem
            colSpan={{ base: 6, md: 4 }}
            borderRadius='lg'
            rowSpan={1}
            border='1px'
            borderColor='gray.200'
            p='8'
            bg='white'
          >
            <OverviewPublic project={projectInfo} owner={owner} />
            <OverviewPrivate project={projectInfo} />

          </GridItem>
        )}
        <GridItem
          rowSpan={1}
          colSpan={{ base: 6, md: 2 }}
          borderRadius='lg'
          border='1px'
          borderColor='gray.200'
          p='8'
          bg='white'
        >
          <Text fontWeight='semibold' pb='2'>
            {' '}
            CO2 Ammount
          </Text>
          {emissionSummary && (
            <>
              <Flex flexDir='column' height='90%' justify='space-around'>
                <ResultsChart
                  co2_amount={emissionSummary.co2_amount}
                  sections={emissionSummary.sections}
                />
                {projectInfo && (
                  <ProjectCertificate project={projectInfo} />
                )}
              </Flex>
            </>
          )}
        </GridItem>
        <GridItem
          colSpan={{ base: 6, md: 3 }}
          borderRadius='lg'
          rowSpan={1}
          p='8'
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
            {owner && (
              <Button size='sm' textColor='gray.600' onClick={() => setCreateEvent(true)}>
                + New event
              </Button>
            )}
          </HStack>

          {projectInfo?.events && (
            <Box gap='8' overflowY='auto' maxH='90%'>
              <EventList events={projectInfo?.events} owner={owner} />
            </Box>
          )}
        </GridItem>

        {eventOnDetail && projectInfo && (
          <GridItem
            colSpan={{ base: 6, md: 3 }}
            rowSpan={1}
            borderRadius='lg'
            border='1px'
            borderColor='gray.200'
            p='8'
            bg="white"
          >
            <Text fontWeight='semibold' pb='2'>
              {' '}
              Event details
            </Text>
            <EventDetails
              event={eventOnDetail}
              owner={owner}
              projectInfo={projectInfo}
            />
          </GridItem>
        )}
        {projectInfo?.events && (
          <GridItem colSpan={6} borderRadius='lg' rowSpan={1} bg='white'>
            <EventTable events={projectInfo?.events} owner={owner} />
          </GridItem>
        )}
      </SimpleGrid>
      </Flex>
			{createEvent && <ModalCreateEvent/>}
    </>
  ) : (
    <Flex align='center' justify='center' direction='column' mt='4'>
      <Spinner color='brand.dark' size='xl' mb='2' />
      <Text fontSize='lg' textColor="gray.500" fontWeight='medium'>Loading project data...</Text>
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
