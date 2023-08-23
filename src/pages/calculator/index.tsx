import React, { useRef, useState } from 'react'
import {
	Progress,
	Box,
	ButtonGroup,
	Button,
	Flex,
	useToast,
} from '@chakra-ui/react'
import Form1, { Form1Input, Form1Ref } from '../../components/calculator/Form1'
import Form2, { Form2Input } from '../../components/calculator/Form2'
import Form3, { Form3Input } from '../../components/calculator/Form3'

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
}
export default function Calculator() {
	const stepNumber = 4
	const form1Ref = useRef<Form1Ref>(null)
	const form2Ref = useRef<Form1Ref>(null)
	const form3Ref = useRef<Form1Ref>(null)
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
		over_night_stay_five_stars: ''
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
		}
	}
	const showNextForm = () => {
		setStep(step + 1)
		if (step === stepNumber) {
			setProgress(100)
		} else {
			setProgress(progress + 100 / stepNumber)
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
				) : (
					<Form3 ref={form3Ref} onValidationComplete={onSetInfoForm3} />
				)}
				<ButtonGroup mt='5%' w='100%'>
					<Flex w='100%' justifyContent='space-between'>
						<Flex>
							<Button
								onClick={() => {
									setStep(step - 1)
									setProgress(progress - 33.33)
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
