import React, { useRef, useState } from 'react'
import router, { useRouter } from 'next/router'
import { getAccount } from '@wagmi/core'
import axios from 'axios'
import { nanoid } from 'nanoid'
import {
	Progress,
	Box,
	ButtonGroup,
	Button,
	Flex,
	useToast,
	Heading,
	Text
} from '@chakra-ui/react'
import { Contract, ethers } from 'ethers'
import FootprintContractJson from '../../assets/contracts/Footprint.json'
import { Footprint } from '../../../@types/typechain-types/Footprint'

import Form1, { Form1Input, Form1Ref } from '../../components/calculator/Form1'
import Form2, { Form2Input, Form2Ref } from '../../components/calculator/Form2'
import Form3, { Form3Input, Form3Ref } from '../../components/calculator/Form3'
import Form4, { Form4Input, Form4Ref } from '../../components/calculator/Form4'
import Form5, { Form5Input, Form5Ref } from '../../components/calculator/Form5'
import Form6, { Form6Input, Form6Ref } from '../../components/calculator/Form6'
import { EventDetails } from '../../models/event-details.model'
import ResultsChart from '../../components/charts/ResultsChart'
import { EmissionDetails } from '../../models/emission-details.model'
import { CertificateDetails } from '../../models/certificate-details.model'
import CreateForm from '../create'
export default function Calculator() {
	const account = getAccount()
	const toast = useToast()
	const router = useRouter();
	const stepNumber = 6
	let form6info: Form6Input
	const form1Ref = useRef<Form1Ref>(null)
	const form2Ref = useRef<Form2Ref>(null)
	const form3Ref = useRef<Form3Ref>(null)
	const form4Ref = useRef<Form4Ref>(null)
	const form5Ref = useRef<Form5Ref>(null)
	const form6Ref = useRef<Form6Ref>(null)
	const [calculated, setCalculated] = useState(false);
	const [loading, setLoading] = useState(false);
	const [onCreate, setOnCreate] = useState(false);
	const [results, setResults] = useState<EmissionDetails>(initValuesResults);
	const [step, setStep] = useState(1);
	const [progress, setProgress] = useState(100 / stepNumber);
	const [formInfo, setFormInfo] = useState<EventDetails>(initFormInfo);
	const onNext = () => {
		if (step === 1 && form1Ref.current) {
			form1Ref.current.validateAndSubmit(() => {
				showNextForm()
			})
		} else if (step === 2 && form2Ref.current) {
			form2Ref.current.validateAndSubmit(() => {
				showNextForm()
			})
		} else if (step === 3 && form3Ref.current) {
			form3Ref.current.validateAndSubmit(() => {
				showNextForm()
			})
		} else if (step === 4 && form4Ref.current) {
			form4Ref.current.validateAndSubmit(() => {
				showNextForm()
			})
		} else if (step === 5 && form5Ref.current) {
			form5Ref.current.validateAndSubmit(() => {
				showNextForm()
			})
		} else if (step === 6 && form6Ref.current) {
			form6Ref.current.validateAndSubmit(() => {
				onCalculate()
			})
		}
	}
	const showNextForm = () => {
		setStep(step + 1)
		if (step === stepNumber + 1) {
			setProgress(100)
		} else {
			setProgress(progress + 100 / stepNumber + 1)
		}
	}
	const onSetInfoForm1 = (info: Form1Input) => {
		console.log(info)
		setFormInfo({
			...formInfo,
			event_duration: parseInt(info.duration),
			event_description: info.eventDescription,
			country: info.country,
			participants: parseInt(info.participants),
			employees: parseInt(info.employees),
			event_name: info.eventName,
			heated_area: info.heatedArea === '' ? 0 : parseInt(info.heatedArea),
			air_conditioned_area:
				info.airConditionedArea === '' ? 0 : parseInt(info.airConditionedArea)
		})
	}
	const onSetInfoForm2 = (info: Form2Input) => {
		console.log(info)
		setFormInfo({
			...formInfo,
			number_of_people_arriving_by_car:
				info.peopleByCar === '' ? 0 : parseInt(info.peopleByCar),
			average_distance_traveled_by_car:
				info.distanceByCar === '' ? '0' : info.distanceByCar,
			number_of_people_traveling_by_public_transport:
				info.peopleByPublicTransport === ''
					? 0
					: parseInt(info.peopleByPublicTransport),
			average_distance_traveled_public:
				info.distanceByPublicTransport === ''
					? 0
					: parseInt(info.distanceByPublicTransport),
			short_haul_flights:
				info.shortHaulFlights === '' ? 0 : parseInt(info.shortHaulFlights),
			medium_haul_flights:
				info.mediumHaulFlights === '' ? 0 : parseInt(info.mediumHaulFlights),
			long_haul_flights:
				info.longHaulFlights === '' ? 0 : parseInt(info.longHaulFlights),
			percentage_business_class:
				info.percentageBusinessClass === '' ? '0' : info.percentageBusinessClass
		})
	}
	const onSetInfoForm3 = (info: Form3Input) => {
		console.log(info)
		setFormInfo({
			...formInfo,
			over_night_stay_three_stars:
				info.overnight2_3Stars === '' ? '0' : info.overnight2_3Stars,
			over_night_stay_four_stars:
				info.overnight4Stars === '' ? '0' : info.overnight4Stars,
			over_night_stay_five_stars:
				info.overnight5Stars === '' ? '0' : info.overnight5Stars
		})
	}
	const onSetInfoForm4 = (info: Form4Input) => {
		console.log(info)
		setFormInfo({
			...formInfo,
			meal_meat_amount:
				info.meal_meat_amount === '' ? '0' : info.meal_meat_amount,
			meal_vegetarian_amount:
				info.meal_vegetarian_amount === '' ? '0' : info.meal_vegetarian_amount,
			snacks_amount: info.snacks_amount === '' ? '0' : info.snacks_amount,
			soda_liters: info.soda_liters === '' ? '0' : info.soda_liters,
			coffee_cups: info.coffee_cups === '' ? '0' : info.coffee_cups,
			tea_cups: info.tea_cups === '' ? '0' : info.tea_cups,
			wine_liters: info.wine_liters === '' ? '0' : info.wine_liters,
			beer_liters: info.beer_liters === '' ? '0' : info.beer_liters,
			spirits_liters: info.spirits_liters === '' ? '0' : info.spirits_liters
		})
	}
	const onSetInfoForm5 = (info: Form5Input) => {
		console.log(info)
		setFormInfo({
			...formInfo,
			power_consumption:
				info.power_consumption === '' ? '0' : info.power_consumption,
			printed_matter: info.printed_matter === '' ? '0' : info.printed_matter,
			plastics: info.plastics === '' ? '0' : info.plastics,
			plant_based_materials:
				info.plant_based_materials === '' ? '0' : info.plant_based_materials,
			event_stand_area:
				info.event_stand_area === '' ? '0' : info.event_stand_area
		})
	}
	const onSetInfoForm6 = (info: Form6Input) => {
		console.log(info)
		form6info = {
			transported_weight:
				info.transported_weight === '' ? '0' : info.transported_weight,
			transported_distance:
				info.transported_distance === '' ? '0' : info.transported_distance,
			garbage: info.garbage === '' ? '0' : info.garbage,
			recycling: info.recycling === '' ? '0' : info.recycling
		}
	}
	const onCalculate = async () => {
		try {
			setLoading(true)
			const body: EventDetails = {
				event_name: formInfo.event_name,
				event_description: formInfo.event_description,
				event_duration: formInfo.event_duration,
				country: formInfo.country,
				participants: formInfo.participants,
				employees: formInfo.employees,
				heated_area: formInfo.heated_area ?? 0,
				air_conditioned_area: formInfo.air_conditioned_area ?? 0,
				number_of_people_arriving_by_car:
					formInfo.number_of_people_arriving_by_car ?? 0,
				average_distance_traveled_by_car:
					formInfo.average_distance_traveled_by_car ?? '0',
				number_of_people_traveling_by_public_transport:
					formInfo.number_of_people_traveling_by_public_transport ?? 0,
				average_distance_traveled_public:
					formInfo.average_distance_traveled_public ?? 0,
				short_haul_flights: formInfo.short_haul_flights ?? 0,
				medium_haul_flights: formInfo.medium_haul_flights ?? 0,
				long_haul_flights: formInfo.long_haul_flights ?? 0,
				percentage_business_class: formInfo.percentage_business_class ?? '0',
				over_night_stay_three_stars:
					formInfo.over_night_stay_three_stars ?? '0',
				over_night_stay_four_stars: formInfo.over_night_stay_four_stars ?? '0',
				over_night_stay_five_stars: formInfo.over_night_stay_five_stars ?? '0',
				meal_meat_amount: formInfo.meal_meat_amount ?? '0',
				meal_vegetarian_amount: formInfo.meal_vegetarian_amount ?? '0',
				snacks_amount: formInfo.snacks_amount ?? '0',
				soda_liters: formInfo.soda_liters ?? '0',
				coffee_cups: formInfo.coffee_cups ?? '0',
				tea_cups: formInfo.tea_cups ?? '0',
				wine_liters: formInfo.wine_liters ?? '0',
				beer_liters: formInfo.beer_liters ?? '0',
				spirits_liters: formInfo.spirits_liters ?? '0',
				power_consumption: formInfo.power_consumption ?? '0',
				printed_matter: formInfo.printed_matter ?? '0',
				plastics: formInfo.plastics ?? '0',
				recyclable_material: formInfo.recyclable_material ?? '0',
				plant_based_materials: formInfo.plant_based_materials ?? '0',
				event_stand_area: formInfo.event_stand_area ?? '0',
				transported_weight: form6info.transported_weight,
				transported_distance: form6info.transported_distance,
				garbage: form6info.garbage,
				recycling: form6info.recycling
			}
			//Rewrites the event information into formInfo const
			setFormInfo(body);
			const headers = {
				'Content-Type': 'application/json'
			}
			const scrapperUrl = 'http://localhost:8000/co2calculation'
			const response = await axios.post(scrapperUrl, body, { headers: headers })
			console.log(response)
			toast({
				title: 'Event calculated.',
				description: "We've finished calculating the impact.",
				status: 'success',
				duration: 5000,
				isClosable: true
			})
			showResults(response.data);
		} catch (error) {
			console.log(error)
			toast({
				title: 'Error calculating.',
				description: 'Pleaase try again later.',
				status: 'error',
				duration: 3000,
				isClosable: true
			})
			setLoading(false)
		}
	}
	const showResults = (emissionDetails: EmissionDetails) => {
		setResults(emissionDetails)
		setCalculated(true)
		setLoading(false)
	}
	const onRecalculate = () => {
		setResults(initValuesResults)
		setFormInfo(initFormInfo)
		setStep(1)
		form6info = {
			transported_weight: '0',
			transported_distance: '0',
			garbage: '0',
			recycling: '0'
		}
		setProgress(100 / stepNumber)
		setCalculated(false)
	}
	//TODO this must be done after create the project
	const onCreateAsset = async () => {
		if (!account.address) {
			toast({
				title: 'Error Searching User.',
				description: 'Pleaase connect your wallet.',
				status: 'warning',
				duration: 5000,
				isClosable: false
			})
			return
		}
		const url = '/api/co2storage'
		const certificate: CertificateDetails = {
			owner: account.address, // wallet
			image:
				'', // ipfs image
			project_id: nanoid(),
			project_name: 'My project name',
			project_description: 'My project desc',
			event_id: nanoid(), // consecutivo
			event_name: formInfo.event_name,
			event_description: formInfo.event_description,
			event_duration: formInfo.event_duration,
			event_co2: results,
			country: formInfo.country,
			participants: formInfo.participants,
			employees: formInfo.employees,
			heated_area: formInfo.heated_area,
			air_conditioned_area: formInfo.air_conditioned_area,
			number_of_people_arriving_by_car:
				formInfo.number_of_people_arriving_by_car,
			average_distance_traveled_by_car:
				formInfo.average_distance_traveled_by_car,
			number_of_people_traveling_by_public_transport:
				formInfo.number_of_people_traveling_by_public_transport,
			short_haul_flights: formInfo.short_haul_flights,
			medium_haul_flights: formInfo.medium_haul_flights,
			long_haul_flights: formInfo.long_haul_flights,
			percentage_business_class: formInfo.percentage_business_class,
			over_night_stay_three_stars: formInfo.over_night_stay_three_stars,
			over_night_stay_four_stars: formInfo.over_night_stay_four_stars,
			over_night_stay_five_stars: formInfo.over_night_stay_five_stars,
			meal_meat_amount: formInfo.meal_meat_amount,
			meal_vegetarian_amount: formInfo.meal_vegetarian_amount,
			snacks_amount: formInfo.snacks_amount,
			soda_liters: formInfo.soda_liters,
			coffee_cups: formInfo.coffee_cups,
			tea_cups: formInfo.tea_cups,
			wine_liters: formInfo.wine_liters,
			beer_liters: formInfo.beer_liters,
			spirits_liters: formInfo.spirits_liters,
			power_consumption: formInfo.power_consumption,
			printed_matter: formInfo.printed_matter,
			plastics: formInfo.plastics,
			recyclable_material: formInfo.recyclable_material,
			plant_based_materials: formInfo.plant_based_materials,
			event_stand_area: formInfo.event_stand_area,
			transported_weight: formInfo.transported_weight,
			transported_distance: formInfo.transported_distance,
			garbage: formInfo.garbage,
			recycling: formInfo.recycling
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
				console.log('Asset creado:', data)

				const CO2Total = data.event_co2.co2_amount
				const IPFSURL = `https://ipfs.io/ipfs/${data.result.assetBlock.cid}`

				//TODO send this to smart contract

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
				// const mintNetZeroCertificateTX = await contract.mintNetZeroCertificate(CO2Total, IPFSURL) // Debe pasar CO2Total a la 18
				// await mintTx.wait(1)
				//mandar el total de co2 =>> certificate.event_co2.co2_amount, IPFSURL

				return data
			} else {
				console.error('Error al crear template:', data.message)
				throw new Error(data.message)
			}
		} catch (error) {
			console.error('Error en la petición:', error)
		}
	}

	if(onCreate){
		return (
			<CreateForm eventData={formInfo} results={results}/>
		)
	}

	return !calculated ? (
		<div>
			<Box
				borderWidth='1px'
				rounded='lg'
				maxWidth={800}
				p={6}
				m='40px auto'
				as='form'
			>
				<Progress
					hasStripe
					value={progress}
					mb='5%'
					isAnimated
          borderRadius="lg"
				></Progress>
				{step === 1 ? (
					<Form1 ref={form1Ref} onValidationComplete={onSetInfoForm1} />
				) : step === 2 ? (
					<Form2 ref={form2Ref} onValidationComplete={onSetInfoForm2} />
				) : step === 3 ? (
					<Form3 ref={form3Ref} onValidationComplete={onSetInfoForm3} />
				) : step === 4 ? (
					<Form4 ref={form4Ref} onValidationComplete={onSetInfoForm4} />
				) : step === 5 ? (
					<Form5 ref={form5Ref} onValidationComplete={onSetInfoForm5} />
				) : (
					<Form6
						ref={form6Ref}
						onValidationComplete={onSetInfoForm6}
						loading={loading}
					/>
				)}
				<ButtonGroup mt='5%' w='100%' justifyContent="flex-end">
							<Button
								onClick={() => {
									setStep(step - 1)
									setProgress(progress - 100 / stepNumber)
								}}
								isDisabled={step === 1}
								w='7rem'
								mr='5%'
								isLoading={loading}
							>
								Back
							</Button>
              {step !== stepNumber ? (
							<Button
								w='7rem'
								isDisabled={step === stepNumber}
								onClick={onNext}
								variant='primary'
								isLoading={loading}
							>
								Next
							</Button>
               ) : null}
						{step === stepNumber ? (
							<Button
								w='7rem'
								variant='darkie'
								onClick={onNext}
								isLoading={loading}
							>
								Calculate
							</Button>
						) : null}
				</ButtonGroup>
			</Box>
		</div>
	) : (
		<div>
			<Heading as='h1' textAlign='center' my={5}>
				Calculator
			</Heading>
			<Box
				borderWidth='1px'
				rounded='lg'
				shadow='1px 1px 3px rgba(0,0,0,0.3)'
				maxWidth={800}
				p={6}
				m='10px auto'
				as='form'
			>
				<Heading w='100%' textAlign={'center'} fontWeight='normal' mb='2%'>
					{`Event ${formInfo.event_name} Results`}
				</Heading>
				<ResultsChart
					co2_amount={results.co2_amount}
					sections={results.sections}
				/>
				<Flex
					flexDirection='column'
					alignItems='center'
					justifyContent='center'
					mt={2}
				>
					<Text mt={4}>¿Quieres crear un proyecto?</Text>
				</Flex>
				<ButtonGroup mt='5%' w='100%'>
					<Flex w='100%' justifyContent='space-between'>
						<Flex>
							<Button
								onClick={() => {
									router.push('/');
								}}
								colorScheme='teal'
								variant='solid'
								w='7rem'
								mr='5%'
								isLoading={loading}
							>
								Go Home
							</Button>
							<Button
								w='12rem'
								onClick={onRecalculate}
								colorScheme='teal'
								variant='outline'
								isLoading={loading}
							>
								Re-Calculate
							</Button>
						</Flex>
						<Button
							isLoading={loading}
							w='12rem'
							colorScheme='green'
							variant='solid'
							onClick={() => setOnCreate(true)}
						>
							Create Project
						</Button>
					</Flex>
				</ButtonGroup>
			</Box>
		</div>
	)
}

