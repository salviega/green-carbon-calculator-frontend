import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { Heading, Flex, Input, FormControl, FormLabel, Spinner, Text } from '@chakra-ui/react'
export interface Form6Input {
	transported_weight: string
	transported_distance: string
	garbage: string
	recycling: string
}
interface Form6Props {
	onValidationComplete: (info: Form6Input) => void // Define the prop type
	loading: boolean
}
export interface Form6Ref {
	validateAndSubmit: (callback: () => void) => void
}
const Form6: React.ForwardRefRenderFunction<Form6Ref, Form6Props> = (
	{ onValidationComplete, loading },
	ref
) => {
	const [inputValues, setInputValues] = useState<Form6Input>({
		transported_weight: '0',
		transported_distance: '0',
		garbage: '0',
		recycling: '0',
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
			<Heading w='100%' textColor="gray.600" fontWeight='medium' fontSize='xl' mb='2%'>
				Energy & Material
			</Heading>
			{loading && (
				<Flex align='center' justify='center' direction='column' mt='4'>
					<Spinner color='blue.500' size='xl' mb='2' />
					<Text fontSize='lg'>Loading new calculation...</Text>
				</Flex>
			)}
			<Flex mt='2%'>
				<FormControl mr='2%'>
					<FormLabel htmlFor='transported_weight' textColor="gray.500" fontWeight='medium' fontSize='md'>
					Transported weight (Ton)
					</FormLabel>
					<Input
						id='transported_weight'
						placeholder='Transported weight ...'
						type='number'
						required
						value={inputValues.transported_weight}
						onChange={handleInputChange}
                      textColor="gray.600"
          focusBorderColor="brand.dark"
						disabled={loading}
					/>
				</FormControl>
				<FormControl mr='2%'>
					<FormLabel htmlFor='transported_distance' textColor="gray.500" fontWeight='medium' fontSize='md'>
					Average distance (Km)
					</FormLabel>
					<Input
						id='transported_distance'
						placeholder='Average distance ...'
						type='number'
						required
						value={inputValues.transported_distance}
						onChange={handleInputChange}
                      textColor="gray.600"
          focusBorderColor="brand.dark"
						disabled={loading}
					/>
				</FormControl>
			</Flex>
			<Flex mt='2%'>
				<FormControl mr='2%'>
					<FormLabel htmlFor='garbage' textColor="gray.500" fontWeight='medium' fontSize='md'>
					Residual waste (Kg)
					</FormLabel>
					<Input
						id='garbage'
						placeholder='Residual waste ...'
						type='number'
						required
						value={inputValues.garbage}
						onChange={handleInputChange}
                      textColor="gray.600"
          focusBorderColor="brand.dark"
						disabled={loading}
					/>
				</FormControl>
				<FormControl mr='2%'>
					<FormLabel htmlFor='recycling' textColor="gray.500" fontWeight='medium' fontSize='md'>
					Recycling (Kg)
					</FormLabel>
					<Input
						id='recycling'
						placeholder='Recycling ...'
						type='number'
						required
						value={inputValues.recycling}
						onChange={handleInputChange}
                      textColor="gray.600"
          focusBorderColor="brand.dark"
						disabled={loading}
					/>
				</FormControl>
			</Flex>
		</div>
	)
}

export default forwardRef(Form6)
