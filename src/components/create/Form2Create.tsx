import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { getAccount } from '@wagmi/core'
import {
	Heading,
	Flex,
	Input,
	Select,
	FormControl,
	FormLabel,
	FormErrorMessage,
	Spinner,
	Text
} from '@chakra-ui/react'
import countriesData from '../../assets/json/countries.json'
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
	loading: boolean
}
export interface Form2CreateRef {
	validateAndSubmit: (callback: () => void) => void
}
const Form2Create: React.ForwardRefRenderFunction<
	Form2CreateRef,
	Form2CreateProps
> = ({ onValidationComplete, loading }, ref) => {
	const account = getAccount()
	const [countries, setCountries] = useState<CountryData[]>(
		countriesData.countries
	)
	const [inputValues, setInputValues] = useState<Form2CreateInput>({
		responsableName: '',
		projectCountry: '',
		webpage: '',
		twitter: '',
		youtube: '',
		linkedin: ''
	})
	const [inputErrors, setInputErrors] = useState<Form2CreateInput>({
		responsableName: '',
		projectCountry: ''
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
			projectCountry: ''
		}
		const mandatoryFields = ['responsableName', 'projectCountry']
		mandatoryFields.forEach(key => {
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
			<Heading
				w='100%'
				textColor='gray.600'
				fontWeight='medium'
				fontSize='xl'
				mb='2%'
			>
				Author(s)
			</Heading>
			{loading && (
				<Flex
					align='center'
					textColor='gray.600'
					fontWeight='medium'
					fontSize='xl'
					mb='2%'
				>
					<Spinner color='brand.dark' size='xl' mb='2' />
					<Text fontSize='lg' textColor='gray.500' fontWeight='medium'>
						Loading new project...
					</Text>
				</Flex>
			)}
			<FormControl mt='2%' isRequired isInvalid={!!inputErrors.responsableName}>
				<FormLabel
					htmlFor='responsableName'
					textColor='gray.500'
					fontWeight='medium'
					fontSize='md'
				>
					Project Representative (Name/ENS)
				</FormLabel>
				<Input
					disabled={loading}
					id='responsableName'
					placeholder='Project representative ...'
					type='text'
					maxLength={70}
					required
					value={inputValues.responsableName}
					onChange={handleInputChange}
					textColor='gray.600'
					focusBorderColor='brand.dark'
				/>
				<FormErrorMessage>{inputErrors.responsableName}</FormErrorMessage>
			</FormControl>
			<FormControl mt='2%'>
				<FormLabel
					htmlFor='wallet'
					textColor='gray.500'
					fontWeight='medium'
					fontSize='md'
				>
					Representative Wallet
				</FormLabel>
				<Input
					disabled={true}
					id='wallet'
					placeholder='No wallet connected ...'
					type='text'
					required
					value={account.address}
					onChange={handleInputChange}
					textColor='gray.600'
					focusBorderColor='brand.dark'
				/>
				<FormErrorMessage>{inputErrors.responsableName}</FormErrorMessage>
			</FormControl>
			<FormControl mt='2%' isRequired isInvalid={!!inputErrors.projectCountry}>
				<FormLabel
					htmlFor='projectCountry'
					textColor='gray.500'
					fontWeight='medium'
					fontSize='md'
				>
					Base Country
				</FormLabel>
				<Select
					disabled={loading}
					id='projectCountry'
					name='projectCountry'
					autoComplete='country'
					placeholder='Pick country'
					w='full'
					rounded='md'
					value={inputValues.projectCountry}
					onChange={handleCountryChange}
					textColor='gray.600'
					focusBorderColor='brand.dark'
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
					<FormLabel
						htmlFor='webpage'
						textColor='gray.500'
						fontWeight='medium'
						fontSize='md'
					>
						Project Webpage URL
					</FormLabel>
					<Input
						disabled={loading}
						id='webpage'
						placeholder='Web site ...'
						type='text'
						maxLength={120}
						required
						value={inputValues.webpage}
						onChange={handleInputChange}
						textColor='gray.600'
						focusBorderColor='brand.dark'
					/>
				</FormControl>
				<FormControl mr='2%'>
					<FormLabel
						htmlFor='twitter'
						textColor='gray.500'
						fontWeight='medium'
						fontSize='md'
					>
						Project Twitter URL
					</FormLabel>
					<Input
						disabled={loading}
						id='twitter'
						placeholder='Twitter ...'
						type='text'
						maxLength={120}
						required
						value={inputValues.twitter}
						onChange={handleInputChange}
						textColor='gray.600'
						focusBorderColor='brand.dark'
					/>
				</FormControl>
			</Flex>
			<Flex mt='2%'>
				<FormControl mr='2%'>
					<FormLabel
						htmlFor='youtube'
						textColor='gray.500'
						fontWeight='medium'
						fontSize='md'
					>
						Project Youtube URL
					</FormLabel>
					<Input
						disabled={loading}
						id='youtube'
						placeholder='Youtube ...'
						type='text'
						maxLength={120}
						required
						value={inputValues.youtube}
						onChange={handleInputChange}
						textColor='gray.600'
						focusBorderColor='brand.dark'
					/>
				</FormControl>
				<FormControl mr='2%'>
					<FormLabel
						htmlFor='linkedin'
						textColor='gray.500'
						fontWeight='medium'
						fontSize='md'
					>
						Project LinkedIn URL
					</FormLabel>
					<Input
						disabled={loading}
						id='linkedin'
						placeholder='Linkedin ...'
						type='text'
						maxLength={120}
						required
						value={inputValues.linkedin}
						onChange={handleInputChange}
						textColor='gray.600'
						focusBorderColor='brand.dark'
					/>
				</FormControl>
			</Flex>
		</div>
	)
}

export default forwardRef(Form2Create)
