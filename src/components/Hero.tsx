import React from 'react'
import { Stack, Flex, Button, Text, VStack, useBreakpointValue, Box, HStack, Image, Spacer } from '@chakra-ui/react'
import Link from 'next/link'

export default function Hero() {
  return (
    <Flex
      minH='700px'
      borderRadius="3xl"
      margin="10px auto"
      backgroundImage={
        '/images/hero.jpg'
      }
      backgroundSize={'cover'}
      backgroundPosition={{ base: "100%", md: "left top" }}
      align="center"
      w="100%">
      <Flex w="100%" flexDirection={{ base: 'column', md: 'row' }}>
        <VStack
          justify={'start'}
          justifyItems="start"
          align="start"
          px={useBreakpointValue({ base: 4, md: 8 })}
          w={{ base: '100%', md: '70%' }}>
          <Stack maxW={'2xl'} align={'flex-start'} spacing={6}>
            <Text
              color='brand.light'
              fontWeight={800}
              lineHeight={1.2}
              fontSize={useBreakpointValue({ base: '5xl', md: "6xl", lg: "5rem" })}>
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
        <Flex align="center" justify="center" display={{ base: 'none', md: 'flex' }}>
          <Box bg='brand.newBlack' opacity="90%" px="4" maxH="md" py="6" width="300px" justifyContent="center" borderRadius="lg" border="1px" borderColor="whiteAlpha.200">
            <Image
              objectFit='cover'
              src='/Images/nft.jpg'
              alt='Chakra UI'
              borderRadius="lg"
            />
            <VStack align="start">
              <HStack>
              <Text textColor="white" fontWeight="bold" fontSize="xl">Apollo II</Text>
              <Spacer/>
              <Text textColor="white" fontSize="md" fontWeight="semibold">3,4 T CO2</Text>
              </HStack>
              <Text textColor="gray.100" fontSize="sm">For a greener tomorrow! This NFT represents a tokenized carbon offset and stands as your pledge towards the environment. </Text>
            </VStack>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  )
}
