import React, { useEffect, useRef, useState } from 'react'
import {
  Button,
  Text,
  VStack,
  HStack
} from '@chakra-ui/react'
import ResultsChart from './charts/ResultsChart'
import { EmissionDetails } from '../models/emission-details.model'


export default function EventDetails() {
  const [results, setResults] = useState<EmissionDetails>(initValuesResults)


  return (
    <>
           <HStack align="start">
        <VStack align="start" width="60%">
        <Text fontWeight="semibold" pb="2"> Amazon Windshields, Bolivia</Text>
        <Text> Forest suppression and fragmentation cause the loss of many ecosystem services, such as water supply.</Text>
        <Button variant="outline" size="sm">Certificate</Button>
        </VStack>
        <VStack width="40%">
        <ResultsChart
					co2_amount={results.co2_amount}
					sections={results.sections}
				/>
        </VStack>
      </HStack>
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
