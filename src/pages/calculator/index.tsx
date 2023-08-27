import React, { useRef, useState } from 'react'
import axios from 'axios'
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
import Form1, { Form1Input, Form1Ref } from '../../components/calculator/Form1'
import Form2, { Form2Input, Form2Ref } from '../../components/calculator/Form2'
import Form3, { Form3Input, Form3Ref } from '../../components/calculator/Form3'
import Form4, { Form4Input, Form4Ref } from '../../components/calculator/Form4'
import Form5, { Form5Input, Form5Ref } from '../../components/calculator/Form5'
import Form6, { Form6Input, Form6Ref } from '../../components/calculator/Form6'
import { EventDetails } from '../../models/event-details.model'
import LiveVisitsChart from '../../components/charts/LiveVisitsChart'
export default function Calculator() {
	const stepNumber = 6
	let form6info: Form6Input
	const form1Ref = useRef<Form1Ref>(null)
	const form2Ref = useRef<Form2Ref>(null)
	const form3Ref = useRef<Form3Ref>(null)
	const form4Ref = useRef<Form4Ref>(null)
	const form5Ref = useRef<Form5Ref>(null)
	const form6Ref = useRef<Form6Ref>(null)
	const toast = useToast()
	const [calculated, setCalculated] = useState(false);
	const [loading, setLoading] = useState(false);
	const [step, setStep] = useState(1);
	const [progress, setProgress] = useState(100 / stepNumber);
	const [formInfo, setFormInfo] = useState<EventDetails>({
		event_name: '',
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
		percentage_business_class: '',
		over_night_stay_three_stars: '',
		over_night_stay_four_stars: '',
		over_night_stay_five_stars: '',
		meal_meat_amount: '',
		meal_vegetarian_amount: '',
		snacks_amount: '',
		soda_liters: '',
		coffee_cups: '',
		tea_cups: '',
		wine_liters: '',
		beer_liters: '',
		spirits_liters: '',
		power_consumption: '',
		printed_matter: '',
		plastics: '',
		recyclable_material: '',
		plant_based_materials: '',
		event_stand_area: ''
	})
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
			country: info.country,
			participants: parseInt(info.participants),
			employees: parseInt(info.employees),
			event_name: info.eventName,
			heated_area: info.heatedArea ? parseInt(info.heatedArea) : 0,
			air_conditioned_area: info.airConditionedArea
				? parseInt(info.airConditionedArea)
				: 0
		})
	}
	const onSetInfoForm2 = (info: Form2Input) => {
		console.log(info)
		setFormInfo({
			...formInfo,
			number_of_people_arriving_by_car: parseInt(info.peopleByCar),
			average_distance_traveled_by_car: info.distanceByCar,
			number_of_people_traveling_by_public_transport: parseInt(
				info.peopleByPublicTransport
			),
			average_distance_traveled_public: parseInt(
				info.distanceByPublicTransport
			),
			short_haul_flights: parseInt(info.shortHaulFlights),
			medium_haul_flights: parseInt(info.mediumHaulFlights),
			long_haul_flights: parseInt(info.longHaulFlights),
			percentage_business_class: info.percentageBusinessClass
		})
	}
	const onSetInfoForm3 = (info: Form3Input) => {
		console.log(info)
		setFormInfo({
			...formInfo,
			over_night_stay_three_stars: info.overnight2_3Stars,
			over_night_stay_four_stars: info.overnight4Stars,
			over_night_stay_five_stars: info.overnight5Stars
		})
	}
	const onSetInfoForm4 = (info: Form4Input) => {
		console.log(info)
		setFormInfo({
			...formInfo,
			meal_meat_amount: info.meal_meat_amount,
			meal_vegetarian_amount: info.meal_vegetarian_amount,
			snacks_amount: info.snacks_amount,
			soda_liters: info.soda_liters,
			coffee_cups: info.coffee_cups,
			tea_cups: info.tea_cups,
			wine_liters: info.wine_liters,
			beer_liters: info.beer_liters,
			spirits_liters: info.spirits_liters
		})
	}
	const onSetInfoForm5 = (info: Form5Input) => {
		console.log(info)
		setFormInfo({
			...formInfo,
			power_consumption: info.power_consumption,
			printed_matter: info.printed_matter,
			plastics: info.plastics,
			plant_based_materials: info.plant_based_materials,
			event_stand_area: info.event_stand_area
		})
	}
	const onSetInfoForm6 = (info: Form6Input) => {
		console.log(info)
		form6info = info
	}
	const onCalculate = async () => {
		try {
			const body = {
				event_name: formInfo.event_name,
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
			const headers = {
				'Content-Type': 'application/json'
			}
			const scrapperUrl = 'http://localhost:8000/co2calculation'
			const response = await axios.post(scrapperUrl, body, { headers: headers })
			console.log(response)

			toast({
				title: 'Account created.',
				description: "We've created your account for you.",
				status: 'success',
				duration: 3000,
				isClosable: true
			})
		} catch (error) {
			console.log(error)
			toast({
				title: 'Error calculating.',
				description: 'Pleaase try again later.',
				status: 'error',
				duration: 3000,
				isClosable: true
			})
		}
	}
	return calculated ? (
		<div>
			<Heading as='h1' textAlign='center' my={5}>
				Footprint Calculator
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
				<Progress
					hasStripe
					value={progress}
					mb='5%'
					mx='5%'
					isAnimated
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
					<Form6 ref={form6Ref} onValidationComplete={onSetInfoForm6} loading={loading}/>
				)}
				<ButtonGroup mt='5%' w='100%'>
					<Flex w='100%' justifyContent='space-between'>
						<Flex>
							<Button
								onClick={() => {
									setStep(step - 1)
									setProgress(progress - 100 / stepNumber)
								}}
								isDisabled={step === 1}
								colorScheme='teal'
								variant='solid'
								w='7rem'
								mr='5%'
							>
								Back
							</Button>
							<Button
								w='7rem'
								isDisabled={step === stepNumber}
								onClick={onNext}
								colorScheme='teal'
								variant='outline'
							>
								Next
							</Button>
						</Flex>
						{step === stepNumber ? (
							<Button
								w='7rem'
								colorScheme='red'
								variant='solid'
								onClick={onNext}
							>
								Submit
							</Button>
						) : null}
					</Flex>
				</ButtonGroup>
			</Box>
		</div>
	) : (
		<div>
			<Heading as='h1' textAlign='center' my={5}>
				Event Calculation Result
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
				<LiveVisitsChart />
				<Flex
					flexDirection='column'
					alignItems='center'
					justifyContent='center'
					mt={2}
				>
					<Text mt={4}>Este es el texto que aparece debajo del gráfico</Text>
				</Flex>
				<ButtonGroup mt='5%' w='100%'>
					<Flex w='100%' justifyContent='space-between'>
						<Flex>
							<Button
								onClick={() => {
									setStep(step - 1)
									setProgress(progress - 100 / stepNumber)
								}}
								colorScheme='teal'
								variant='solid'
								w='7rem'
								mr='5%'
							>
								Go Home
							</Button>
							<Button
								w='12rem'
								isDisabled={step === stepNumber}
								onClick={onNext}
								colorScheme='teal'
								variant='outline'
							>
								Re-Calculate
							</Button>
						</Flex>
						<Button
							w='12rem'
							colorScheme='green'
							variant='solid'
							onClick={onNext}
						>
							Create Project
						</Button>
					</Flex>
				</ButtonGroup>
			</Box>
		</div>
	)
}