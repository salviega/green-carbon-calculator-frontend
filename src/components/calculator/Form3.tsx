import React, { forwardRef, useImperativeHandle, useState } from 'react'
import {
	Heading,
	Flex,
	Input,
	FormControl,
	FormLabel,
} from '@chakra-ui/react'
export interface Form3Input {
	overnight2_3Stars: string
	overnight4Stars: string
	overnight5Stars: string
}
interface Form3Props {
	onValidationComplete: (info: Form3Input) => void // Define the prop type
}
export interface Form3Ref {
	validateAndSubmit: (callback: () => void) => void
}
const Form3: React.ForwardRefRenderFunction<Form3Ref, Form3Props> = (
	{ onValidationComplete },
	ref
) => {
	const [inputValues, setInputValues] = useState<Form3Input>({
		overnight2_3Stars: '',
		overnight4Stars: '',
		overnight5Stars: '',
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
				Accommodation
			</Heading>
			<Flex mt='2%'>
				<FormControl mr='2%'>
					<FormLabel htmlFor='overnight2_3Stars' fontWeight={'normal'}>
						Number of overnight stays in 2-3 star hotels
					</FormLabel>
					<Input
						id='overnight2_3Stars'
						placeholder='Stays in 2-3 star hotels ...'
						type='number'
						required
						value={inputValues.overnight2_3Stars}
						onChange={handleInputChange}
					/>
				</FormControl>
				<FormControl mr='2%'>
					<FormLabel htmlFor='overnight4Stars' fontWeight={'normal'}>
						Number of overnight stays in 4 star hotels
					</FormLabel>
					<Input
						id='overnight4Stars'
						placeholder='Stays in 4 star hotels ...'
						type='number'
						required
						value={inputValues.overnight4Stars}
						onChange={handleInputChange}
					/>
				</FormControl>
			</Flex>
			<Flex mt='2%'>
				<FormControl mr='2%'>
					<FormLabel htmlFor='overnight5Stars' fontWeight={'normal'}>
						Number of overnight stays in 5 star hotels
					</FormLabel>
					<Input
						id='overnight5Stars'
						placeholder='Stays in 5 star hotels ...'
						type='number'
						required
						value={inputValues.overnight5Stars}
						onChange={handleInputChange}
					/>
				</FormControl>
				<FormControl mr='2%'>
				</FormControl>
			</Flex>
		</div>
	)
}

export default forwardRef(Form3)
