import React, { useRef, useState } from 'react'
import { getAccount } from '@wagmi/core'
import { firebaseApi } from '../../../services/firebaseApi'
import { storage } from '../../../firebase.config'
import {
	ref as fireRef,
	uploadBytesResumable,
	getDownloadURL
} from 'firebase/storage'
import { Progress, Box, ButtonGroup, Button, Flex } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import { Project } from '../../models/project.model'
import Form1Create, {
	Form1CreateInput,
	Form1CreateRef
} from '../../components/create/Form1Create'
import Form2Create, {
	Form2CreateInput,
	Form2CreateRef
} from '../../components/create/Form2Create'
import { EventDetails } from '@/models/event-details.model'
import { EmissionDetails } from '@/models/emission-details.model'
import { initFormInfo, initValuesResults } from '../calculator'
import { nanoid } from 'nanoid'
import { useRouter } from 'next/router'
export interface CreateprojectForm {
	proyectName: string
	projectCountry: string
	proyectDescription: string
	category: string
	members: string
	logo?: File | string | null | undefined
	banner?: File | string | null | undefined
}
interface FormProps {
	eventData?: EventDetails
	results?: EmissionDetails
}
export default function CreateForm(props: FormProps) {
	const router = useRouter();
	const account = getAccount()
	const { createProject } = firebaseApi()
	const toast = useToast()
	const stepNumber = 2
	const costPerTon = 10
	let form2info: Form2CreateInput
	const form1CreateRef = useRef<Form1CreateRef>(null)
	const form2CreateRef = useRef<Form2CreateRef>(null)
	const [step, setStep] = useState(1)
	const [progress, setProgress] = useState(100 / stepNumber)
	const [loading, setLoading] = useState(false)
	const [eventInfo, setEventInfo] = useState<EventDetails | null>(
		props.eventData || null
	)
	const [emissionsInfo, setEmissionsInfo] = useState<EmissionDetails | null>(
		props.results || null
	)
	const [formInfo, setFormInfo] = useState<CreateprojectForm>({
		proyectName: '',
		projectCountry: '',
		proyectDescription: '',
		category: '',
		members: '',
		logo: null,
		banner: null
	})
	const onSetInfoForm1 = (info: Form1CreateInput) => {
		setFormInfo({
			...formInfo,
			proyectName: info.proyectName,
			proyectDescription: info.proyectDescription,
			category: info.category,
			members: info.members,
			logo: info.logo,
			banner: info.banner
		})
	}
	const onSetInfoForm2 = (info: Form2CreateInput) => {
		form2info = info
	}
	const onNext = () => {
		if (step === 1 && form1CreateRef.current) {
			form1CreateRef.current.validateAndSubmit(() => {
				showNextForm()
			})
		} else if (step === 2 && form2CreateRef.current) {
			console.log('2')

			form2CreateRef.current.validateAndSubmit(() => {
				onCreateProject()
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
	const onCreateProject = async () => {
		console.log('submit?')

		if (!account?.address) {
			toast({
				title: 'Please connect your wallet first',
				description: 'Please login.',
				status: 'warning',
				duration: 5000,
				isClosable: true
			})
			return
		}
		try {
			setLoading(true)
			//upload logo & banner images to firebase
			const images: File[] = [formInfo.logo as File, formInfo.banner as File]
			const imgs: string[] | null = await uploadImages(images)

			const newProject: Project = {
				project_id: nanoid(),
				ownerWallet: account.address?.toString(),
				name: formInfo.proyectName,
				description: formInfo.proyectDescription,
				responsableName: form2info.responsableName,
				logo: imgs ? imgs[0] : '', //url
				banner: imgs ? imgs[1] : '', //url
				country: form2info.projectCountry,
				events: [
					{
						event_id: nanoid(),
						isCertified: false,
						name: eventInfo?.event_name ?? '',
						description: eventInfo?.event_description ?? '',
						details: eventInfo ?? initFormInfo,
						emissionDetails: emissionsInfo ?? initValuesResults
					}
				],
				raisedTotal: 0,
				socialNetwors: {
					webpage: form2info.webpage,
					twitter: form2info.twitter,
					youtube: form2info.youtube,
					linkedin: form2info.linkedin
				},
				certificates: [],
				goal: 0,
				totalContributors: 0,
				totalToraise: emissionsInfo?.co2_amount ?? 0,
			}
			const response = await createProject(newProject)
			console.log(response)
			toast({
				title: 'Project created.',
				description: "We've created your project.",
				status: 'success',
				duration: 5000,
				isClosable: true
			})
			console.log('Project Done')
			router.push(`/dashboard?id=${newProject.project_id}`);
		} catch (error) {
			console.log(error)
			toast({
				title: 'Error creating project',
				description: 'Please try again.',
				status: 'error',
				duration: 5000,
				isClosable: true
			})
			setLoading(false)
		}
	}
	const uploadImages = async (files: File[]): Promise<string[] | null> => {
		try {
			const urls: string[] = []
			const uploadPromises = Array.from(files).map(async file => {
				try {
					if (!file) {
						urls.push('')
						return Promise.resolve()
					}
					const fileRef = fireRef(storage, file.name)

					await uploadBytesResumable(fileRef, file)

					const fileURL = await getDownloadURL(fileRef)
					urls.push(fileURL)
				} catch (error) {
					console.error('Error uploading image: ', error)
					toast({
						title: 'Error uploading the file',
						description: 'Please try again.',
						status: 'error',
						duration: 5000,
						isClosable: true
					})
					setLoading(false)
				}
			})
			await Promise.all(uploadPromises)
			return urls
		} catch (error) {
			console.log(error)
			toast({
				title: 'Error uploading the file',
				description: 'Please try again.',
				status: 'error',
				duration: 5000,
				isClosable: true
			})
			setLoading(false)
			return null
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
				{}
				{step === 1 ? (
					<Form1Create
						ref={form1CreateRef}
						onValidationComplete={onSetInfoForm1}
					/>
				) : (
					<Form2Create
						ref={form2CreateRef}
						onValidationComplete={onSetInfoForm2}
						loading={loading}
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
								isLoading={loading}
							>
								Back
							</Button>
							<Button
								w='7rem'
								isDisabled={step === stepNumber}
								onClick={onNext}
								colorScheme='teal'
								variant='outline'
								isLoading={loading}
							>
								Next
							</Button>
						</Flex>
						{step === stepNumber ? (
							<Button
								w='7rem'
								colorScheme='red'
								variant='solid'
								onClick={onNext}
								isLoading={loading}
							>
								Create
							</Button>
						) : null}
					</Flex>
				</ButtonGroup>
			</Box>
		</div>
	)
}
