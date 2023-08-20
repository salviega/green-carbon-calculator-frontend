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
	useBreakpointValue,
	CardHeader,
	Heading
} from '@chakra-ui/react'
import { useColorMode , useColorModeValue} from '@chakra-ui/react'
const Dashboard = () => {
  const bg = useColorModeValue('red.500', 'red.200')
	return (
		<Card>
			<CardBody>
				<Grid
					h='700px'
					templateRows='repeat(3, 1fr)'
					templateColumns='repeat(5, 1fr)'
					gap={4}
				>
					<GridItem colSpan={3} borderRadius='lg' rowSpan={2}>
						<Flex
							h={'100%'}
							backgroundImage={
								'url(https://images.unsplash.com/photo-1600267175161-cfaa711b4a81?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)'
							}
							backgroundSize={'cover'}
							borderRadius='lg'
						>
							<VStack
								w={'full'}
								justify={'center'}
								px={useBreakpointValue({ base: 4, md: 8 })}
								bgGradient={'linear(to-r, blackAlpha.600, transparent)'}
							>
								<Stack maxW={'2xl'} align={'flex-start'} spacing={6}>
									<Text
										color={'white'}
										fontWeight={700}
										lineHeight={1.2}
										fontSize={useBreakpointValue({ base: '3xl', md: '4xl' })}
									>
										Lorem ipsum dolor sit amet consectetur adipiscing elit sed
										do eiusmod tempor
									</Text>
									<Stack direction={'row'}>
										<Button
											bg={'blue.400'}
											rounded={'full'}
											color={'white'}
											_hover={{ bg: 'blue.500' }}
										>
											Show me more
										</Button>
										<Button
											bg={'whiteAlpha.300'}
											rounded={'full'}
											color={'white'}
											_hover={{ bg: 'whiteAlpha.500' }}
										>
											Show me more
										</Button>
									</Stack>
								</Stack>
							</VStack>
						</Flex>
					</GridItem>
					<GridItem rowSpan={3} colSpan={2} borderRadius='lg' bg='gray.100'>
							<CardHeader>
								<Heading size='md'>Client Report</Heading>
							</CardHeader>
					</GridItem>
					<GridItem
						colSpan={3}
						borderRadius='lg'
						bg='gray.100'
						rowSpan={1}
					></GridItem>
				</Grid>
			</CardBody>
		</Card>
	)
}

export default Dashboard
