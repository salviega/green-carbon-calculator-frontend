import React, { useEffect, useRef, useState } from 'react'
import { Stack, Flex, Button, Text, VStack, useBreakpointValue, Box, HStack } from '@chakra-ui/react'
import Hero from './Hero'
import ProyectsSection from './ProyectsSection'

export default function Explorer() {
	return (
		<>
			<Hero/>
      <Text as="h2" fontSize="5xl" marginY="12" fontWeight="bold" textColor="brand.newBlack">Top projects</Text>
			<ProyectsSection/>
		</>
	)
}
