import React, { forwardRef, useImperativeHandle, useState } from 'react'
import {
	Heading,
	Flex,
	Input,
	Select,
	FormControl,
	FormLabel,
	FormErrorMessage
} from '@chakra-ui/react'
interface Form1Input {
	duration: string
	// country: string
	participants: string
	employees: string
}
interface Form1Props {
	onValidationComplete: () => void // Define the prop type
}
export interface Form1Ref {
	validateAndSubmit: (callback: () => void) => void
}
const Form1: React.ForwardRefRenderFunction<Form1Ref, Form1Props> = (
	{ onValidationComplete },
	ref
) => {
	const [errorField, setErrorField] = useState('This field is required')
	const [inputValues, setInputValues] = useState({
		duration: '',
		// country: '',
		participants: '',
		employees: ''
	})
	const [inputErrors, setInputErrors] = useState<Form1Input>({
		duration: '',
		// country: '',
		participants: '',
		employees: ''
	})
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { id, value } = e.target
		setInputValues(prevValues => ({ ...prevValues, [id]: value }))
	}
	const validateAndSubmit = (callback: () => void) => {
		let hasErrors = false
		const newErrors: Form1Input = {
			duration: '',
			// country: '',
			participants: '',
			employees: ''
		}
		console.log('1')

		Object.keys(inputValues).forEach(key => {
			if (!inputValues[key as keyof Form1Input]) {
				newErrors[key as keyof Form1Input] = 'Field is required'
				hasErrors = true
			}
		})
		setInputErrors(newErrors)
		console.log('has errors', hasErrors)

		if (!hasErrors) {
			// Perform form submission or other actions
			console.log('No errors were submitted')

			callback()
		}
	}
	useImperativeHandle(ref, () => ({
		validateAndSubmit: validateAndSubmit // Expose the function through the ref
	}))
	return (
		<div>
			<Heading w='100%' textAlign={'center'} fontWeight='normal' mb='2%'>
				General
			</Heading>
			<FormControl mt='2%'>
				<FormLabel htmlFor='name' fontWeight={'normal'}>
					Event Name
				</FormLabel>
				<Input id='name' type='text' maxLength={70} />
			</FormControl>
			<Flex mt='2%'>
				<FormControl mr='2%' isRequired isInvalid={!!inputErrors.duration}>
					<FormLabel htmlFor='duration' fontWeight={'normal'}>
						Duration (Days)
					</FormLabel>
					<Input
						id='duration'
						placeholder='Duration ...'
						type='number'
						required
						value={inputValues.duration}
						onChange={handleInputChange}
					/>
					<FormErrorMessage>{inputErrors.duration}</FormErrorMessage>
				</FormControl>
				<FormControl>
					<FormLabel htmlFor='country' fontWeight={'normal'}>
						Country
					</FormLabel>
					<Select
						id='country'
						name='country'
						autoComplete='country'
						placeholder='Pick country'
						w='full'
						rounded='md'
					>
						<option>Category 1</option>
						<option>Category 2</option>
						<option>Category 3</option>
					</Select>
				</FormControl>
			</Flex>
			<Flex mt='2%'>
				<FormControl mr='2%' isRequired isInvalid={!!inputErrors.participants}>
					<FormLabel htmlFor='participants' fontWeight={'normal'}>
						Number Of Participants *
					</FormLabel>
					<Input
						id='participants'
						placeholder='# Participants ...'
						type='number'
						required
						value={inputValues.participants}
						onChange={handleInputChange}
					/>
				</FormControl>
				<FormControl isRequired isInvalid={!!inputErrors.employees}>
					<FormLabel htmlFor='employees' fontWeight={'normal'}>
						Number Of Employees
					</FormLabel>
					<Input
						id='employees'
						placeholder='# Employees ...'
						type='number'
						required
						value={inputValues.employees}
						onChange={handleInputChange}
					/>
				</FormControl>
			</Flex>
			<Flex mt='2%'>
				<FormControl mr='2%'>
					<FormLabel htmlFor='area' fontWeight={'normal'}>
						Heated area (m2)
					</FormLabel>
					<Input id='area' placeholder='Area ...' type='number' />
				</FormControl>
				<FormControl>
					<FormLabel htmlFor='ac_area' fontWeight={'normal'}>
						Air conditioned area (m2)
					</FormLabel>
					<Input
						id='ac_area'
						placeholder='# Air conditioned ...'
						type='number'
					/>
				</FormControl>
			</Flex>
		</div>
	)
}

export default forwardRef(Form1)
