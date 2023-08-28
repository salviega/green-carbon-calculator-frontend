import React, { useEffect, useRef, useState } from 'react'
import { Stack, Flex,Spacer, Button, Text, VStack, useBreakpointValue, Box, HStack, Image,SimpleGrid } from '@chakra-ui/react'
import Hero from './Hero'
import ProyectsSection from './ProyectsSection'

export default function Explorer() {
	return (
		<>
			<Hero/>
      <Text as="h2" fontSize="5xl" marginY="12" fontWeight="bold" textColor="brand.newBlack">Top projects</Text>
			<ProyectsSection/>
      <Text as="h2" fontSize="5xl" marginTop="48" marginBottom="12" textAlign="center" fontWeight="bold" textColor="brand.newBlack">How it works</Text>
      <SimpleGrid columns={3} spacing={10} bg="brand.dark" width="100%" height="600px" borderRadius="3xl" p="8">
        <Flex flexDirection="column">
          <Image  src='/images/step1.png'
              width={200}
              height={300}
              mb="6"
              alt='Picture of the author'/>
          <Text textColor="brand.light" fontWeight="bold" textTransform="uppercase" fontSize="2xl">1. Calculate Your Footprint</Text>
          <Text textColor="white" fontSize="lg">Set up your project, input your events, and gain insights into your environmental footprint.</Text>
        </Flex>
        <Flex flexDirection="column" alignSelf="center">
          <Text textColor="brand.light" fontWeight="bold" textTransform="uppercase" fontSize="2xl">2. Offset Your Footprint</Text>
          <Text textColor="white" fontSize="lg" mb="6">Actively mitigate your carbon footprint using tokenized carbon credits available right on our platform.</Text>
          <Image  src='/images/step2.png'
              width={300}
              height={280}
              alt='Picture of the author'/>
        </Flex>
        <Flex flexDirection="column" >
        <Image  src='/images/step3.png'
              width={400}
              height={300}
              alt='Picture of the author' mb="6"/>
          <Text textColor="brand.light" fontWeight="bold" textTransform="uppercase" fontSize="2xl" >3. Showcase Your Commitment</Text>
          <Text textColor="white" fontSize="lg">Engage with your community and highlight your ongoing commitment to the environment. Amplify your positive impact by adding more events and continuously offsetting carbon emissions.</Text>
        </Flex>
      </SimpleGrid>
		</>
	)
}
