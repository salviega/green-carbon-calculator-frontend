import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { Heading, Flex, Input, FormControl, FormLabel } from '@chakra-ui/react'
export interface Form4Input {
  meal_meat_amount: string
  meal_vegetarian_amount: string
  snacks_amount: string
  soda_liters: string
  coffee_cups: string
  tea_cups: string
  wine_liters: string
  beer_liters: string
  spirits_liters: string
}
interface Form4Props {
  onValidationComplete: (info: Form4Input) => void // Define the prop type
}
export interface Form4Ref {
  validateAndSubmit: (callback: () => void) => void
}
const Form4: React.ForwardRefRenderFunction<Form4Ref, Form4Props> = (
  { onValidationComplete },
  ref
) => {
  const [inputValues, setInputValues] = useState<Form4Input>({
    meal_meat_amount: '0',
    meal_vegetarian_amount: '0',
    snacks_amount: '0',
    soda_liters: '0',
    coffee_cups: '0',
    tea_cups: '0',
    wine_liters: '0',
    beer_liters: '0',
    spirits_liters: '0',
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
        Catering
      </Heading>
      <Flex mt='2%' flexDirection={{base:"column", md:'row'}}>
        <FormControl mr='2%'>
          <FormLabel htmlFor='meal_meat_amount' textColor="gray.500" fontWeight='medium' fontSize='md'>
            Amount of meals, not vegetarian
          </FormLabel>
          <Input
            id='meal_meat_amount'
            placeholder='Meals, not vegetarian ...'
            type='number'
            required
            value={inputValues.meal_meat_amount}
            onChange={handleInputChange}
            textColor="gray.600"
            focusBorderColor="brand.dark"
          />
        </FormControl>
        <FormControl mr='2%'>
          <FormLabel htmlFor='meal_vegetarian_amount' textColor="gray.500" fontWeight='medium' fontSize='md'>
            Amount of vegetarian meals
          </FormLabel>
          <Input
            id='meal_vegetarian_amount'
            placeholder='Vegetarian meals ...'
            type='number'
            required
            value={inputValues.meal_vegetarian_amount}
            onChange={handleInputChange}
            textColor="gray.600"
            focusBorderColor="brand.dark"
          />
        </FormControl>
      </Flex>
      <Flex mt='2%' flexDirection={{base:"column", md:'row'}}>
        <FormControl mr='2%'>
          <FormLabel htmlFor='snacks_amount' textColor="gray.500" fontWeight='medium' fontSize='md'>
            Amount of snacks
          </FormLabel>
          <Input
            id='snacks_amount'
            placeholder='Amount of snacks...'
            type='number'
            required
            value={inputValues.snacks_amount}
            onChange={handleInputChange}
            textColor="gray.600"
            focusBorderColor="brand.dark"
          />
        </FormControl>
        <FormControl mr='2%'>
          <FormLabel htmlFor='soda_liters' textColor="gray.500" fontWeight='medium' fontSize='md'>
            Water/Soft Drinks (Liters)
          </FormLabel>
          <Input
            id='soda_liters'
            placeholder='Water/Soft Drinks ...'
            type='number'
            required
            value={inputValues.soda_liters}
            onChange={handleInputChange}
            textColor="gray.600"
            focusBorderColor="brand.dark"
          />
        </FormControl>
      </Flex>
      <Flex mt='2%' flexDirection={{base:"column", md:'row'}}>
        <FormControl mr='2%'>
          <FormLabel htmlFor='coffee_cups' textColor="gray.500" fontWeight='medium' fontSize='md'>
            Coffee (Cups)
          </FormLabel>
          <Input
            id='coffee_cups'
            placeholder='Coffee...'
            type='number'
            required
            value={inputValues.coffee_cups}
            onChange={handleInputChange}
            textColor="gray.600"
            focusBorderColor="brand.dark"
          />
        </FormControl>
        <FormControl mr='2%'>
          <FormLabel htmlFor='tea_cups' textColor="gray.500" fontWeight='medium' fontSize='md'>
            Tea (Cups)
          </FormLabel>
          <Input
            id='tea_cups'
            placeholder='Water/Soft Drinks ...'
            type='number'
            required
            value={inputValues.tea_cups}
            onChange={handleInputChange}
            textColor="gray.600"
            focusBorderColor="brand.dark"
          />
        </FormControl>
      </Flex>
      <Flex mt='2%' flexDirection={{base:"column", md:'row'}}>
        <FormControl mr='2%'>
          <FormLabel htmlFor='wine_liters' textColor="gray.500" fontWeight='medium' fontSize='md'>
            Wine (Liters)
          </FormLabel>
          <Input
            id='wine_liters'
            placeholder='Wine ...'
            type='number'
            required
            value={inputValues.wine_liters}
            onChange={handleInputChange}
            textColor="gray.600"
            focusBorderColor="brand.dark"
          />
        </FormControl>
        <FormControl mr='2%'>
          <FormLabel htmlFor='beer_liters' textColor="gray.500" fontWeight='medium' fontSize='md'>
            Beer (Liters)
          </FormLabel>
          <Input
            id='beer_liters'
            placeholder='Beer ...'
            type='number'
            required
            value={inputValues.beer_liters}
            onChange={handleInputChange}
            textColor="gray.600"
            focusBorderColor="brand.dark"
          />
        </FormControl>
      </Flex>
      <Flex mt='2%' flexDirection={{base:"column", md:'row'}}>
        <FormControl mr='2%'>
          <FormLabel htmlFor='spirits_liters' textColor="gray.500" fontWeight='medium' fontSize='md'>
            Spirits (Liters)
          </FormLabel>
          <Input
            id='spirits_liters'
            placeholder='Spirits ...'
            type='number'
            required
            value={inputValues.spirits_liters}
            onChange={handleInputChange}
            textColor="gray.600"
            focusBorderColor="brand.dark"
          />
        </FormControl>
        <FormControl mr='2%'>
        </FormControl>
      </Flex>
    </div>
  )
}

export default forwardRef(Form4)
