import React, { useEffect, useRef, useState } from 'react'
import {
  Text,
  Grid,
  GridItem,
  HStack,
  Circle,
  Progress,
  VStack,
  Spacer,
  Icon
} from '@chakra-ui/react'
import { TbSum,  } from 'react-icons/tb'
import {SlTarget} from 'react-icons/sl'
import {MdEventAvailable} from 'react-icons/md'
import {PiUsers} from 'react-icons/pi'

export default function OverviewPrivate() {
  return (
    <>
      <Text fontWeight="semibold" pb="2"> Overview</Text>
      <Grid templateRows='repeat(3, 1fr)'
        templateColumns='repeat(2, 1fr)'
        columnGap={12} rowGap={6}>
        <GridItem colSpan={1} borderRadius='lg' rowSpan={1} border="1px" borderColor="gray.200" p="4">
          <HStack>
            <Circle bg="brand.light" size="36px" color="gray.500">
              <Icon as={TbSum} /></Circle>
            <VStack gap="0" align="start">
              <Text fontWeight="semibold" fontSize="xl" textColor="gray.700"> $120,78</Text>
              <Text textColor="gray.500" fontSize="md">Total Raised</Text>
            </VStack>
            <Spacer />
          </HStack>
        </GridItem>
        <GridItem colSpan={1} borderRadius='lg' rowSpan={1} border="1px" borderColor="gray.200" p="4">
          <HStack>
            <Circle bg="brand.light" size="36px" color="gray.500">
              <Icon as={SlTarget} /></Circle>
            <VStack gap="0" align="start">
              <Text fontWeight="semibold" fontSize="xl" textColor="gray.700"> $28,2 K</Text>
              <Text textColor="gray.500" fontSize="md">Goal</Text>
            </VStack>
            <Spacer />
          </HStack>
        </GridItem>
        <GridItem colSpan={1} borderRadius='lg' rowSpan={1} border="1px" borderColor="gray.200" p="4">
          <HStack>
            <Circle bg="brand.light" size="36px" color="gray.500">
              <Icon as={MdEventAvailable} /></Circle>
            <VStack gap="0" align="start">
              <Text fontWeight="semibold" fontSize="xl" textColor="gray.700"> 16</Text>
              <Text textColor="gray.500" fontSize="md">Total events</Text>
            </VStack>
            <Spacer />
          </HStack>
        </GridItem>
        <GridItem colSpan={1} borderRadius='lg' rowSpan={1} border="1px" borderColor="gray.200" p="4">
          <HStack>
            <Circle bg="brand.light" size="36px" color="gray.500">
              <Icon as={PiUsers} /></Circle>
            <VStack gap="0" align="start">
              <Text fontWeight="semibold" fontSize="xl" textColor="gray.700"> 48</Text>
              <Text textColor="gray.500" fontSize="md">Total contributors</Text>
            </VStack>
            <Spacer />
          </HStack>
        </GridItem>
        <GridItem colSpan={2} borderRadius='lg' rowSpan={1} border="1px" borderColor="gray.200" p="4">

          <VStack gap="0" align="start">
            <HStack width="80%">
              <Text fontWeight="semibold" fontSize="lg" textColor="gray.700" mb="2"> Certified events</Text>
              <Spacer />
              <Text fontWeight="semibold" fontSize="lg" textColor="gray.500" mb="2"> 33%</Text>
            </HStack>
            <Progress size='md' value={33} w="80%" borderRadius="lg" />
          </VStack>
        </GridItem>
      </Grid>
    </>
  )
}
