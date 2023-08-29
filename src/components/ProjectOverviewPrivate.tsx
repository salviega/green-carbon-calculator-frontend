import React from 'react'
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
import { TbSum, } from 'react-icons/tb'
import { SlTarget } from 'react-icons/sl'
import { MdEventAvailable } from 'react-icons/md'
import { PiUsers } from 'react-icons/pi'
import { ProjectProps } from './ProjectOverviewPublic'

export default function OverviewPrivate({ project, owner }: ProjectProps) {
  let sliderValue = 0;
  if(project.certificates.length > 0 && project.events.length > 0) {
    sliderValue = ((project.certificates.length)/(project.events.length))*100;
  }

  return (
      <Grid templateRows='repeat(3, 1fr)'
        templateColumns='repeat(2, 1fr)'
        columnGap={12} rowGap={6} mt='5%'>
        <GridItem colSpan={1} borderRadius='lg' rowSpan={1} border="1px" borderColor="gray.200" p="4">
          <HStack>
            <Circle bg="brand.light" size="36px" color="gray.500">
              <Icon as={TbSum} /></Circle>
            <VStack gap="0" align="start">
              <Text fontWeight="semibold" fontSize="xl" textColor="gray.700">{`$ ${project.raisedTotal}`}</Text>
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
              <Text fontWeight="semibold" fontSize="xl" textColor="gray.700">{`$ ${project.totalToraise}`}</Text>
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
              <Text fontWeight="semibold" fontSize="xl" textColor="gray.700">{project.events.length}</Text>
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
              <Text fontWeight="semibold" fontSize="xl" textColor="gray.700">{project.totalContributors}</Text>
              <Text textColor="gray.500" fontSize="md">Total contributors</Text>
            </VStack>
            <Spacer />
          </HStack>
        </GridItem>
        <GridItem colSpan={2} borderRadius='lg' rowSpan={1} border="1px" borderColor="gray.200" p="4">

          <VStack gap="0" align="start">
            <HStack width="100%">
              <Text fontWeight="semibold" fontSize="lg" textColor="gray.700" mb="2"> Certified events</Text>
              <Spacer />
              <Text fontWeight="semibold" fontSize="lg" textColor="gray.500" mb="2">{`${sliderValue}%`}</Text>
            </HStack>
            <Progress size='md' value={sliderValue} w="100%" borderRadius="lg" />
          </VStack>
        </GridItem>
      </Grid>
  )
}
