import React from 'react'
import Image from 'next/image'
import {
	Box,
	Flex,
	HStack,
	IconButton,
	Button,
	Menu,
	MenuButton,
	Text,
	useDisclosure,
	useColorModeValue,
	Stack
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from '@chakra-ui/icons'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import Link from 'next/link'

interface LayoutProps {
	children: React.ReactNode
}
interface NavLinkProps {
	children: React.ReactNode
	link: string
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
	const { isOpen, onOpen, onClose } = useDisclosure()

	const NavLink: React.FC<NavLinkProps> = ({ children, link }) => {
		return (
			<Box
				as='a'
				px={2}
				py={1}
				_hover={{
					textDecoration: 'none',
					color: 'brand.light',
					transitionDuration: '0.2s',
					transitionTimingFunction: 'ease-in-out'
				}}
				color='white'
				fontWeight='semibold'
				href={link}
			>
				{children}
			</Box>
		)
	}
	return (
		<>
			<Box
				bg={useColorModeValue('brand.newBlack', 'gray.900')}
				px={4}
				maxWidth={{ base: '95%', md: '85%', lg: '80%' }}
				margin='10px auto'
				borderRadius='2xl'
			>
				<Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
					<IconButton
						size={'md'}
						icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
						aria-label={'Open Menu'}
						display={{ md: 'none' }}
						onClick={isOpen ? onClose : onOpen}
						color='white'
						bg='brand.darkie'
						opacity='90%'
						_hover={{
							transitionDuration: '0.2s',
							transitionTimingFunction: 'ease-in-out',
							transform: 'scale(1.05)'
						}}
					/>
					<HStack spacing={2} alignItems={'center'}>
						<Link href='/'>
							<Image
								src='/Images/logo.png'
								width={30}
								height={30}
								alt='Picture of the author'
							/>
						</Link>
						<Link href='/'>
							<Text
								display={{ base: 'none', md: 'flex' }}
								fontSize={{ base: 'md', md: 'xl' }}
								fontWeight='bold'
								color='white'
							>
								Footprint
							</Text>
						</Link>
						<HStack
							as={'nav'}
							spacing={4}
							display={{ base: 'none', md: 'flex' }}
							color='white'
							fontWeight='semibold'
						>
							<NavLink link='explore'>Explore</NavLink>
							<NavLink link='myprojects'>My projects</NavLink>
						</HStack>
					</HStack>
					<Flex alignItems={'center'} justifyContent={'space-between'}>
						<Menu>
							<MenuButton
								as={Button}
								rounded={'full'}
								variant={'link'}
								cursor={'pointer'}
								minW={0}
							></MenuButton>
						</Menu>
						<Box mx={2} />
						<ConnectButton />
					</Flex>
				</Flex>

				{isOpen ? (
					<Box pb={4} display={{ md: 'none' }}>
						<Stack as={'nav'} spacing={4}>
							<NavLink link='explore'>Explore</NavLink>
							<NavLink link='myprojects'>My projects</NavLink>
						</Stack>
					</Box>
				) : null}
			</Box>
			<Box maxWidth={{ base: '95%', md: '85%', lg: '80%' }} margin='10px auto'>
				{children}
			</Box>
		</>
	)
}

export default Layout
