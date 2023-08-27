import React from 'react'
import {
  Box,
  Card,
  CardBody,
  Grid,
  GridItem,
  Image,
  Stack,
  Flex,
  Button,
  Text,
  Circle,
  VStack,
  Spacer,
  useBreakpointValue,
  CardHeader,
  Heading,
  Progress,
  Avatar,
  TableContainer,
  HStack
} from '@chakra-ui/react'
import OverviewPublic from '../../components/ProjectOverviewPublic'
import EventDetails from '../../components/EventDetails'
import EventTable from '../../components/EventTable'

import { useColorMode, useColorModeValue } from '@chakra-ui/react'
const Dashboard = () => {
  const bg = useColorModeValue('red.500', 'red.200')
  return (
    <Grid
      h='1000px'
      templateRows='repeat(3, 1fr)'
      templateColumns='repeat(6, 1fr)'
      gap={4}
      maxWidth={{base: '80%', lg: '65%'}}
      margin="2rem auto"
    >
      <GridItem colSpan={4} borderRadius='lg' rowSpan={1} border="1px" borderColor="gray.200" p="4">
        <OverviewPublic />
      </GridItem>
      <GridItem rowSpan={1} colSpan={2} borderRadius='lg' bg='gray.100'>
        <Text> CO2 Amount</Text>
      </GridItem>
      <GridItem
        colSpan={3}
        borderRadius='lg'
        rowSpan={1}
        p="4"
        border="1px" borderColor="gray.200"
      >
        <HStack pb="4">
          <Text fontWeight="semibold" pb="2" textColor="gray.700"> Event List</Text>
          <Spacer />
          <Button size="sm" textColor="gray.600">+ New event</Button>
        </HStack>

        <Box gap="8" overflowY="auto" maxH="180px">
          <EventDetails />
        </Box>
      </GridItem>

      <GridItem
        colSpan={3}
        borderRadius='lg'
        bg='gray.600'
        rowSpan={1}
      >
        Event Details
      </GridItem>
      <GridItem
        colSpan={6}
        borderRadius='lg'
        rowSpan={1}
      >
        <EventTable/>
      </GridItem>
    </Grid>
  )
}

export default Dashboard