export const initValuesResults: EmissionDetails = {
	co2_amount: 0,
	sections: {
		Mobility: 0,
		Accommodation: 0,
		Catering: 0,
		Energy: 0,
		Materials: 0,
		Transport: 0,
		Waste: 0
	}
}
export const initFormInfo: EventDetails = {
	event_name: '',
	event_description: '',
	event_duration: 0,
	country: '',
	participants: 0,
	employees: 0,
	heated_area: 0,
	air_conditioned_area: 0,
	number_of_people_arriving_by_car: 0,
	average_distance_traveled_by_car: '',
	number_of_people_traveling_by_public_transport: 0,
	average_distance_traveled_public: 0,
	short_haul_flights: 0,
	medium_haul_flights: 0,
	long_haul_flights: 0,
	percentage_business_class: '0',
	over_night_stay_three_stars: '0',
	over_night_stay_four_stars: '0',
	over_night_stay_five_stars: '0',
	meal_meat_amount: '0',
	meal_vegetarian_amount: '0',
	snacks_amount: '0',
	soda_liters: '0',
	coffee_cups: '0',
	tea_cups: '0',
	wine_liters: '0',
	beer_liters: '0',
	spirits_liters: '0',
	power_consumption: '0',
	printed_matter: '0',
	plastics: '0',
	recyclable_material: '0',
	plant_based_materials: '0',
	event_stand_area: '0',
	transported_weight: '0',
	transported_distance: '0',
	garbage: '0',
	recycling: '0'
}
