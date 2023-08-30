import React, { useEffect, useRef, useState } from 'react'
import { Button, Text, Circle, VStack, HStack } from '@chakra-ui/react'
import { Event } from '@/models/project.model'
import { PiTree } from 'react-icons/pi'
export interface EventListProps {
	events: Event[]
	eventIndex?: number
	setEventIndex?: React.Dispatch<React.SetStateAction<number>>
}
export default function EventList({
	events,
	eventIndex,
	setEventIndex
}: EventListProps) {
	const setIndex = (index: number) => {
		if (setEventIndex) {
			setEventIndex(index)
			console.log(index)
		}
	}
	return (
		<>
			{events.map((event, index) => {
				return (
					<HStack
						overflow='hidden'
						justify='space-between'
						pb='4'
						key={event.event_id}
					>
						<HStack w='80%'>
							<Circle
								size='12'
								bg={event.isCertified ? 'brand.light' : 'gray.100'}
							>
								<PiTree size='24' />
							</Circle>
							<VStack gap='0' align='start'>
								<Text
									fontWeight='semibold'
									fontSize='md'
									textColor='gray.700'
									maxW='100%'
								>
									{' '}
									{event.name}
								</Text>
							</VStack>
						</HStack>
						{index !== eventIndex && (
							<Button
								variant='outline'
								size='sm'
								mr='1%'
								onClick={() => setIndex(index)}
							>
								View
							</Button>
						)}
					</HStack>
				)
			})}
		</>
	)
}
