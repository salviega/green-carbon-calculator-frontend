import React, { useState } from 'react'
import { Stack, Flex,Spacer, Button, Text, VStack, useBreakpointValue, Box, HStack, Image,SimpleGrid, GridItem } from '@chakra-ui/react'
import ProyectSection from '../../components/ProyectsSection'
import Head from 'next/head'

const metadata = {
	title: 'Footprint',
	description: 'Decentralized calculator'
}

const Discovery = () => {
  return (
    <>
    <Head>
    <title>{metadata.title}</title>
    <meta name='description' content={metadata.description} />
    <meta name='viewport' content='width=device-width, initial-scale=1' />
    <link rel='icon' href='/favicon.ico' />
  </Head>
<ProyectSection/>
    </>
  )
}

export default Discovery
