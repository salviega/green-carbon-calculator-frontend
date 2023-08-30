import React, { useEffect, useRef, useState } from 'react'
import { Contract, ethers } from 'ethers'
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
import { Event, Project } from '@/models/project.model'
import { CertificateDetails } from '@/models/certificate-details.model'
import { getAccount } from '@wagmi/core'
import FootprintContractJson from '../assets/contracts/Footprint.json'
import { Footprint } from '../../@types/typechain-types/Footprint'
interface EventDetailProps {
	event: Event
	owner: boolean
	projectInfo: Project
}
export default function EventDetails({
	event,
	owner,
	projectInfo
}: EventDetailProps) {
	const account = getAccount()
	const toast = useToast()
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
			console.log(projectInfo)

			console.log(projectInfo?.ownerWallet)
			console.log(account.address)

			const url = '/api/co2storage'
			const certificate: CertificateDetails = {
				owner: projectInfo?.ownerWallet ?? (account.address as string), // wallet
				image: '', //TODO include ipfs image
				project_id: projectInfo.project_id,
				project_name: projectInfo.name,
				project_description: projectInfo.description,
				event_id: event.event_id, // consecutivo
				event_name: event.name,
				event_description: event.description,
				event_duration: event.details?.event_duration ?? 0,
				event_co2: event.emissionDetails,
				country: event.details?.country ?? 'country',
				participants: event.details?.participants ?? 0,
				employees: event.details?.employees ?? 0,
				heated_area: event.details?.heated_area ?? 0,
				air_conditioned_area: event.details?.air_conditioned_area ?? 0,
				number_of_people_arriving_by_car:
					event.details?.number_of_people_arriving_by_car ?? 0,
				average_distance_traveled_by_car:
					event.details?.average_distance_traveled_by_car ?? '0',
				number_of_people_traveling_by_public_transport:
					event.details?.number_of_people_traveling_by_public_transport ?? 0,
				short_haul_flights: event.details?.short_haul_flights ?? 0,
				medium_haul_flights: event.details?.medium_haul_flights ?? 0,
				long_haul_flights: event.details?.long_haul_flights ?? 0,
				percentage_business_class:
					event.details?.percentage_business_class ?? '0',
				over_night_stay_three_stars:
					event.details?.over_night_stay_three_stars ?? '0',
				over_night_stay_four_stars:
					event.details?.over_night_stay_four_stars ?? '0',
				over_night_stay_five_stars:
					event.details?.over_night_stay_five_stars ?? '0',
				meal_meat_amount: event.details?.meal_meat_amount ?? '0',
				meal_vegetarian_amount: event.details?.meal_vegetarian_amount ?? '0',
				snacks_amount: event.details?.snacks_amount ?? '0',
				soda_liters: event.details?.soda_liters ?? '0',
				coffee_cups: event.details?.coffee_cups ?? '0',
				tea_cups: event.details?.tea_cups ?? '0',
				wine_liters: event.details?.wine_liters ?? '0',
				beer_liters: event.details?.beer_liters ?? '0',
				spirits_liters: event.details?.spirits_liters ?? '0',
				power_consumption: event.details?.power_consumption ?? '0',
				printed_matter: event.details?.printed_matter ?? '0',
				plastics: event.details?.plastics ?? '0',
				recyclable_material: event.details?.recyclable_material ?? '0',
				plant_based_materials: event.details?.plant_based_materials ?? '0',
				event_stand_area: event.details?.event_stand_area ?? '0',
				transported_weight: event.details?.transported_weight ?? '0',
				transported_distance: event.details?.transported_distance ?? '0',
				garbage: event.details?.garbage ?? '0',
				recycling: event.details?.recycling ?? '0'
			}
			const body = {
				type: 'createAsset',
				event: certificate
			}
			try {
				const response = await fetch(url, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(body)
				})

				const data = await response.json()

				if (response.ok) {
					console.log('Asset created:', data)
					const CO2Total = certificate.event_co2.co2_amount
					const IPFSURL = `https://ipfs.io/ipfs/${data.result.assetBlock.cid}`

					const ethereum = (window as any).ethereum

					const web3Provider: ethers.providers.Web3Provider =
						new ethers.providers.Web3Provider(ethereum)
					await web3Provider.send('eth_requestAccounts', [])
					const web3Signer: ethers.providers.JsonRpcSigner =
						web3Provider.getSigner()

					const contract = new Contract(
						FootprintContractJson.address,
						FootprintContractJson.abi,
						web3Signer
					) as Footprint
					const mintNetZeroCertificateTX =
						await contract.mintNetZeroCertificate(CO2Total, IPFSURL) // Debe pasar CO2Total a la 18
					console.log(mintNetZeroCertificateTX)
					setLoading(false)
					//await mintTx.wait(1)
					//mandar el total de co2 =>> certificate.event_co2.co2_amount, IPFSURL
				} else {
					console.error('Error al crear template:', data.message)
					throw new Error(data.message)
				}
			} catch (error) {
				console.error('Error en la petición:', error)
			}
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
					{owner && !event.isCertified && (
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
