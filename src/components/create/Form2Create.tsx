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
import countriesData from '../../pages/calculator/countries.json'
import { CountryData } from '../calculator/Form1'
export interface Form2CreateInput {
	responsableName: string
	projectCountry: string
	webpage?: string
	twitter?: string
	youtube?: string
	linkedin?: string
}
interface Form2CreateProps {
	onValidationComplete: (info: Form2CreateInput) => void // Define the prop type
}
export interface Form2CreateRef {
	validateAndSubmit: (callback: () => void) => void
}
const Form2Create: React.ForwardRefRenderFunction<Form2CreateRef, Form2CreateProps> = (
	{ onValidationComplete },
	ref
) => {
	const [countries, setCountries] = useState<CountryData[]>(
		countriesData.countries
	)
	const [inputValues, setInputValues] = useState<Form2CreateInput>({
		responsableName: '',
		projectCountry: '',
		webpage: '',
		twitter: '',
		youtube: '',
		linkedin: '',
	})
	const [inputErrors, setInputErrors] = useState<Form2CreateInput>({
		responsableName: '',
		projectCountry: '',
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
		console.log(inputValues);
		
		let hasErrors = false
		const newErrors: Form2CreateInput = {
			responsableName: '',
			projectCountry: '',
		}
		Object.keys(inputValues).forEach(key => {
			if (!inputValues[key as keyof Form2CreateInput]) {
				newErrors[key as keyof Form2CreateInput] = 'Field is required'
				hasErrors = true
			}
		})
		setInputErrors(newErrors)
		if (!hasErrors) {
			onValidationComplete(inputValues);
			callback();
		}
	}
	useImperativeHandle(ref, () => ({
		validateAndSubmit: validateAndSubmit // Expose the function through the ref
	}))
	return (
		<div>
			<Heading w='100%' textAlign={'center'} fontWeight='normal' mb='2%'>
				Author(s)
			</Heading>
			<FormControl mt='2%' isRequired isInvalid={!!inputErrors.responsableName}>
				<FormLabel htmlFor='responsableName' fontWeight={'normal'}>
					Main Responsable Name (or handle)
				</FormLabel>
				<Input
					id='responsableName'
					placeholder='Main responsable ...'
					type='text'
					maxLength={70}
					required
					value={inputValues.responsableName}
					onChange={handleInputChange}
				/>
				<FormErrorMessage>{inputErrors.responsableName}</FormErrorMessage>
			</FormControl>
			<FormControl mt='2%' isRequired isInvalid={!!inputErrors.projectCountry}>
					<FormLabel htmlFor='projectCountry' fontWeight={'normal'}>
						Country where the group is based
					</FormLabel>
					<Select
						id='projectCountry'
						name='projectCountry'
						autoComplete='country'
						placeholder='Pick country'
						w='full'
						rounded='md'
						value={inputValues.projectCountry}
						onChange={handleCountryChange}
					>
						{countries.map((country, index) => (
							<option value={country.name} key={index + country.name}>
								{country.name}
							</option>
						))}
					</Select>
					<FormErrorMessage>{inputErrors.projectCountry}</FormErrorMessage>
				</FormControl>
			<Flex mt='2%'>
				<FormControl mr='2%'>
					<FormLabel htmlFor='webpage' fontWeight={'normal'}>
						Project Webpage URL
					</FormLabel>
					<Input
						id='webpage'
						placeholder='Web site ...'
						type='text'
						maxLength={120}
						required
						value={inputValues.webpage}
						onChange={handleInputChange}
					/>
				</FormControl>
				<FormControl mr='2%'>
					<FormLabel htmlFor='twitter' fontWeight={'normal'}>
						Project Twitter URL
					</FormLabel>
					<Input
						id='twitter'
						placeholder='Twitter ...'
						type='text'
						maxLength={120}
						required
						value={inputValues.twitter}
						onChange={handleInputChange}
					/>
				</FormControl>
			</Flex>
			<Flex mt='2%'>
				<FormControl mr='2%'>
					<FormLabel htmlFor='youtube' fontWeight={'normal'}>
						Project Youtube URL
					</FormLabel>
					<Input
						id='youtube'
						placeholder='Youtube ...'
						type='text'
						maxLength={120}
						required
						value={inputValues.youtube}
						onChange={handleInputChange}
					/>
				</FormControl>
				<FormControl mr='2%'>
					<FormLabel htmlFor='linkedin' fontWeight={'normal'}>
						Project LinkedIn URL
					</FormLabel>
					<Input
						id='linkedin'
						placeholder='Linkedin ...'
						type='text'
						maxLength={120}
						required
						value={inputValues.linkedin}
						onChange={handleInputChange}
					/>
				</FormControl>
			</Flex>
		</div>
	)
}

export default forwardRef(Form2Create)
