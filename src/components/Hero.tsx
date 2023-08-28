import React from 'react'
import { Stack, Flex, Button, Text, VStack, useBreakpointValue, Box, HStack, Image } from '@chakra-ui/react'
import Link from 'next/link'

export default function Hero() {
  return (
    <Flex
      h='700px'
      borderRadius="3xl"
      margin="10px auto"
      backgroundImage={
        '/images/hero.jpg'
      }
      backgroundSize={'cover'}
      backgroundPosition={'center left'}
      align="center"
      w="100%">
      <Flex w="100%">
      <VStack
        justify={'start'}
        justifyItems="start"
        px={useBreakpointValue({ base: 4, md: 8 })}
        w="70%">
        <Stack maxW={'2xl'} align={'flex-start'} spacing={6}>
          <Text
            color='brand.light'
            fontWeight={800}
            lineHeight={1.2}
            fontSize={useBreakpointValue({ base: '3xl', md: '7xl' })}>
            MEASURE & REDUCE YOUR IMPACT
          </Text>
          <Text textColor="white" fontWeight="medium" fontSize="lg">Turn your passion for impact into tangible action for environmental change. Calculate your project's carbon footprint and offset it directly with tokenized carbon credits.</Text>
            <Link href="/calculator">
              <Button
                bg={'#DEFE75'}
                color={'black'}
                _hover={{ bg: '#cdde99' }}
              >
                Calculate your impact
              </Button>
            </Link>
        </Stack>
      </VStack>
      <Flex align="center" justify="center">
      <Box bg='brand.newBlack' opacity="90%" px="4" maxH="md" py="6" width="300px" justifyContent="center" borderRadius="lg">
      <Image
        objectFit='cover'
        src='https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
        alt='Chakra UI'
        borderRadius="lg"
      />
      <VStack align="start">
        <Text textColor="white" fontWeight="bold" fontSize="xl">Apollo II</Text>
        <Text textColor="white" fontSize="md" fontWeight="semibold">3,4 T CO2</Text>
        <Text textColor="gray.100" fontSize="sm">For a greener tomorrow! This NFT represents a tokenized carbon offset and stands as your pledge towards the environment. </Text>
      </VStack>
      </Box>
      </Flex>
      </Flex>
    </Flex>
  )
}
