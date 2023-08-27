import React, {useState} from 'react'
import {
  Box,
  Grid,
  GridItem,
  Button,
  Text,
  useColorModeValue,
  Spacer,
  HStack
} from '@chakra-ui/react'
import OverviewPublic from '../../components/ProjectOverviewPublic'
import OverviewPrivate from '../../components/ProjectOverviewPrivate'
import EventDetails from '../../components/EventDetails'
import EventTable from '../../components/EventTable'
import ResultsChart from '../../components/charts/ResultsChart'
import { EmissionDetails } from '../../models/emission-details.model'


const Dashboard = () => {
  const [results, setResults] = useState<EmissionDetails>(initValuesResults)
  const bg = useColorModeValue('red.500', 'red.200')
  return (
    <Grid
      h='1000px'
      templateRows='repeat(3, 1fr)'
      templateColumns='repeat(6, 1fr)'
      gap={4}
      maxWidth={{ base: '80%', lg: '65%' }}
      margin="2rem auto"
    >
      <GridItem colSpan={4} borderRadius='lg' rowSpan={1} border="1px" borderColor="gray.200" p="4">
        <OverviewPrivate />
      </GridItem>
      <GridItem rowSpan={1} colSpan={2} borderRadius='lg' border="1px" borderColor="gray.200" p="4">
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
      >
        <HStack pb="4">
          <Text fontWeight="semibold" pb="2" textColor="gray.700"> Event List</Text>
          <Spacer />
          <Button size="sm" textColor="gray.600">+ New event</Button>
        </HStack>

        <Box gap="8" overflowY="auto" maxH="180px">
          <EventDetails />
        </Box>
      </GridItem>

      <GridItem
        colSpan={3}
        borderRadius='lg'
        bg='gray.600'
        rowSpan={1}
      >
        Event Details
      </GridItem>
      <GridItem
        colSpan={6}
        borderRadius='lg'
        rowSpan={1}
      >
        <EventTable />
      </GridItem>
    </Grid>
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
		Waste: 30
	}
}

export default Dashboard
