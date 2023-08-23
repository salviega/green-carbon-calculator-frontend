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
	VStack,
  Spacer,
	useBreakpointValue,
	CardHeader,
	Heading,
  Progress,
  Avatar,
  HStack
} from '@chakra-ui/react'
import { useColorMode , useColorModeValue} from '@chakra-ui/react'
const Dashboard = () => {
  const bg = useColorModeValue('red.500', 'red.200')
	return (
				<Grid
					h='1000px'
					templateRows='repeat(3, 1fr)'
					templateColumns='repeat(6, 1fr)'
					gap={4}
				>
					<GridItem colSpan={4} borderRadius='lg' rowSpan={1} borderColor="red.200" border="1px" p="4">
            <Text> Overview</Text>
						<Flex
							h={'250px'}
							backgroundImage={
								'url(https://images.unsplash.com/photo-1600267175161-cfaa711b4a81?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)'
							}
							backgroundSize={'cover'}
							borderRadius='lg'
              pos="relative"
						>
              <HStack  pos="absolute" bottom="2" left="2">
                <Avatar name='T P' src='https://bit.ly/tioluwani-kolawole' size="sm" />
                <Text>
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
                  <Text>Raised from 213 contributors</Text>
                  <Progress colorScheme='green' size='lg' value={33} w="100%" borderRadius="lg"/>
								</Stack>
                <Stack direction={'column'} w="1/2" alignItems="flex-end">
                  <Spacer/>
                  <Spacer/>
                  <Spacer/>
                  <Spacer/>
                  <Spacer/>
										<Button
											bg={'black'}
                      size="lg"
											rounded={'md'}
											color={'white'}
											_hover={{ bg: 'blue.500' }}
										>
											Donate
										</Button>
									</Stack>
							</HStack>

					</GridItem>
					<GridItem rowSpan={1} colSpan={2} borderRadius='lg' bg='gray.100'>
              <Text> CO2 Amount</Text>
					</GridItem>
					<GridItem
						colSpan={3}
						borderRadius='lg'
						bg='gray.100'
						rowSpan={1}
					>
            Event List
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
						bg='gray.600'
						rowSpan={1}
					>
            Historical
          </GridItem>
				</Grid>
	)
}

export default Dashboard
