import React, { useEffect, useRef, useState } from 'react'
import {
	Button,
	Text,
	VStack,
	HStack,
	useDisclosure,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	ModalFooter,
	Flex,
	Spinner,
	useToast
} from '@chakra-ui/react'
import ResultsChart from './charts/ResultsChart'
import { EmissionDetails } from '../models/emission-details.model'
import { Event } from '@/models/project.model'
interface EventDetailProps {
	event: Event
	owner: boolean
}
export default function EventDetails({ event, owner }: EventDetailProps) {
	const toast = useToast()
	const [results, setResults] = useState<EmissionDetails>(initValuesResults)
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [loading, setLoading] = useState<boolean>(false)
	const [titlePurchase, setTitlePurchase] = useState<string>(
		'Preparing Certificate'
	)
	const [bodyPurchase, setBodyPurchase] = useState<string>(
		'Preparing certificate metadata.. please wait.'
	)
	const onClose = () => {
		setIsOpen(false)
	}

	const onStartPurchase = async () => {
		try {
			setLoading(true)
		} catch (error) {
			toast({
				title: 'Error Purchasing Certificate.',
				description: 'Pleaase try again.',
				status: 'warning',
				duration: 5000,
				isClosable: false
			})
			console.log(error)
			setLoading(false)
		}
	}

	const ModalPurchase = () => {
		return (
			<>
				<Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
					<ModalOverlay />
					<ModalContent>
						{!loading ? (
							<>
								<ModalHeader>Purchase Certificate</ModalHeader>
								<ModalCloseButton />
								<ResultsChart
									co2_amount={event.emissionDetails.co2_amount}
									sections={event.emissionDetails.sections}
								/>
								<ModalBody pb={6}>
									<Text>{`Total Consumption : ${event.emissionDetails.co2_amount}`}</Text>
									<Text>{`Total Cost : $${
										event.emissionDetails.co2_amount * 10
									}`}</Text>
								</ModalBody>
							</>
						) : (
							<>
								<ModalHeader>{titlePurchase}</ModalHeader>
								<ModalBody pb={6}>
									<Flex
										align='center'
										justify='center'
										direction='column'
										mt='4'
									>
										<Spinner color='blue.500' size='xl' mb='2' />
										<Text fontSize='lg' textAlign={'center'}>
											{bodyPurchase}
										</Text>
									</Flex>
								</ModalBody>
							</>
						)}

						{!loading && (
							<ModalFooter>
								<Button
									colorScheme='blue'
									mr={3}
									disabled={loading}
									onClick={onStartPurchase}
								>
									Purchase
								</Button>
								<Button onClick={onClose} disabled={loading}>
									Cancel
								</Button>
							</ModalFooter>
						)}
					</ModalContent>
				</Modal>
			</>
		)
	}
	return (
		<>
			<HStack align='start'>
				<VStack align='start' width='60%'>
					<Text fontWeight='semibold' pb='2'>
						{' '}
						{event.name}
					</Text>
					<Text> {event.description}</Text>
					{event.isCertified && (
						<Button variant='outline' size='sm'>
							Show Certificate
						</Button>
					)}
					{(owner && !event.isCertified) && (
						<Button
							variant='solid'
							size='sm'
							bg={'brand.light'}
							onClick={() => setIsOpen(true)}
						>
							Purchase Certificate
						</Button>
					)}
				</VStack>
				<VStack width='40%'>
					<ResultsChart
						co2_amount={event.emissionDetails.co2_amount}
						sections={event.emissionDetails.sections}
					/>
				</VStack>
			</HStack>
			{isOpen && <ModalPurchase />}
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
