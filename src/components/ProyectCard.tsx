import React from 'react'
import {
  Box,
  Flex,
  Avatar,
  IconButton,
  VStack,
  Button,
  Card,
  CardHeader,
  Heading,
  HStack,
  Stack,
  CardBody,
  CardFooter,
  Text,
  Image
} from '@chakra-ui/react'
import { ExternalLinkIcon, StarIcon } from '@chakra-ui/icons'

const ProyectCard = () => {
  return (
    <Card maxW='sm' borderRadius="3xl">
      <CardHeader>
      <Flex
        h={'250px'}
        backgroundImage={
          'url(https://source.unsplash.com/g3PyXO4A0yc)'
        }
        backgroundSize={'cover'}
        borderRadius='lg'
        pos="relative"
      >
        <HStack pos="absolute" bottom="2" left="2">
          <Avatar name='T P' src='https://bit.ly/tioluwani-kolawole' size="sm" />
          <Text textColor="white" fontWeight="bold" fontSize="2xl">
            Tropic project</Text>
        </HStack>
      </Flex>
      </CardHeader>
      <CardBody>
      <Stack align='start' w="full">
          <Text
            fontWeight={700}
            lineHeight={1.2}
            fontSize='xl'
          >
Tropic Project          </Text>
          <Text textColor="gray.500">Reforest all the amazonian </Text>
        </Stack>
      </CardBody>
      <CardFooter
        justify='left'
        flexWrap='wrap'
      >
        <Flex justifyContent="space-between" width="100%">
          <VStack gap="1">
            <Text fontSize="xs" textColor="gray.400" fontWeight="semibold">Total Raised</Text>
            <Text fontSize="xl" textColor="gray.700" fontWeight="bold">$150,4K</Text>
          </VStack>
          <VStack gap="1">
            <Text fontSize="xs" textColor="gray.400" fontWeight="semibold">Goals</Text>
            <Text fontSize="xl" textColor="gray.700" fontWeight="bold">$200K</Text>
          </VStack>
          <VStack gap="1">
            <Text fontSize="xs" textColor="gray.400" fontWeight="semibold">Left</Text>
            <Text fontSize="xl" textColor="gray.700" fontWeight="bold">$49,6K</Text>
          </VStack>
        </Flex>
      </CardFooter>
    </Card>
  )
}

export default ProyectCard
