import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { Heading, Flex, Input, FormControl, FormLabel } from '@chakra-ui/react'
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
		transported_weight: '',
		transported_distance: '',
		garbage: '',
		recycling: ''
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
				Energy & Material
			</Heading>
			<Flex mt='2%'>
				<FormControl mr='2%'>
					<FormLabel htmlFor='transported_weight' fontWeight={'normal'}>
					Transported weight (Ton)
					</FormLabel>
					<Input
						id='transported_weight'
						placeholder='Transported weight ...'
						type='number'
						required
						value={inputValues.transported_weight}
						onChange={handleInputChange}
					/>
				</FormControl>
				<FormControl mr='2%'>
					<FormLabel htmlFor='transported_distance' fontWeight={'normal'}>
					Average distance
					</FormLabel>
					<Input
						id='transported_distance'
						placeholder='Average distance ...'
						type='number'
						required
						value={inputValues.transported_distance}
						onChange={handleInputChange}
					/>
				</FormControl>
			</Flex>
			<Flex mt='2%'>
				<FormControl mr='2%'>
					<FormLabel htmlFor='garbage' fontWeight={'normal'}>
					Residual waste (Kg)
					</FormLabel>
					<Input
						id='garbage'
						placeholder='Residual waste ...'
						type='number'
						required
						value={inputValues.garbage}
						onChange={handleInputChange}
					/>
				</FormControl>
				<FormControl mr='2%'>
					<FormLabel htmlFor='recycling' fontWeight={'normal'}>
					Recycling (Kg)
					</FormLabel>
					<Input
						id='recycling'
						placeholder='Recycling ...'
						type='number'
						required
						value={inputValues.recycling}
						onChange={handleInputChange}
					/>
				</FormControl>
			</Flex>
		</div>
	)
}

export default forwardRef(Form6)
