import React, { useRef, useState } from 'react'
import {
	Progress,
	Box,
	ButtonGroup,
	Button,
	Heading,
	Flex,
} from '@chakra-ui/react'

import { useToast } from '@chakra-ui/react'
import Form1Create, {
	Form1CreateInput,
	Form1CreateRef
} from '../../components/create/Form1Create'
import Form2Create, {
	Form2CreateInput,
	Form2CreateRef
} from '../../components/create/Form2Create'
export interface CreateprojectForm {
	proyectName: string
	proyectDescription: string
	category: string
	members: string
	responsableName: string
}

export default function Multistep() {
	const stepNumber = 2
	const form1CreateRef = useRef<Form1CreateRef>(null)
	const form2CreateRef = useRef<Form2CreateRef>(null)
	const toast = useToast()
	const [step, setStep] = useState(1)
	const [progress, setProgress] = useState(33.33)
	const [show, setShow] = useState(false)
	const [formInfo, setFormInfo] = useState<CreateprojectForm>({
		proyectName: '',
		proyectDescription: '',
		category: '',
		members: '',
		responsableName: ''
	})
	const onSetInfoForm1 = (info: Form1CreateInput) => {
		setFormInfo({
			...formInfo,
			proyectName: info.proyectName,
			proyectDescription: info.proyectDescription,
			category: info.category,
			members: info.members
		})
	}
	const onSetInfoForm2 = (info: Form2CreateInput) => {
		setFormInfo({
			...formInfo,
			responsableName: info.responsableName,
		})
	}
	const onNext = () => {
		if (step === 1 && form1CreateRef.current) {
			form1CreateRef.current.validateAndSubmit(() => {
				showNextForm()
			})
		} else if (step === 2 && form2CreateRef.current) {
			form2CreateRef.current.validateAndSubmit(() => {
				showNextForm()
			})
		}
	}
	const showNextForm = () => {
		setStep(step + 1)
		if (step === stepNumber + 1) {
			setProgress(100)
		} else {
			setProgress(progress + 100 / stepNumber + 1)
		}
	}
	return (
		<div>
			<Box
				borderWidth='1px'
				rounded='lg'
				shadow='1px 1px 3px rgba(0,0,0,0.3)'
				maxWidth={800}
				p={6}
				m='10px auto'
				as='form'
			>
				<Progress
					hasStripe
					value={progress}
					mb='5%'
					mx='5%'
					isAnimated
				></Progress>
				{step === 1 ? (
					<Form1Create
						ref={form1CreateRef}
						onValidationComplete={onSetInfoForm1}
					/>
				) : (
					<Form2Create
						ref={form2CreateRef}
						onValidationComplete={onSetInfoForm2}
					/>
				)}
				<ButtonGroup mt='5%' w='100%'>
					<Flex w='100%' justifyContent='space-between'>
						<Flex>
							<Button
								onClick={() => {
									setStep(step - 1)
									setProgress(progress - 100 / stepNumber)
								}}
								isDisabled={step === 1}
								colorScheme='teal'
								variant='solid'
								w='7rem'
								mr='5%'
							>
								Back
							</Button>
							<Button
								w='7rem'
								isDisabled={step === stepNumber}
								onClick={onNext}
								colorScheme='teal'
								variant='outline'
							>
								Next
							</Button>
						</Flex>
						{step === stepNumber ? (
							<Button
								w='7rem'
								colorScheme='red'
								variant='solid'
								onClick={() => {
									toast({
										title: 'Account created.',
										description: "We've created your account for you.",
										status: 'success',
										duration: 3000,
										isClosable: true
									})
								}}
							>
								Submit
							</Button>
						) : null}
					</Flex>
				</ButtonGroup>
			</Box>
		</div>
	)
}