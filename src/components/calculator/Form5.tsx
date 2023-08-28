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
    power_consumption: '0',
    printed_matter: '0',
    plastics: '0',
    recyclable_material: '0',
    plant_based_materials: '0',
    event_stand_area: '0',
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
      <Flex mt='2%' flexDirection={{base:"column", md:'row'}}>
        <FormControl mr='2%'>
          <FormLabel htmlFor='power_consumption' textColor="gray.500" fontWeight='medium' fontSize='md'>
            Power consumption (kWh)
          </FormLabel>
          <Input
            id='power_consumption'
            placeholder='Power consumption ...'
            type='number'
            required
            value={inputValues.power_consumption}
            onChange={handleInputChange}
            textColor="gray.600"
            focusBorderColor="brand.dark" />
        </FormControl>
        <FormControl mr='2%'>
          <FormLabel htmlFor='printed_matter' textColor="gray.500" fontWeight='medium' fontSize='md'>
            Printed matter (Kg)
          </FormLabel>
          <Input
            id='printed_matter'
            placeholder='Printed matter ...'
            type='number'
            required
            value={inputValues.printed_matter}
            onChange={handleInputChange}
            textColor="gray.600"
            focusBorderColor="brand.dark" />
        </FormControl>
      </Flex>
      <Flex mt='2%' flexDirection={{base:"column", md:'row'}}>
        <FormControl mr='2%'>
          <FormLabel htmlFor='plastics' textColor="gray.500" fontWeight='medium' fontSize='md'>
            Plastics (Kg)
          </FormLabel>
          <Input
            id='plastics'
            placeholder='Plastics ...'
            type='number'
            required
            value={inputValues.plastics}
            onChange={handleInputChange}
            textColor="gray.600"
            focusBorderColor="brand.dark" />
        </FormControl>
        <FormControl mr='2%'>
          <FormLabel htmlFor='recyclable_material' textColor="gray.500" fontWeight='medium' fontSize='md'>
            Recyclable material (Kg)
          </FormLabel>
          <Input
            id='recyclable_material'
            placeholder='Recyclable material ...'
            type='number'
            required
            value={inputValues.recyclable_material}
            onChange={handleInputChange}
            textColor="gray.600"
            focusBorderColor="brand.dark" />
        </FormControl>
      </Flex>
      <Flex mt='2%' flexDirection={{base:"column", md:'row'}}>
        <FormControl mr='2%'>
          <FormLabel htmlFor='plant_based_materials' textColor="gray.500" fontWeight='medium' fontSize='md'>
            Wood, carton, paper and plant-based materials (Kg)
          </FormLabel>
          <Input
            id='plant_based_materials'
            placeholder='Wood, carton, paper and plant-based ...'
            type='number'
            required
            value={inputValues.plant_based_materials}
            onChange={handleInputChange}
            textColor="gray.600"
            focusBorderColor="brand.dark" />
        </FormControl>
        <FormControl mr='2%'>
          <FormLabel htmlFor='event_stand_area' textColor="gray.500" fontWeight='medium' fontSize='md'>
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
            textColor="gray.600"
            focusBorderColor="brand.dark" />
        </FormControl>
      </Flex>
    </div>
  )
}

export default forwardRef(Form5)
