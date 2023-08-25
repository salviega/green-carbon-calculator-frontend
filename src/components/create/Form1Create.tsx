import React, { forwardRef, useImperativeHandle, useState } from 'react'
import {
	Heading,
	Flex,
	Input,
	Select,
	FormControl,
	FormLabel,
	FormErrorMessage,
	Textarea,
	FormHelperText
} from '@chakra-ui/react'
import countriesData from '../../pages/calculator/countries.json'
export interface Form1CreateInput {
	proyectName: string
	proyectDescription: string
	category: string
	members: string
}
interface Form1CreateProps {
	onValidationComplete: (info: Form1CreateInput) => void // Define the prop type
}
export interface Form1CreateRef {
	validateAndSubmit: (callback: () => void) => void
}
const Form1Create: React.ForwardRefRenderFunction<
	Form1CreateRef,
	Form1CreateProps
> = ({ onValidationComplete }, ref) => {
	const [inputValues, setInputValues] = useState<Form1CreateInput>({
		proyectName: '',
		proyectDescription: '',
		members: '',
		category: '',
	})
	const [inputErrors, setInputErrors] = useState<Form1CreateInput>({
		proyectName: '',
		proyectDescription: '',
		members: '',
		category: '',
	})
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { id, value } = e.target
		setInputValues(prevValues => ({ ...prevValues, [id]: value }))
	}
	const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const { id, value } = e.target
		setInputValues(prevValues => ({ ...prevValues, [id]: value }))
	}
	const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const { id, value } = e.target
		setInputValues(prevValues => ({ ...prevValues, [id]: value }))
	}
	const validateAndSubmit = (callback: () => void) => {
		let hasErrors = false
		const newErrors: Form1CreateInput = {
			proyectName: '',
			proyectDescription: '',
			members: '',
			category: '',
		}
		Object.keys(inputValues).forEach(key => {
			if (!inputValues[key as keyof Form1CreateInput]) {
				newErrors[key as keyof Form1CreateInput] = 'Field is required'
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
				General
			</Heading>
			<FormControl mt='2%' isRequired isInvalid={!!inputErrors.proyectName}>
				<FormLabel htmlFor='proyectName' fontWeight={'normal'}>
					Project Name
				</FormLabel>
				<Input
					id='proyectName'
					type='text'
					maxLength={70}
					required
					value={inputValues.proyectName}
					onChange={handleInputChange}
				/>
				<FormErrorMessage>{inputErrors.proyectName}</FormErrorMessage>
			</FormControl>
			<FormControl
				id='proyectDescription'
				mt='2%'
				isRequired
				isInvalid={!!inputErrors.proyectDescription}
			>
				<FormLabel
					fontSize='sm'
					fontWeight='md'
					color='gray.700'
					_dark={{
						color: 'gray.50'
					}}
				>
					Project Description
				</FormLabel>
				<Textarea
					id='proyectDescription'
					placeholder='Description ...'
					rows={3}
					shadow='sm'
					fontSize={{
						sm: 'sm'
					}}
					maxLength={254}
					required
					value={inputValues.proyectDescription}
					onChange={handleTextAreaChange}
				/>
				<FormHelperText>Brief description for your project.</FormHelperText>
				<FormErrorMessage>{inputErrors.proyectDescription}</FormErrorMessage>
			</FormControl>
			<Flex mt='2%'>
				<FormControl isRequired isInvalid={!!inputErrors.category} mr='2%'>
					<FormLabel htmlFor='category' fontWeight={'normal'}>
						Project Category
					</FormLabel>
					<Select
						id='category'
						name='category'
						autoComplete='category'
						placeholder='Pick category'
						w='full'
						rounded='md'
						value={inputValues.category}
						onChange={handleSelectChange}
					>
						<option value={'publicGoods'}>{'Public Goods'}</option>
						<option value={'refi'}>{'reFi'}</option>
						<option value={'defi'}>{'deFi'}</option>
						<option value={'education'}>{'Education'}</option>
						<option value={'dao'}>{'DAO'}</option>
						<option value={'nft'}>{'NFTs'}</option>
					</Select>
					<FormErrorMessage>{inputErrors.category}</FormErrorMessage>
				</FormControl>
				<FormControl isRequired isInvalid={!!inputErrors.members}>
					<FormLabel htmlFor='members' fontWeight={'normal'}>
						# of Proyect Members
					</FormLabel>
					<Select
						id='members'
						name='members'
						autoComplete='members'
						placeholder='Pick members number'
						w='full'
						rounded='md'
						value={inputValues.members}
						onChange={handleSelectChange}
					>
						<option value={'0-10'}>{'0-10'}</option>
						<option value={'10-50'}>{'10-50'}</option>
						<option value={'50-100'}>{'50-100'}</option>
					</Select>
					<FormErrorMessage>{inputErrors.members}</FormErrorMessage>
				</FormControl>
			</Flex>
		</div>
	)
}

export default forwardRef(Form1Create)
