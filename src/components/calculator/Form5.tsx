import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { Heading, Flex, Input, FormControl, FormLabel } from '@chakra-ui/react'
export interface Form5Input {
	power_consumption: string
	printed_matter: string
	plastics: string
	recyclable_material: string
	plant_based_materials: string
	event_stand_area: string
}
interface Form5Props {
	onValidationComplete: (info: Form5Input) => void // Define the prop type
}
export interface Form5Ref {
	validateAndSubmit: (callback: () => void) => void
}
const Form5: React.ForwardRefRenderFunction<Form5Ref, Form5Props> = (
	{ onValidationComplete },
	ref
) => {
	const [inputValues, setInputValues] = useState<Form5Input>({
		power_consumption: '',
		printed_matter: '',
		plastics: '',
		recyclable_material: '',
		plant_based_materials: '',
		event_stand_area: ''
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
					<FormLabel htmlFor='power_consumption' fontWeight={'normal'}>
						Power consumption (kWh)
					</FormLabel>
					<Input
						id='power_consumption'
						placeholder='Power consumption ...'
						type='number'
						required
						value={inputValues.power_consumption}
						onChange={handleInputChange}
					/>
				</FormControl>
				<FormControl mr='2%'>
					<FormLabel htmlFor='printed_matter' fontWeight={'normal'}>
						Printed matter (Kg)
					</FormLabel>
					<Input
						id='printed_matter'
						placeholder='Printed matter ...'
						type='number'
						required
						value={inputValues.printed_matter}
						onChange={handleInputChange}
					/>
				</FormControl>
			</Flex>
			<Flex mt='2%'>
				<FormControl mr='2%'>
					<FormLabel htmlFor='plastics' fontWeight={'normal'}>
					Plastics (Kg)
					</FormLabel>
					<Input
						id='plastics'
						placeholder='Plastics ...'
						type='number'
						required
						value={inputValues.plastics}
						onChange={handleInputChange}
					/>
				</FormControl>
				<FormControl mr='2%'>
					<FormLabel htmlFor='recyclable_material' fontWeight={'normal'}>
						Recyclable material (Kg)
					</FormLabel>
					<Input
						id='recyclable_material'
						placeholder='Recyclable material ...'
						type='number'
						required
						value={inputValues.recyclable_material}
						onChange={handleInputChange}
					/>
				</FormControl>
			</Flex>
			<Flex mt='2%'>
				<FormControl mr='2%'>
					<FormLabel htmlFor='plant_based_materials' fontWeight={'normal'}>
					Wood, carton, paper and plant-based materials (Kg)
					</FormLabel>
					<Input
						id='plant_based_materials'
						placeholder='Wood, carton, paper and plant-based ...'
						type='number'
						required
						value={inputValues.plant_based_materials}
						onChange={handleInputChange}
					/>
				</FormControl>
				<FormControl mr='2%'>
					<FormLabel htmlFor='event_stand_area' fontWeight={'normal'}>
					Area of the stand (m2)
					</FormLabel>
					<Input
						mt='6.5%'
						id='event_stand_area'
						placeholder='Area of the stand ...'
						type='number'
						required
						value={inputValues.event_stand_area}
						onChange={handleInputChange}
					/>
				</FormControl>
			</Flex>
		</div>
	)
}

export default forwardRef(Form5)
