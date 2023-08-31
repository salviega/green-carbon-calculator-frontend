import React, { useEffect,  useState } from 'react'
import { Contract, ethers } from 'ethers'
import {
	Button,
	Text,
	VStack,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	ModalFooter,
	Flex,
	Link,
	Image,
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
import { firebaseApi } from '../../services/firebaseApi'
interface EventDetailProps {
	event: Event
	owner: boolean
	projectInfo: Project
	refetch: () => void;
}
export default function EventDetails({
	event,
	owner,
	projectInfo, 
	refetch
}: EventDetailProps) {
	const { updateProject } = firebaseApi()
	const account = getAccount()
	const toast = useToast()
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [finished, setFinished] = useState<boolean>(false)
	const [certificate, setCertificate] = useState<boolean>(false)
	const [loading, setLoading] = useState<boolean>(false)
	const [purchase, setPurchase] = useState<boolean>(false)
	const [purchased, setPurchased] = useState<boolean>(false)
	const [metadata, setMetadata] = useState<any | null>(null)
	const [certificateInfo, setCertificateInfo] =
		useState<CertificateDetails | null>(null)
	const [titlePurchase, setTitlePurchase] = useState<string>(
		'Preparing Certificate'
	)
	const [bodyPurchase, setBodyPurchase] = useState<string>(
		'Preparing certificate metadata.. please wait.'
	)
	const onClose = () => {
		setIsOpen(false)
	}
	useEffect(() => {
		console.log('new event is ', event)
	}, [event])

	const onStartPurchase = async () => {
		try {
			setIsOpen(false)
			setLoading(true)
			setTitlePurchase('Creating Metadata ...')
			console.log(projectInfo?.ownerWallet)
			console.log(account.address)

			const url = '/api/co2storage'
			const certificate: CertificateDetails = {
				owner: projectInfo?.ownerWallet ?? (account.address as string), // wallet
				image:
					'https://emerald-personal-constrictor-170.mypinata.cloud/ipfs/QmPa51x8AwFYRi6NhqkcQKQdEmMzFUnU5vuvzJWYv36WWm', //TODO include ipfs image
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
			setCertificateInfo(certificate)
			const body = {
				type: 'createAsset',
				event: certificate
			}
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
				setMetadata(data)
				setTitlePurchase('Purchasing ...')
				setPurchase(true)
			} else {
				console.error('Error al crear template:', data.message)
				setLoading(false)
				toast({
					title: 'Error creating metadata.',
					description: data.message,
					status: 'warning',
					duration: 5000,
					isClosable: false
				})
			}
		} catch (error) {
			toast({
				title: 'Error Purchasing Certificate.',
				description: 'Please try again.',
				status: 'warning',
				duration: 5000,
				isClosable: false
			})
			console.log(error)
			setLoading(false)
		}
	}
	const onPay = async () => {
		console.log(metadata)
		console.log(metadata.data.result.assetBlock.cid)
		setPurchased(true)
		setTitlePurchase('Interacting with smart contract ...')
		try {
			if (!certificateInfo) {
				setLoading(false)
				setPurchase(false)
				setPurchased(false)
				toast({
					title: 'Error Purchasing Certificate.',
					description: 'Error fetching certificate data.',
					status: 'warning',
					duration: 5000,
					isClosable: false
				})
				return
			}
			// const CO2Total = certificateInfo?.event_co2.co2_amount
			const CO2Total = 4
			const CO2TotalInWei = ethers.utils.parseUnits(CO2Total.toString(), 18)
			const IPFSURL = `https://ipfs.io/ipfs/${metadata.data.result.assetBlock.cid}`

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
			const mintNetZeroCertificateTX = await contract.mintNetZeroCertificate(
				CO2TotalInWei,
				IPFSURL,
				{ gasLimit: 2500000 }
			) // Debe pasar CO2Total a la 18
			console.log(mintNetZeroCertificateTX)
			contract.on('Minted', (to, tokenId, uri, event) => {
				console.log('Minted Event:')
				console.log('To:', to)
				console.log('Token ID:', tokenId.toString())
				console.log('URI:', uri)
				onEventDone(tokenId.toString(), mintNetZeroCertificateTX.hash)
			})
		} catch (error) {
			console.log(error)
			setLoading(false)
			setPurchase(false)
			setPurchased(false)
			toast({
				title: 'Error Connecting with smart contract.',
				description: 'Please try again.',
				status: 'warning',
				duration: 5000,
				isClosable: false
			})
		}
	}
	const onEventDone = async (nftId: string, hash: string) => {
		let eventItem = projectInfo.events.find(
			_event => _event.event_id === event.event_id
		)
		if (eventItem) {
			console.log('event found')
			eventItem.isCertified = true
			eventItem.creationTx = hash
			eventItem.nftId = nftId
			projectInfo.totalToraise += eventItem.emissionDetails.co2_amount * 10
		} else {
			console.log('not encountered the event')
			projectInfo.events.push(event)
			projectInfo.events[projectInfo.events.length - 1].isCertified = true
			projectInfo.events[projectInfo.events.length - 1].creationTx = hash
			projectInfo.events[projectInfo.events.length - 1].nftId = nftId
			projectInfo.totalToraise += event.emissionDetails.co2_amount * 10
		}
		if (certificateInfo) projectInfo.certificates.push(certificateInfo)
		const update = await updateProject(projectInfo)
		console.log('event updated')
		refetch()
		setPurchased(false)
		setLoading(false)
	}
	const ModalInfo = () => {
		return (
			<>
				<Modal isCentered isOpen={finished} onClose={() => setFinished(false)}>
					<ModalOverlay
						bg='blackAlpha.300'
						backdropFilter='blur(10px) hue-rotate(90deg)'
					/>
					<ModalContent>
						<ModalHeader>Completed</ModalHeader>
						<ModalCloseButton />
						<ModalBody>
							<Text>
								Please wait for some seconds for the transaction to be confirmed
							</Text>
							<Text>
								You will be able to see your certificate on the dashboard once
								complete
							</Text>
						</ModalBody>
						<ModalFooter>
							<Button
								w='7rem'
								variant='primary'
								onClick={() => setFinished(false)}
							>
								Close
							</Button>
						</ModalFooter>
					</ModalContent>
				</Modal>
			</>
		)
	}
	const ModalNFT = () => {
		return (
			<>
				<Modal
					isCentered
					isOpen={certificate}
					onClose={() => setCertificate(false)}
				>
					<ModalOverlay
						bg='blackAlpha.300'
						backdropFilter='blur(10px) hue-rotate(90deg)'
					/>
					<ModalContent>
						<ModalHeader>
							<ModalCloseButton />
						</ModalHeader>

						<ModalBody>
							<Image
								objectFit='cover'
								src='/Images/nft.jpg'
								alt='Chakra UI'
								borderRadius='lg'
							/>
							<Flex
								align='start'
								mt='4'
								justify='center'
								flexDirection='column'
								width='100%'
							>
								<Flex justify='space-between' align='center' width='100%'>
									<Text textColor='gray.600' fontWeight='bold' fontSize='2xl'>
										{' '}
										{event.name}
									</Text>
									<Text
										textColor='gray.500'
										fontWeight='semibold'
										fontSize='3xl'
									>
										{event.emissionDetails.co2_amount} CO2
									</Text>
								</Flex>
								<Text textColor='gray.500' fontSize='md'>
									For a greener tomorrow! This NFT represents a tokenized carbon
									offset and stands as your pledge towards the environment.{' '}
								</Text>
								<Flex width='100%' justify='flex-end'>
									<Link
										mt='2'
										fontWeight='semibold'
										textColor='brand.dark'
										href={`https://mumbai.polygonscan.com/tx/${event.creationTx}`}
										isExternal
										target='_blank'
										rel='noopener noreferrer'
									>
										{' '}
										View on Etherscan
									</Link>
								</Flex>
							</Flex>
						</ModalBody>
						<ModalFooter>
							<Button w='7rem' onClick={() => setCertificate(false)}>
								Close
							</Button>
						</ModalFooter>
					</ModalContent>
				</Modal>
			</>
		)
	}
	const ModalPurchase = () => {
		return (
			<>
				<Modal isCentered isOpen={isOpen} onClose={onClose}>
					<ModalOverlay
						bg='blackAlpha.300'
						backdropFilter='blur(10px) hue-rotate(90deg)'
					/>
					<ModalContent>
						<ModalHeader>Purchase</ModalHeader>
						<ModalCloseButton />
						<ModalBody>
							<Text>Are you sure about purchasing this certificate?</Text>
							<Text>{`The approx cost is ${
								(event.emissionDetails.co2_amount * 10).toFixed(2)
							} USD`}</Text>
						</ModalBody>
						<ModalFooter>
							<Button w='7rem' variant='primary' onClick={onStartPurchase}>
								Purchase
							</Button>
						</ModalFooter>
					</ModalContent>
				</Modal>
			</>
		)
	}
	if (loading) {
		return (
			<Flex align='center' justify='center' direction='column' mt='4'>
				<Spinner color='brand.dark' size='xl' mb='2' />
				<Text fontSize='lg' textColor='gray.500' fontWeight='medium'>
					{titlePurchase}
				</Text>
				{purchase && !purchased && (
					<>
						<Text fontSize='m' textColor='gray.500' fontWeight='medium' mt='5%'>
							{'Please click on pay button to execute the transaction'}
						</Text>
						{!purchased && (
							<Button variant='primary' size='sm' mt='2%' onClick={onPay}>
								Purchase certificate
							</Button>
						)}
					</>
				)}
			</Flex>
		)
	}

	return (
		<>
			<Flex
				align='start'
				flexDirection={{ base: 'column', md: 'row' }}
				height='90%'
			>
				<VStack align='start' width={{ base: '100%', md: '40%' }} height='100%'>
					<Text
						fontWeight='semibold'
						fontSize='lg'
						textColor='gray.700'
						pb='2'
						width='100%'
						height='10%'
					>
						{' '}
						{event.name}
					</Text>
					<Text textColor='gray.500' width='100%' height='70%' noOfLines={5}>
						{' '}
						{event.description}
					</Text>
					{event.isCertified && (
						<Button
							variant='primary'
							justifyContent='flex-end'
							size='sm'
							onClick={() => setCertificate(true)}
							mt='1'
						>
							Show Certificate
						</Button>
					)}
					{owner && !event.isCertified && (
						<Button
							variant='primary'
							alignSelf='flex-end'
							size='sm'
							onClick={() => setIsOpen(true)}
							mt='1'
						>
							Purchase Certificate
						</Button>
					)}
				</VStack>
				{event && (
					<VStack width={{ base: '100%', md: '60%' }}>
						<ResultsChart
							co2_amount={event.emissionDetails.co2_amount}
							sections={event.emissionDetails.sections}
						/>
					</VStack>
				)}
			</Flex>
			{isOpen && <ModalPurchase />}
			{finished && <ModalInfo />}
			{certificate && <ModalNFT />}
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
