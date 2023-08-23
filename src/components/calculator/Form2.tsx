import React, { forwardRef, useImperativeHandle, useState } from 'react'
import {
	Heading,
	Flex,
	Input,
	FormControl,
	FormLabel,
} from '@chakra-ui/react'
export interface Form2Input {
	peopleByCar: string
	distanceByCar: string
	peopleByPublicTransport: string
	distanceByPublicTransport: string
	shortHaulFlights: string
	mediumHaulFlights: string
	longHaulFlights: string
	percentageBusinessClass: string
}
interface Form2Props {
	onValidationComplete: (info: Form2Input) => void // Define the prop type
}
export interface Form2Ref {
	validateAndSubmit: (callback: () => void) => void
}
const Form2: React.ForwardRefRenderFunction<Form2Ref, Form2Props> = (
	{ onValidationComplete },
	ref
) => {
	const [inputValues, setInputValues] = useState<Form2Input>({
		peopleByCar: '',
		distanceByCar: '',
		peopleByPublicTransport: '',
		distanceByPublicTransport: '',
		shortHaulFlights: '',
		mediumHaulFlights: '',
		longHaulFlights: '',
		percentageBusinessClass: '',
	})
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { id, value } = e.target
		setInputValues(prevValues => ({ ...prevValues, [id]: value }))
	}
	const validateAndSubmit = (callback: () => void) => {
		onValidationComplete(inputValues)
		callback()
	}
	useImperativeHandle(ref, () => ({
		validateAndSubmit: validateAndSubmit // Expose the function through the ref
	}))
	return (
		<div>
			<Heading w='100%' textAlign={'center'} fontWeight='normal' mb='2%'>
				Mobility
			</Heading>
			<Flex mt='2%'>
				<FormControl mr='2%'>
					<FormLabel htmlFor='peopleByCar' fontWeight={'normal'}>
						Number of people arriving by car
					</FormLabel>
					<Input
						id='peopleByCar'
						placeholder='People arriving by car ...'
						type='number'
						required
						value={inputValues.peopleByCar}
						onChange={handleInputChange}
					/>
				</FormControl>
				<FormControl mr='2%'>
					<FormLabel htmlFor='distanceByCar' fontWeight={'normal'}>
						Average distance travelled (car)
					</FormLabel>
					<Input
						id='distanceByCar'
						placeholder='Distance travelled ...'
						type='number'
						required
						value={inputValues.distanceByCar}
						onChange={handleInputChange}
					/>
				</FormControl>
			</Flex>
			<Flex mt='2%'>
				<FormControl mr='2%'>
					<FormLabel htmlFor='peopleByPublicTransport' fontWeight={'normal'}>
						# of persons travelling by public transport
					</FormLabel>
					<Input
						id='peopleByPublicTransport'
						placeholder='People arriving by public transport...'
						type='number'
						required
						value={inputValues.peopleByPublicTransport}
						onChange={handleInputChange}
					/>
				</FormControl>
				<FormControl mr='2%'>
					<FormLabel htmlFor='distanceByPublicTransport' fontWeight={'normal'}>
						Average distance travelled (public transport)
					</FormLabel>
					<Input
						id='distanceByPublicTransport'
						placeholder='Distance travelled by public transport ...'
						type='number'
						required
						value={inputValues.distanceByPublicTransport}
						onChange={handleInputChange}
					/>
				</FormControl>
			</Flex>
			<Flex mt='2%'>
				<FormControl mr='2%'>
					<FormLabel htmlFor='shortHaulFlights' fontWeight={'normal'}>
						Number of short-haul flights (up to 3h)
					</FormLabel>
					<Input
						id='shortHaulFlights'
						placeholder='# of short-haul flights...'
						type='number'
						required
						value={inputValues.shortHaulFlights}
						onChange={handleInputChange}
					/>
				</FormControl>
				<FormControl mr='2%'>
					<FormLabel htmlFor='mediumHaulFlights' fontWeight={'normal'}>
						Number of medium-haul flights (3-6h)
					</FormLabel>
					<Input
						id='mediumHaulFlights'
						placeholder='# of medium-haul flights ...'
						type='number'
						required
						value={inputValues.mediumHaulFlights}
						onChange={handleInputChange}
					/>
				</FormControl>
			</Flex>
			<Flex mt='2%'>
				<FormControl mr='2%'>
					<FormLabel htmlFor='longHaulFlights' fontWeight={'normal'}>
						Number of long-haul flights (more than 6h)
					</FormLabel>
					<Input
						id='longHaulFlights'
						placeholder='# of long-haul flights...'
						type='number'
						required
						value={inputValues.longHaulFlights}
						onChange={handleInputChange}
					/>
				</FormControl>
				<FormControl mr='2%'>
					<FormLabel htmlFor='percentageBusinessClass' fontWeight={'normal'}>
						Percentage business class flights
					</FormLabel>
					<Input
						id='percentageBusinessClass'
						placeholder='% business class flights ...'
						type='number'
						required
						value={inputValues.percentageBusinessClass}
						onChange={handleInputChange}
					/>
				</FormControl>
			</Flex>
		</div>
	)
}

export default forwardRef(Form2)
