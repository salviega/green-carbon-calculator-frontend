import React, { useEffect, useRef, useState } from 'react'
import { Button, Text, VStack, HStack } from '@chakra-ui/react'
import ResultsChart from './charts/ResultsChart'
import { EmissionDetails } from '../models/emission-details.model'
import { Event } from '@/models/project.model'
interface EventDetailProps {
	event: Event
}
export default function EventDetails({ event }: EventDetailProps) {
	const [results, setResults] = useState<EmissionDetails>(initValuesResults)
	return (
		<>
			<HStack align='start'>
				<VStack align='start' width='60%'>
					<Text fontWeight='semibold' pb='2'>
						{' '}
						{event.name}
					</Text>
					<Text>
						{' '}
						{event.description}
					</Text>
					<Button variant='outline' size='sm'>
						Certificate
					</Button>
				</VStack>
				<VStack width='40%'>
					<ResultsChart
						co2_amount={event.emissionDetails.co2_amount}
						sections={event.emissionDetails.sections}
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
