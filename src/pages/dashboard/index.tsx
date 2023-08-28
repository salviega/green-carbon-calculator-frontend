import React, { useState } from 'react'
import {
  Box,
  Grid,
  GridItem,
  Button,
  Text,
  useColorModeValue,
  Spacer,
  HStack,
} from '@chakra-ui/react'
import OverviewPublic from '../../components/ProjectOverviewPublic'
import OverviewPrivate from '../../components/ProjectOverviewPrivate'
import EventList from '../../components/EventList'
import EventDetails from '../../components/EventDetails'
import EventTable from '../../components/EventTable'
import ResultsChart from '../../components/charts/ResultsChart'
import { EmissionDetails } from '../../models/emission-details.model'
import Head from 'next/head'

const metadata = {
	title: 'Footprint',
	description: 'Decentralized calculator'
}

const Dashboard = () => {
  const [results, setResults] = useState<EmissionDetails>(initValuesResults)
  const bg = useColorModeValue('red.500', 'red.200')
  return (
    <>
    <Head>
    <title>{metadata.title}</title>
    <meta name='description' content={metadata.description} />
    <meta name='viewport' content='width=device-width, initial-scale=1' />
    <link rel='icon' href='/favicon.ico' />
  </Head>
    <Grid
      h='1000px'
      templateRows='2fr 350px auto'
      templateColumns='repeat(6, 1fr)'
      gap={4}
      width="100%"
      margin="2rem auto"
    >
      <GridItem colSpan={4} borderRadius='lg' rowSpan={1} border="1px" borderColor="gray.200" p="4" bg="white">
        <OverviewPublic />
      </GridItem>
      <GridItem rowSpan={1} colSpan={2} borderRadius='lg' border="1px" borderColor="gray.200" p="4" bg="white">
        <Text fontWeight="semibold" pb="2"> CO2 Ammount</Text>
        <ResultsChart
          co2_amount={results.co2_amount}
          sections={results.sections}
        />
      </GridItem>
      <GridItem
        colSpan={3}
        borderRadius='lg'
        rowSpan={1}
        p="4"
        border="1px" borderColor="gray.200"
        bg="white"
      >
        <HStack pb="4">
          <Text fontWeight="semibold" pb="2" textColor="gray.700"> Event List</Text>
          <Spacer />
          <Button size="sm" textColor="gray.600">+ New event</Button>
        </HStack>

        <Box gap="8" overflowY="auto" maxH="90%">
          <EventList />
        </Box>
      </GridItem>

      <GridItem
        colSpan={3}
        rowSpan={1}
        borderRadius='lg' border="1px" borderColor="gray.200" p="4"
      >
        <Text fontWeight="semibold" pb="2"> Event details</Text>
        <EventDetails />
      </GridItem>
      <GridItem
        colSpan={6}
        borderRadius='lg'
        rowSpan={1}
        bg="white"
      >
        <EventTable />
      </GridItem>
    </Grid>
    </>
  )
}

const initValuesResults: EmissionDetails = {
  co2_amount: 0,
  sections: {
    Mobility: 10,
    Accommodation: 10,
    Catering: 10,
    Energy: 10,
    Materials: 10,
    Transport: 10,
    Waste: 25
  }
}

export default Dashboard
