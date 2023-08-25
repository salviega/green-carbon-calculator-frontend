import React, { useRef, useState } from 'react'
import {
	Progress,
	Box,
	ButtonGroup,
	Button,
	Flex,
	useToast
} from '@chakra-ui/react'
import Form1, { Form1Input, Form1Ref } from '../../components/calculator/Form1'
import Form2, { Form2Input, Form2Ref } from '../../components/calculator/Form2'
import Form3, { Form3Input, Form3Ref } from '../../components/calculator/Form3'
import Form4, { Form4Input, Form4Ref } from '../../components/calculator/Form4'
import Form5, { Form5Input, Form5Ref } from '../../components/calculator/Form5'
import Form6, { Form6Input, Form6Ref } from '../../components/calculator/Form6'

export interface CalculatorForm {
	event_name: string
	event_duration: string
	country: string
	participants: string
	employees: string
	heated_area: string | undefined
	air_conditioned_area: string | undefined
	number_of_people_arriving_by_car: string | undefined
	average_distance_traveled_by_car: string | undefined
	number_of_people_traveling_by_public_transport: string | undefined
	average_distance_traveled_public: string | undefined
	short_haul_flights: string | undefined
	medium_haul_flights: string | undefined
	long_haul_flights: string | undefined
	percentage_business_clas: string | undefined
	over_night_stay_three_stars: string | undefined
	over_night_stay_four_stars: string | undefined
	over_night_stay_five_stars: string | undefined
	meal_meat_amount: string | undefined
	meal_vegetarian_amount: string | undefined
	snacks_amount: string | undefined
	soda_liters: string | undefined
	coffee_cups: string | undefined
	tea_cups: string | undefined
	wine_liters: string | undefined
	beer_liters: string | undefined
	spirits_liters: string | undefined
	power_consumption: string | undefined
	printed_matter: string | undefined
	plastics: string | undefined
	recyclable_material: string | undefined
	plant_based_materials: string | undefined
	event_stand_area: string | undefined
	transported_weight: string | undefined
	transported_distance: string | undefined
	garbage: string | undefined
	recycling: string | undefined
}
export default function Calculator() {
	const stepNumber = 6
	const form1Ref = useRef<Form1Ref>(null)
	const form2Ref = useRef<Form2Ref>(null)
	const form3Ref = useRef<Form3Ref>(null)
	const form4Ref = useRef<Form4Ref>(null)
	const form5Ref = useRef<Form5Ref>(null)
	const form6Ref = useRef<Form6Ref>(null)
	const toast = useToast()
	const [step, setStep] = useState(1)
	const [progress, setProgress] = useState(100 / stepNumber)
	const [formInfo, setFormInfo] = useState<CalculatorForm>({
		event_name: '',
		event_duration: '',
		country: '',
		participants: '',
		employees: '',
		heated_area: '',
		air_conditioned_area: '',
		number_of_people_arriving_by_car: '',
		average_distance_traveled_by_car: '',
		number_of_people_traveling_by_public_transport: '',
		average_distance_traveled_public: '',
		short_haul_flights: '',
		medium_haul_flights: '',
		long_haul_flights: '',
		percentage_business_clas: '',
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
		event_stand_area: '',
		transported_weight: '',
		transported_distance: '',
		garbage: '',
		recycling: ''
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
				showNextForm()
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
		setFormInfo({
			...formInfo,
			event_duration: info.duration,
			country: info.country,
			participants: info.participants,
			employees: info.employees,
			event_name: info.eventName,
			heated_area: info.heatedArea,
			air_conditioned_area: info.airConditionedArea
		})
	}
	const onSetInfoForm2 = (info: Form2Input) => {
		console.log(info)
		setFormInfo({
			...formInfo,
			number_of_people_arriving_by_car: info.peopleByCar,
			average_distance_traveled_by_car: info.distanceByCar,
			number_of_people_traveling_by_public_transport:
				info.peopleByPublicTransport,
			average_distance_traveled_public: info.distanceByPublicTransport,
			short_haul_flights: info.shortHaulFlights,
			medium_haul_flights: info.mediumHaulFlights,
			long_haul_flights: info.longHaulFlights,
			percentage_business_clas: info.percentageBusinessClass
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
		setFormInfo({
			...formInfo,
			transported_weight: info.transported_weight,
			transported_distance: info.transported_distance,
			garbage: info.garbage,
			recycling: info.recycling
		})
	}
	return (
		<div>
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
					<Form6 ref={form6Ref} onValidationComplete={onSetInfoForm6} />
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
								onClick={() => {
									toast({
										title: 'Account created.',
										description: "We've created your account for you.",
										status: 'success',
										duration: 3000,
										isClosable: true
									})
								}}
							>
								Submit
							</Button>
						) : null}
					</Flex>
				</ButtonGroup>
			</Box>
		</div>
	)
}
