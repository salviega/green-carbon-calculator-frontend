import React, { forwardRef, useImperativeHandle, useState } from 'react'
import {
  Heading,
  Flex,
  Input,
  FormControl,
  FormLabel,
} from '@chakra-ui/react'
export interface Form2Input {
  peopleByCar: string
  distanceByCar: string
  peopleByPublicTransport: string
  distanceByPublicTransport: string
  shortHaulFlights: string
  mediumHaulFlights: string
  longHaulFlights: string
  percentageBusinessClass: string
}
interface Form2Props {
  onValidationComplete: (info: Form2Input) => void // Define the prop type
}
export interface Form2Ref {
  validateAndSubmit: (callback: () => void) => void
}
const Form2: React.ForwardRefRenderFunction<Form2Ref, Form2Props> = (
  { onValidationComplete },
  ref
) => {
  const [inputValues, setInputValues] = useState<Form2Input>({
    peopleByCar: '0',
    distanceByCar: '0',
    peopleByPublicTransport: '0',
    distanceByPublicTransport: '0',
    shortHaulFlights: '0',
    mediumHaulFlights: '0',
    longHaulFlights: '0',
    percentageBusinessClass: '0',
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
        Mobility
      </Heading>
      <Flex mt='2%'>
        <FormControl mr='2%'>
          <FormLabel htmlFor='peopleByCar' textColor="gray.500" fontWeight='medium' fontSize='md'>
            Number of people arriving by car
          </FormLabel>
          <Input
            id='peopleByCar'
            placeholder='People arriving by car ...'
            type='number'
            required
            value={inputValues.peopleByCar}
            onChange={handleInputChange}
            textColor="gray.600"
            focusBorderColor="brand.dark"
          />
        </FormControl>
        <FormControl mr='2%'>
          <FormLabel htmlFor='distanceByCar' textColor="gray.500" fontWeight='medium' fontSize='md'>
            Average distance travelled (car)
          </FormLabel>
          <Input
            id='distanceByCar'
            placeholder='Distance travelled ...'
            type='number'
            required
            value={inputValues.distanceByCar}
            onChange={handleInputChange}
            textColor="gray.600"
            focusBorderColor="brand.dark"
          />
        </FormControl>
      </Flex>
      <Flex mt='2%'>
        <FormControl mr='2%'>
          <FormLabel htmlFor='peopleByPublicTransport' textColor="gray.500" fontWeight='medium' fontSize='md'>
            # of persons travelling by public transport
          </FormLabel>
          <Input
            id='peopleByPublicTransport'
            placeholder='People arriving by public transport...'
            type='number'
            required
            value={inputValues.peopleByPublicTransport}
            onChange={handleInputChange}
            textColor="gray.600"
            focusBorderColor="brand.dark"
          />
        </FormControl>
        <FormControl mr='2%'>
          <FormLabel htmlFor='distanceByPublicTransport' textColor="gray.500" fontWeight='medium' fontSize='md'>
            Average distance travelled (public transport)
          </FormLabel>
          <Input
            id='distanceByPublicTransport'
            placeholder='Distance travelled by public transport ...'
            type='number'
            required
            value={inputValues.distanceByPublicTransport}
            onChange={handleInputChange}
            textColor="gray.600"
            focusBorderColor="brand.dark"
          />
        </FormControl>
      </Flex>
      <Flex mt='2%'>
        <FormControl mr='2%'>
          <FormLabel htmlFor='shortHaulFlights' textColor="gray.500" fontWeight='medium' fontSize='md'>
            Number of short-haul flights (up to 3h)
          </FormLabel>
          <Input
            id='shortHaulFlights'
            placeholder='# of short-haul flights...'
            type='number'
            required
            value={inputValues.shortHaulFlights}
            onChange={handleInputChange}
            textColor="gray.600"
            focusBorderColor="brand.dark"
          />
        </FormControl>
        <FormControl mr='2%'>
          <FormLabel htmlFor='mediumHaulFlights' textColor="gray.500" fontWeight='medium' fontSize='md'>
            Number of medium-haul flights (3-6h)
          </FormLabel>
          <Input
            id='mediumHaulFlights'
            placeholder='# of medium-haul flights ...'
            type='number'
            required
            value={inputValues.mediumHaulFlights}
            onChange={handleInputChange}
            textColor="gray.600"
            focusBorderColor="brand.dark"
          />
        </FormControl>
      </Flex>
      <Flex mt='2%'>
        <FormControl mr='2%'>
          <FormLabel htmlFor='longHaulFlights' textColor="gray.500" fontWeight='medium' fontSize='md'>
            Number of long-haul flights (more than 6h)
          </FormLabel>
          <Input
            id='longHaulFlights'
            placeholder='# of long-haul flights...'
            type='number'
            required
            value={inputValues.longHaulFlights}
            onChange={handleInputChange}
            textColor="gray.600"
            focusBorderColor="brand.dark"
          />
        </FormControl>
        <FormControl mr='2%'>
          <FormLabel htmlFor='percentageBusinessClass' textColor="gray.500" fontWeight='medium' fontSize='md'>
            Percentage business class flights
          </FormLabel>
          <Input
            id='percentageBusinessClass'
            placeholder='% business class flights ...'
            type='number'
            required
            value={inputValues.percentageBusinessClass}
            onChange={handleInputChange}
            textColor="gray.600"
            focusBorderColor="brand.dark"
          />
        </FormControl>
      </Flex>
    </div>
  )
}

export default forwardRef(Form2)
