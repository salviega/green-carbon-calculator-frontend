import React, { useEffect, useRef, useState } from 'react'
import { Button, Text, Circle, VStack, HStack } from '@chakra-ui/react'
import { Event } from '@/models/project.model'
interface EventListProps {
	events: Event[]
}
export default function EventList({ events }: EventListProps) {
	return (
		<>
			{events.map((event) => {
				return (
					<HStack overflow='hidden' justify='space-between' pb='4' key={event.event_id}>
						<HStack  w='80%'>
							<Circle size='36px' bg={event.isCertified? 'green.200' : 'gray.200'} />
							<VStack gap='0' align='start'>
								
								<Text fontWeight='semibold' fontSize='md' textColor='gray.700' maxW="100%">
									{' '}
									{event.name}
								</Text>
							</VStack>
						</HStack>
						<Button variant='solid' colorScheme='teal' size='sm'>
							View
						</Button>
            <Button variant='solid' size='sm' colorScheme='orange'>
							Delete
						</Button>
					</HStack>
				)
			})}
		</>
	)
}
