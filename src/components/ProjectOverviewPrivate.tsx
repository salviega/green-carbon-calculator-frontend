import React from 'react'
import {
  Text,
  SimpleGrid,
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
  let sliderValueCertified = 0;
  if (project.certificates.length > 0 && project.events.length > 0) {
    sliderValueCertified = ((project.certificates.length) / (project.events.length)) * 100;
  }

  return (
    <SimpleGrid columns={[2, null, 4]} mt='5%' gap="4">
      <GridItem colSpan={1} borderRadius='lg' rowSpan={1} border="1px" borderColor="gray.200" p="2">
        <HStack>
          <Circle bg="brand.light" size="36px" color="gray.500">
            <Icon as={TbSum} /></Circle>
          <VStack gap="0" align="start">
            <Text fontWeight="semibold" fontSize="xl" textColor="gray.700">{`$ ${project.raisedTotal.toFixed(2)}`}</Text>
            <Text textColor="gray.500" fontSize="md">Total Raised</Text>
          </VStack>
          <Spacer />
        </HStack>
      </GridItem>
      <GridItem colSpan={1} borderRadius='lg' rowSpan={1} border="1px" borderColor="gray.200" p="2">
        <HStack>
          <Circle bg="brand.light" size="36px" color="gray.500">
            <Icon as={SlTarget} /></Circle>
          <VStack gap="0" align="start">
            <Text fontWeight="semibold" fontSize="xl" textColor="gray.700">{`$ ${project.totalToraise.toFixed(2)}`}</Text>
            <Text textColor="gray.500" fontSize="md">Goal</Text>
          </VStack>
          <Spacer />
        </HStack>
      </GridItem>
      <GridItem colSpan={1} borderRadius='lg' rowSpan={1} border="1px" borderColor="gray.200" p="2">
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
      <GridItem colSpan={1} borderRadius='lg' rowSpan={1} border="1px" borderColor="gray.200" p="2">
        <HStack>
          <Circle bg="brand.light" size="36px" color="gray.500">
            <Icon as={PiUsers} /></Circle>
          <VStack gap="0" align="start">
            <Text fontWeight="semibold" fontSize="xl" textColor="gray.700">{project.totalContributors}</Text>
            <Text textColor="gray.500" fontSize="md">Contributors</Text>
          </VStack>
          <Spacer />
        </HStack>
      </GridItem>
    </SimpleGrid>
  )
}
