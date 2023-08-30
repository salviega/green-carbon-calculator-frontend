import {
  Flex,
  Text,
  useColorModeValue
} from '@chakra-ui/react'

export default function Footer() {
  return (
    <Flex
    bg={useColorModeValue('brand.newBlack', 'gray.900')} px={4} margin="10px auto" borderRadius="2xl" height="60px" justifyContent="center" align="center">
        <Text textColor="white" textAlign="center">With ❤️ from 🇨🇴🇨🇿🇻🇪</Text>

    </Flex>
  )
}
