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
export interface Form1Input {
	eventName: string
	duration: string
	country: string
	participants: string
	employees: string
	heatedArea?: string
	airConditionedArea?: string
}
interface Form1Props {
	onValidationComplete: (info: Form1Input) => void // Define the prop type
}
export interface Form1Ref {
	validateAndSubmit: (callback: () => void) => void
}
const Form1: React.ForwardRefRenderFunction<Form1Ref, Form1Props> = (
	{ onValidationComplete },
	ref
) => {
	const [inputValues, setInputValues] = useState<Form1Input>({
		eventName: '',
		duration: '',
		country: '',
		participants: '',
		employees: '',
		heatedArea: '0',
		airConditionedArea: '0'
	})
	const [inputErrors, setInputErrors] = useState<Form1Input>({
		eventName: '',
		duration: '',
		country: '',
		participants: '',
		employees: ''
	})
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { id, value } = e.target
		setInputValues(prevValues => ({ ...prevValues, [id]: value }))
	}
	const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const { id, value } = e.target
		setInputValues(prevValues => ({ ...prevValues, [id]: value }))
	}
	const validateAndSubmit = (callback: () => void) => {
		let hasErrors = false
		const newErrors: Form1Input = {
			eventName: '',
			duration: '',
			country: '',
			participants: '',
			employees: ''
		}
		Object.keys(inputValues).forEach(key => {
			if (!inputValues[key as keyof Form1Input]) {
				newErrors[key as keyof Form1Input] = 'Field is required'
				hasErrors = true
			}
		})
		setInputErrors(newErrors);
		if (!hasErrors) {
			onValidationComplete(inputValues)
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
			<FormControl mt='2%' isRequired isInvalid={!!inputErrors.eventName}>
				<FormLabel htmlFor='eventName' fontWeight={'normal'}>
					Event Name
				</FormLabel>
				<Input
					id='eventName'
					type='text'
					maxLength={70}
					required
					value={inputValues.eventName}
					onChange={handleInputChange}
				/>
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
				<FormControl isRequired isInvalid={!!inputErrors.country}>
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
						value={inputValues.country}
						onChange={handleCountryChange}
					>
						<option value={'col'}>Category 1</option>
						<option value={'ven'}>Category 2</option>
						<option value={'arg'}>Category 3</option>
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
