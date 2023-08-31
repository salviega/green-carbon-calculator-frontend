import React, { useEffect, useRef, useState } from 'react'
import {
	Stack,
	Flex,
	Spacer,
	Button,
	Text,
	VStack,
	useBreakpointValue,
	Box,
	HStack,
	Image,
	SimpleGrid,
	GridItem
} from '@chakra-ui/react'
import Hero from './Hero'
import ProjectsSection, { SectionType } from './ProjectsSection'
import Footer from './Footer'
import Link from 'next/link'
import axios from 'axios'

export default function Explorer() {
	const [data, setData] = useState<any | null>(null)
	useEffect(() => {
		readInfo()
	}, [])
	const readInfo = async () => {
		try {
			const headers = {
				'Content-Type': 'application/json'
			}
			const response = await axios.get(
				`http://localhost:3000/api/co2storage?type=getCertifiedEventsTotals`,
				{
					headers: headers
				}
			)
			console.log(response)
			setData(response.data)
		} catch (error) {
			console.log(error)
		}
	}
	return (
		<>
			<Hero />
			<Text
				as='h2'
				fontSize='5xl'
				marginY='12'
				fontWeight='bold'
				textColor='brand.newBlack'
			>
				Top projects
			</Text>
			<ProjectsSection type={SectionType.GENERAL} />
			<Text
				as='h2'
				fontSize='5xl'
				marginTop='48'
				marginBottom='12'
				textAlign='center'
				fontWeight='bold'
				textColor='brand.newBlack'
			>
				How it works
			</Text>
			<SimpleGrid
				columns={[1, 2, 3]}
				spacing={10}
				bg='brand.dark'
				width='100%'
				minH='600px'
				borderRadius='3xl'
				p='8'
			>
				<Flex flexDirection='column'>
					<Image
						src='/Images/step1.png'
						width={200}
						height={300}
						mb='6'
						alt='Picture of the author'
					/>
					<Text
						textColor='brand.light'
						fontWeight='bold'
						textTransform='uppercase'
						fontSize='2xl'
					>
						1. Calculate Your Footprint
					</Text>
					<Text textColor='white' fontSize='lg'>
						Set up your project, input your events, and gain insights into your
						environmental footprint.
					</Text>
				</Flex>
				<Flex
					alignSelf='center'
					flexDirection={{ base: 'column-reverse', md: 'column' }}
				>
					<Text
						textColor='brand.light'
						fontWeight='bold'
						textTransform='uppercase'
						fontSize='2xl'
					>
						2. Offset Your Footprint
					</Text>
					<Text textColor='white' fontSize='lg' mb='6'>
						Actively mitigate your carbon footprint using tokenized carbon
						credits available right on our platform.
					</Text>
					<Image
						src='/Images/step2.png'
						width={300}
						height={280}
						alt='Picture of the author'
					/>
				</Flex>
				<Flex flexDirection='column'>
					<Image
						src='/Images/step3.png'
						width={400}
						height={300}
						alt='Picture of the author'
						mb='6'
					/>
					<Text
						textColor='brand.light'
						fontWeight='bold'
						textTransform='uppercase'
						fontSize='2xl'
					>
						3. Showcase Your Commitment
					</Text>
					<Text textColor='white' fontSize='lg'>
						{
							'Engage with your community and highlight your ongoing commitment to the environment. Amplify your positive impact by adding more events and continuously offsetting carbon emissions.'
						}
					</Text>
				</Flex>
			</SimpleGrid>
			<Box mt={48}>
				<Text
					as='h2'
					fontSize='5xl'
					marginY='12'
					fontWeight='bold'
					textColor='brand.newBlack'
				>
					Powered by
				</Text>
				<SimpleGrid minChildWidth='80px' spacing='40px'>
					<Image
						src={'/Images/fundingthecommons.png'}
						alt='celo logo'
						h={24}
						w={36}
						fit='contain'
					/>
					<Image
						src={'/Images/gitcoin.png'}
						alt='celo logo'
						h={24}
						w={36}
						fit='contain'
					/>
					<Image
						src={'/Images/filecoin.png'}
						alt='celo logo'
						h={24}
						w={36}
						fit='contain'
					/>
					<Image
						src={'/Images/celo.png'}
						alt='celo logo'
						h={24}
						w={36}
						fit='contain'
					/>
					<Image
						src={'/Images/toucan.png'}
						alt='celo logo'
						h={24}
						w={36}
						fit='contain'
					/>

					<Image
						src={'/Images/myclimate.png'}
						alt='celo logo'
						h={24}
						w={36}
						fit='contain'
					/>
				</SimpleGrid>
			</Box>
			<SimpleGrid
				columns={[1, 2, 2]}
				spacing={10}
				marginTop='36'
				marginBottom='48'
			>
				<GridItem colSpan={1}>
					<VStack align='start'>
						<Text fontSize='xl' fontWeight='medium' textColor='brand.newBlack'>
							{' '}
							Total offsets
						</Text>
						<Text
							as='h2'
							fontSize={{ base: '4xl', md: '6xl' }}
							fontWeight='bold'
							textColor='brand.newBlack'
							lineHeight='1'
							textTransform='uppercase'
						>
							{'Every offset counts. Together, we create lasting change.'}
						</Text>
					</VStack>
				</GridItem>
				<GridItem colSpan={1} alignSelf='center'>
					{data && (
						<VStack align='start' justify='center' gap='16'>
							<VStack align='start'>
								<Text
									as='h2'
									fontSize='6xl'
									fontWeight='bold'
									textColor='brand.newBlack'
									lineHeight='1'
									textTransform='uppercase'
								>
									{data.CO2total}
								</Text>
								<Text
									fontSize={{ base: 'xl', md: '2xl' }}
									fontWeight='medium'
									textColor='brand.newBlack'
								>
									{' '}
									CARBON TONS
								</Text>
							</VStack>
							<VStack align='start'>
								<Text
									as='h2'
									fontSize='6xl'
									fontWeight='bold'
									textColor='brand.newBlack'
									lineHeight='1'
									textTransform='uppercase'
								>
									{data.certifiedEventsTotal}
								</Text>
								<Text
									fontSize={{ base: 'xl', md: '2xl' }}
									fontWeight='medium'
									textColor='brand.newBlack'
								>
									{' '}
									PROJECTS RAISED FUNDS
								</Text>
							</VStack>
						</VStack>
					)}
				</GridItem>
			</SimpleGrid>
			<Flex
				bg='brand.fuchsia'
				width='100%'
				borderRadius='3xl'
				p='12'
				align='start'
				flexDirection='column'
				backgroundImage={'/Images/cta.jpg'}
				backgroundSize='cover'
				backgroundPosition={'bottom right'}
				mb='36'
			>
				<Text
					color='white'
					fontWeight={800}
					lineHeight={1.2}
					fontSize={useBreakpointValue({ base: '3xl', md: '7xl' })}
					textTransform='uppercase'
					w={{ base: '90%', md: '70%' }}
				>
					{'PUBLIC GOODS ARE ONLY GOOD WHEN GREEN.'}
				</Text>
				<Link href='/calculator'>
					<Button
						bg={'#DEFE75'}
						color={'black'}
						_hover={{ bg: '#cdde99' }}
						mt='6'
					>
						Calculate your impact
					</Button>
				</Link>
			</Flex>
			<Footer />
		</>
	)
}
