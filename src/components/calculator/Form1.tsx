import React, { ChangeEvent, forwardRef, useImperativeHandle, useState } from 'react'
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
export interface Form1Input {
  eventName: string
  eventDescription: string
  duration: string
  country: string
  participants: string
  employees: string
  heatedArea: string
  airConditionedArea: string
}
interface Form1Props {
  onValidationComplete: (info: Form1Input) => void // Define the prop type
}
export interface Form1Ref {
  validateAndSubmit: (callback: () => void) => void
}
export interface CountryData {
  name: string
  flag: string
}
const Form1: React.ForwardRefRenderFunction<Form1Ref, Form1Props> = (
  { onValidationComplete },
  ref
) => {
  const [countries, setCountries] = useState<CountryData[]>(
    countriesData.countries
  )
  const [inputValues, setInputValues] = useState<Form1Input>({
    eventName: '',
    eventDescription: '',
    duration: '',
    country: '',
    participants: '',
    employees: '',
    heatedArea: '0',
    airConditionedArea: '0'
  })
  const [inputErrors, setInputErrors] = useState<Form1Input>({
    eventName: '',
    eventDescription: '',
    duration: '',
    country: '',
    participants: '',
    employees: '',
    heatedArea: '',
    airConditionedArea: ''
  })
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setInputValues(prevValues => ({ ...prevValues, [id]: value }))
  }
  const handleCountryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { id, value } = e.target
    setInputValues(prevValues => ({ ...prevValues, [id]: value }))
  }
  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setInputValues(prevValues => ({ ...prevValues, [id]: value }))
  }
  const validateAndSubmit = (callback: () => void) => {
    let hasErrors = false
    const newErrors: Form1Input = {
      eventName: '',
      eventDescription: '',
      duration: '',
      country: '',
      participants: '',
      employees: '',
      heatedArea: '',
      airConditionedArea: ''
    }
    const mandatoryFields = [
      'eventName',
      'duration',
      'country',
      'participants',
      'employees'
    ]
    mandatoryFields.forEach(key => {
      if (!inputValues[key as keyof Form1Input]) {
        newErrors[key as keyof Form1Input] = 'Field is required'
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
      <Heading w='100%' textColor="gray.600" fontWeight='medium' fontSize='xl' mb='2%'>
        General
      </Heading>
      <FormControl mt='2%' isRequired isInvalid={!!inputErrors.eventName}>
        <FormLabel htmlFor='eventName' textColor="gray.500" fontWeight='medium' fontSize='md'>
          Event Name
        </FormLabel>
        <Input
          id='eventName'
          type='text'
          maxLength={70}
          required
          value={inputValues.eventName}
          onChange={handleInputChange}
          textColor="gray.600"
          focusBorderColor="brand.dark"
        />
      </FormControl>
      <FormControl
        id='eventDescription'
        mt='2%'
      >
        <FormLabel
          fontSize='md'
          textColor="gray.500" fontWeight='medium'
        >
          Event Description
        </FormLabel>
        <Textarea
          id='eventDescription'
          placeholder='Brief description for your event.'
          rows={3}
          shadow='sm'
          fontSize={{
            sm: 'sm'
          }}
          maxLength={254}
          required
          value={inputValues.eventDescription}
          onChange={handleTextAreaChange}
          textColor="gray.600"
          resize="none"
          focusBorderColor="brand.dark"
        />
      </FormControl>
      <Flex mt='2%' flexDirection={{base:"column", md:'row'}}>
        <FormControl mr='2%' isRequired isInvalid={!!inputErrors.duration}>
          <FormLabel htmlFor='duration' textColor="gray.500" fontWeight='medium' fontSize='md'>
            Duration (Days)
          </FormLabel>
          <Input
            id='duration'
            placeholder='Duration ...'
            type='number'
            required
            value={inputValues.duration}
            onChange={handleInputChange}
            textColor="gray.600"
            focusBorderColor="brand.dark"
          />
          <FormErrorMessage>{inputErrors.duration}</FormErrorMessage>
        </FormControl>
        <FormControl isRequired isInvalid={!!inputErrors.country}>
          <FormLabel htmlFor='country' textColor="gray.500" fontWeight='medium' fontSize='md'>
            Country
          </FormLabel>
          <Select
            id='country'
            name='country'
            autoComplete='country'
            placeholder='Pick country'
            w='full'
            rounded='md'
            value={inputValues.country}
            onChange={handleCountryChange}
            textColor="gray.600"
            focusBorderColor="brand.dark"
          >
            {countries.map((country, index) => (
              <option value={country.name} key={index + country.name}>
                {country.name}
              </option>
            ))}
          </Select>
          <FormErrorMessage>{inputErrors.country}</FormErrorMessage>
        </FormControl>
      </Flex>
      <Flex mt='2%' flexDirection={{base:"column", md:'row'}}>
        <FormControl mr='2%' isRequired isInvalid={!!inputErrors.participants}>
          <FormLabel htmlFor='participants' textColor="gray.500" fontWeight='medium' fontSize='md'>
            Number Of Participants
          </FormLabel>
          <Input
            id='participants'
            placeholder='# Participants ...'
            type='number'
            required
            value={inputValues.participants}
            onChange={handleInputChange}
            textColor="gray.600"
            focusBorderColor="brand.dark"
          />
          <FormErrorMessage>{inputErrors.participants}</FormErrorMessage>
        </FormControl>
        <FormControl isRequired isInvalid={!!inputErrors.employees}>
          <FormLabel htmlFor='employees' textColor="gray.500" fontWeight='medium' fontSize='md'>
            Number Of Employees
          </FormLabel>
          <Input
            id='employees'
            placeholder='# Employees ...'
            type='number'
            required
            value={inputValues.employees}
            onChange={handleInputChange}
            textColor="gray.600"
            focusBorderColor="brand.dark"
          />
          <FormErrorMessage>{inputErrors.employees}</FormErrorMessage>
        </FormControl>
      </Flex>
      <Flex mt='2%' flexDirection={{base:"column", md:'row'}}>
        <FormControl mr='2%'>
          <FormLabel htmlFor='heatedArea' textColor="gray.500" fontWeight='medium' fontSize='md'>
            Heated area (m2)
          </FormLabel>
          <Input
            id='heatedArea'
            placeholder='Area ...'
            type='number'
            value={inputValues.heatedArea}
            onChange={handleInputChange}
            textColor="gray.600"
            focusBorderColor="brand.dark"
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor='airConditionedArea' textColor="gray.500" fontWeight='medium' fontSize='md'>
            Air conditioned area (m2)
          </FormLabel>
          <Input
            id='airConditionedArea'
            placeholder='# Air conditioned ...'
            type='number'
            value={inputValues.airConditionedArea}
            onChange={handleInputChange}
            textColor="gray.600"
            focusBorderColor="brand.dark"
          />
        </FormControl>
      </Flex>
    </div>
  )
}

export default forwardRef(Form1)
