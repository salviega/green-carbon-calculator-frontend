import React, { useEffect, useRef, useState } from 'react'
import { Button, Text, Circle, VStack, HStack } from '@chakra-ui/react'
import { Event } from '@/models/project.model'
import {PiTree} from 'react-icons/pi'
export interface EventListProps {
	events: Event[]
	owner: boolean
}
export default function EventList({ events, owner }: EventListProps) {
	return (
		<>
			{events.map((event) => {
				return (
					<HStack overflow='hidden' justify='space-between' pb='4' key={event.event_id}>
						<HStack  w='80%'>
							<Circle size='12' bg={event.isCertified? 'brand.light' : 'gray.100'}>
              <PiTree  size='24'/>
              </Circle>
							<VStack gap='0' align='start'>

								<Text fontWeight='semibold' fontSize='md' textColor='gray.700' maxW="100%">
									{' '}
									{event.name}
								</Text>
							</VStack>
						</HStack>
						<Button variant='outline' size='sm'>
							View
						</Button>
            {owner&& <Button variant='solid' size='sm' colorScheme='red'>
							Delete
						</Button>}
					</HStack>
				)
			})}
		</>
	)
}
