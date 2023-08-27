import React, { useEffect, useRef, useState } from 'react'
import {
  Stack,
  Flex,
  Button,
  Text,
  Spacer,
  useBreakpointValue,
  Progress,
  Avatar,
  HStack
} from '@chakra-ui/react'

export default function OverviewPublic() {
  return (
    <>
      <Text fontWeight="semibold" pb="2"> Overview</Text>
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
      <HStack
        w={'full'}
        align="start"
        pt="2"
      >
        <Stack align='start' w="full">
          <Text
            fontWeight={700}
            lineHeight={1.2}
            fontSize={useBreakpointValue({ base: 'xl', md: '2xl' })}
          >
            $120,8 K
          </Text>
          <Text textColor="gray.500">Raised from <strong>213</strong> contributors</Text>
          <Progress size='md' value={33} w="80%" borderRadius="lg" />
        </Stack>
        <Stack direction={'column'} w="1/2" alignItems="flex-end">
          <Spacer />
          <Spacer />
          <Spacer />
          <Spacer />
          <Button
            w="200px"
            variant="darkie"
          >
            Donate
          </Button>
        </Stack>
      </HStack>
    </>
  )
}
