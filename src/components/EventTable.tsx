import React from 'react'
import {
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	TableContainer
} from '@chakra-ui/react'
import { EventListProps } from './EventList'

export default function EventTable({ events }: EventListProps) {
	function trimString(str: string) {
		if (str.length <= 8) return str 

		const firstThree = str.substr(0, 3) 
		const lastFive = str.substr(-5) 

		return `${firstThree}...${lastFive}`
	}
	return (
		<>
			<TableContainer
				border='1px'
				borderColor='gray.200'
				p='4'
				borderRadius='lg'
				overflowY='auto'
			>
				<Table variant='simple' size='md'>
					<Thead>
						<Tr>
							<Th>ID</Th>
							<Th>Name</Th>
							<Th isNumeric> Total CO2</Th>
							<Th isNumeric>Mobility</Th>
							<Th isNumeric>Accomodation</Th>
							<Th isNumeric>Catering</Th>
							<Th isNumeric>Energy</Th>
							<Th isNumeric>Materials</Th>
							<Th isNumeric>Transport</Th>
							<Th isNumeric>Waste</Th>
						</Tr>
					</Thead>
					<Tbody>
						{events.map(event => {
							return (
								<Tr>
									<Td>{trimString(event.event_id)}</Td>
									<Td>{event.name}</Td>
									<Td isNumeric>{event.emissionDetails.sections.Mobility}</Td>
									<Td isNumeric>{event.emissionDetails.sections.Accommodation}</Td>
									<Td isNumeric>{event.emissionDetails.sections.Catering}</Td>
									<Td isNumeric>{event.emissionDetails.sections.Energy}</Td>
									<Td isNumeric>{event.emissionDetails.sections.Materials}</Td>
									<Td isNumeric>{event.emissionDetails.sections.Transport}</Td>
									<Td isNumeric>{event.emissionDetails.sections.Waste}</Td>
									<Td isNumeric>{event.emissionDetails.sections.Waste}</Td>
								</Tr>
							)
						})}
					</Tbody>
				</Table>
			</TableContainer>
		</>
	)
}
