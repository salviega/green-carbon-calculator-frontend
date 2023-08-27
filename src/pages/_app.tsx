import React from 'react'
import '../styles/globals.css'
import '@rainbow-me/rainbowkit/styles.css'
import {
	RainbowKitProvider,
	getDefaultWallets,
	darkTheme
} from '@rainbow-me/rainbowkit'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { polygon, polygonMumbai, celoAlfajores, celo } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'
import { ChakraProvider } from '@chakra-ui/react'
// import Layout from '@/components/Layout'
import Layout from '../components/Layout'
import customTheme from '../theme/theme.js'

const { chains, publicClient } = configureChains(
	[
		...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'false'
			? [celo, polygon]
			: []),

		...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true'
			? [celoAlfajores, polygonMumbai]
			: [])
	],
	[publicProvider()]
)

const projectId = '0'

const { connectors } = getDefaultWallets({
	appName: 'RainbowKit dApp',
	projectId,
	chains
})

const demoAppInfo = {
	appName: 'RainbowKit dApp'
}

const wagmiConfig = createConfig({
	autoConnect: true,
	connectors,
	publicClient
})

export default function App({ Component, pageProps }) {
	return (
		<WagmiConfig config={wagmiConfig}>
			<RainbowKitProvider
				chains={chains}
				coolMode
				modalSize='compact'
				theme={darkTheme({
					accentColor: '#DEFE75',
					accentColorForeground: '#035231',
					borderRadius: 'medium',
					fontStack: 'system',
					overlayBlur: 'small'
				})}
			>
				<ChakraProvider theme={customTheme}>
          <Layout>
					  <Component {...pageProps} />
          </Layout>
				</ChakraProvider>
			</RainbowKitProvider>
		</WagmiConfig>
	)
}
