import React from 'react'
import { Text, HStack, Progress, VStack, Spacer } from '@chakra-ui/react'
import { ProjectProps } from './ProjectOverviewPublic'

export default function ProjectCertificate({ project, owner }: ProjectProps) {
	let sliderValueCertified = 0
	if (project.certificates.length > 0 && project.events.length > 0) {
		sliderValueCertified =
			(project.certificates.length / project.events.length) * 100
	}

	return (
		<>
			<VStack gap='0' align='start' mt='8'>
				<HStack width='100%'>
					<Text fontWeight='semibold' fontSize='lg' textColor='gray.700' mb='2'>
						{' '}
						Certified events
					</Text>
					<Spacer />
					<Text
						fontWeight='semibold'
						fontSize='lg'
						textColor='gray.500'
						mb='2'
					>{`${sliderValueCertified}%`}</Text>
				</HStack>
				<Progress
					size='md'
					value={sliderValueCertified}
					w='100%'
					borderRadius='lg'
				/>
			</VStack>
		</>
	)
}
