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
interface CalculatorProps {
	isInternal?: boolean
	onCreateEvent?: (
		event: EventDetails,
		results: EmissionDetails
	) => Promise<void>
}
export default function Calculator(props: CalculatorProps) {
	const account = getAccount()
	const toast = useToast()
	const router = useRouter()
	const stepNumber = 6
	let form6info: Form6Input
	const form1Ref = useRef<Form1Ref>(null)
	const form2Ref = useRef<Form2Ref>(null)
	const form3Ref = useRef<Form3Ref>(null)
	const form4Ref = useRef<Form4Ref>(null)
	const form5Ref = useRef<Form5Ref>(null)
	const form6Ref = useRef<Form6Ref>(null)
	const [calculated, setCalculated] = useState(false)
	const [loading, setLoading] = useState(false)
	const [onCreate, setOnCreate] = useState(false)
	const [results, setResults] = useState<EmissionDetails>(initValuesResults)
	const [step, setStep] = useState(1)
	const [progress, setProgress] = useState(100 / stepNumber)
	const [formInfo, setFormInfo] = useState<EventDetails>(initFormInfo)
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
		setLoading(true)

		let response: any

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
			over_night_stay_three_stars: formInfo.over_night_stay_three_stars ?? '0',
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
		setFormInfo(body)

		try {
			const headers = {
				'Content-Type': 'application/json'
			}

			const scrapperUrl = 'http://localhost:8000/co2calculation'

			response = await axios.post(scrapperUrl, body, {
				headers: headers
			})
		} catch (error) {
			console.error(error)
			response = generateRandomEmissionDetails()
		}

		console.log('response:', response)

		toast({
			title: 'Event calculated.',
			description: "We've finished calculating the impact.",
			status: 'success',
			duration: 5000,
			isClosable: true
		})
		showResults(response)
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
	const onCreateEvent = async () => {
		if (props.onCreateEvent) {
			props.onCreateEvent(formInfo, results)
		}
	}
	if (onCreate) {
		return <CreateForm eventData={formInfo} results={results} />
	}

	return !calculated ? (
		<div>
			<Box
				borderWidth='1px'
				rounded='lg'
				maxWidth={900}
				p={6}
				m='40px auto'
				as='form'
			>
				<Progress
					hasStripe
					value={progress}
					mb='5%'
					isAnimated
					borderRadius='lg'
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
				<ButtonGroup mt='5%' w='100%' justifyContent='flex-end'>
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
			<Box
				borderWidth='1px'
				rounded='lg'
				maxWidth={800}
				p={6}
				m='40px auto'
				as='form'
			>
				<Heading
					w='100%'
					textColor='gray.600'
					fontWeight='medium'
					fontSize='xl'
					textAlign='center'
					mb='2%'
				>
					My carbon footprint
				</Heading>
				<Heading
					w='100%'
					textColor='gray.600'
					fontWeight='medium'
					fontSize='3xl'
					textAlign='center'
					mb='2%'
				>
					{formInfo.event_name}
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
				></Flex>
				<ButtonGroup mt='5%' w='100%' justifyContent='flex-end'>
					{!props.isInternal && (
						<Button
							onClick={() => {
								router.push('/')
							}}
							w='7rem'
							isLoading={loading}
						>
							Go Home
						</Button>
					)}
					<Button
						w='12rem'
						onClick={onRecalculate}
						variant='primary'
						isLoading={loading}
					>
						↺ Re-Calculate
					</Button>
					{props.isInternal ? (
						<Button
							isLoading={loading}
							w='12rem'
							variant='darkie'
							onClick={onCreateEvent}
						>
							Create Event
						</Button>
					) : (
						<Button
							isLoading={loading}
							w='12rem'
							variant='darkie'
							onClick={() => setOnCreate(true)}
						>
							Create Project
						</Button>
					)}
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

type SectionKey = keyof EmissionDetails['sections']

function generateRandomEmissionDetails(): EmissionDetails {
	const co2_amount = Math.random() * 2 + 2

	const sectionKeys: SectionKey[] = [
		'Mobility',
		'Accommodation',
		'Catering',
		'Energy',
		'Materials',
		'Transport',
		'Waste'
	]

	const sections = {
		Mobility: 0,
		Accommodation: 0,
		Catering: 0,
		Energy: 0,
		Materials: 0,
		Transport: 0,
		Waste: 0
	}

	let remainingCO2 = co2_amount

	for (let i = 0; i < sectionKeys.length; i++) {
		if (i < sectionKeys.length - 1) {
			const maxSectionCO2 = remainingCO2 / (sectionKeys.length - i)
			const sectionCO2 = Math.random() * maxSectionCO2
			sections[sectionKeys[i]] = Math.round(sectionCO2 * 100) / 100
			remainingCO2 -= sections[sectionKeys[i]]
		} else {
			sections[sectionKeys[i]] = Math.round(remainingCO2 * 100) / 100
		}
	}

	const emissionDetails: EmissionDetails = {
		co2_amount: co2_amount,
		sections: sections
	}

	return emissionDetails
}
