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
	projectUrl?: string
	projectCountry: string
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
		projectUrl: '',
		projectCountry: '',
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
				Author(s)
			</Heading>
			<FormControl mt='2%' isRequired isInvalid={!!inputErrors.responsableName}>
				<FormLabel htmlFor='responsableName' fontWeight={'normal'}>
					Responsable Name
				</FormLabel>
				<Input
					id='responsableName'
					type='text'
					maxLength={70}
					required
					value={inputValues.responsableName}
					onChange={handleInputChange}
				/>
				<FormErrorMessage>{inputErrors.responsableName}</FormErrorMessage>
			</FormControl>
			<Flex mt='2%'>
				<FormControl mr='2%'>
					<FormLabel htmlFor='projectUrl' fontWeight={'normal'}>
						Project URL
					</FormLabel>
					<Input
						id='projectUrl'
						placeholder='Duration ...'
						type='number'
						required
						value={inputValues.projectUrl}
						onChange={handleInputChange}
					/>
				</FormControl>
				<FormControl isRequired isInvalid={!!inputErrors.projectCountry}>
					<FormLabel htmlFor='projectCountry' fontWeight={'normal'}>
						Group country is based
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
			</Flex>
		</div>
	)
}

export default forwardRef(Form2Create)
