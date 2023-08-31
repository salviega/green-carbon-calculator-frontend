import React, {
	ChangeEvent,
	forwardRef,
	useImperativeHandle,
	useState
} from 'react'
import {
	Heading,
	Flex,
	Input,
	Select,
	FormControl,
	FormLabel,
	FormErrorMessage,
	Textarea,
	Image
} from '@chakra-ui/react'
export interface Form1CreateInput {
	proyectName: string
	proyectDescription: string
	category: string
	members: string
	logo?: File | string | null
	banner?: File | string | null
}
enum ImageType {
	'LOGO',
	'BANNER'
}
interface Form1CreateProps {
	onValidationComplete: (info: Form1CreateInput) => void // Define the prop type
}
export interface Form1CreateRef {
	validateAndSubmit: (callback: () => void) => void
}
const Form1Create: React.ForwardRefRenderFunction<
	Form1CreateRef,
	Form1CreateProps
> = ({ onValidationComplete }, ref) => {
	const [selectedLogo, setSelectedLogo] = useState<string | null>(null)
	const [selectedBanner, setSelectedBanner] = useState<string | null>(null)
	const [inputValues, setInputValues] = useState<Form1CreateInput>({
		proyectName: '',
		proyectDescription: '',
		members: '',
		category: '',
		logo: null,
		banner: null
	})
	const [inputErrors, setInputErrors] = useState<Form1CreateInput>({
		proyectName: '',
		proyectDescription: '',
		members: '',
		category: ''
	})
	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { id, value } = e.target
		setInputValues(prevValues => ({ ...prevValues, [id]: value }))
	}
	const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		const { id, value } = e.target
		setInputValues(prevValues => ({ ...prevValues, [id]: value }))
	}
	const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
		const { id, value } = e.target
		setInputValues(prevValues => ({ ...prevValues, [id]: value }))
	}
	const validateAndSubmit = (callback: () => void) => {
		let hasErrors = false
		const newErrors: Form1CreateInput = {
			proyectName: '',
			proyectDescription: '',
			members: '',
			category: ''
		}
		const mandatoryFields = [
			'proyectName',
			'proyectDescription',
			'members',
			'category'
		]
		mandatoryFields.forEach(key => {
			if (!inputValues[key as keyof Form1CreateInput]) {
				newErrors[key as keyof Form1CreateInput] = 'Field is required'
				hasErrors = true
			}
		})
		setInputErrors(newErrors)
		if (!hasErrors) {
			onValidationComplete(inputValues)
			console.log(inputValues)
			callback()
		}
	}
	useImperativeHandle(ref, () => ({
		validateAndSubmit: validateAndSubmit // Expose the function through the ref
	}))
	const handleImageChange = (
		e: ChangeEvent<HTMLInputElement>,
		imgType: ImageType
	) => {
		const file: File | null = e.target.files ? e.target.files[0] : null
		const { id } = e.target
		if (file) {
			const validImageTypes = ['image/jpeg', 'image/png', 'image/gif']
			if (file && !validImageTypes.includes(file.type)) {
				alert('Please select a valid image type (jpg, png, gif).')
				return
			}
			setInputValues(prevValues => ({
				...prevValues,
				[id]: file
			}))
			const reader = new FileReader()
			reader.onloadend = () => {
				switch (imgType) {
					case ImageType.LOGO:
						setSelectedLogo(reader.result as string)
						break
					case ImageType.BANNER:
						setSelectedBanner(reader.result as string)
						break
					default:
						setSelectedLogo(reader.result as string)
						break
				}
			}
			reader.readAsDataURL(file)
		}
	}
	return (
		<div>
			<Heading
				w='100%'
				textColor='gray.600'
				fontWeight='medium'
				fontSize='xl'
				mb='2%'
			>
				General
			</Heading>
			<FormControl mt='2%' isRequired isInvalid={!!inputErrors.proyectName}>
				<FormLabel
					htmlFor='proyectName'
					textColor='gray.500'
					fontWeight='medium'
					fontSize='md'
				>
					Project Name
				</FormLabel>
				<Input
					id='proyectName'
					type='text'
					maxLength={70}
					required
					value={inputValues.proyectName}
					onChange={handleInputChange}
					textColor='gray.600'
					focusBorderColor='brand.dark'
				/>
				<FormErrorMessage>{inputErrors.proyectName}</FormErrorMessage>
			</FormControl>
			<FormControl
				id='proyectDescription'
				mt='2%'
				isRequired
				isInvalid={!!inputErrors.proyectDescription}
			>
				<FormLabel textColor='gray.500' fontWeight='medium' fontSize='md'>
					Project Description
				</FormLabel>
				<Textarea
					id='proyectDescription'
					placeholder='Description ...'
					rows={3}
					shadow='sm'
					fontSize={{
						sm: 'sm'
					}}
					maxLength={254}
					required
					value={inputValues.proyectDescription}
					onChange={handleTextAreaChange}
					textColor='gray.600'
					resize='none'
					focusBorderColor='brand.dark'
				/>
				<FormErrorMessage>{inputErrors.proyectDescription}</FormErrorMessage>
			</FormControl>
			<Flex mt='2%'>
				<FormControl isRequired isInvalid={!!inputErrors.category} mr='2%'>
					<FormLabel
						htmlFor='category'
						textColor='gray.500'
						fontWeight='medium'
						fontSize='md'
					>
						Project Category
					</FormLabel>
					<Select
						id='category'
						name='category'
						autoComplete='category'
						placeholder='Pick category'
						w='full'
						rounded='md'
						value={inputValues.category}
						onChange={handleSelectChange}
						textColor='gray.600'
						focusBorderColor='brand.dark'
					>
						<option value={'Web3 Open Source Software'}>
							{'Web3 Open Source Software'}
						</option>
						<option value={'Ethereum Infrastructure'}>
							{'Ethereum Infrastructure'}
						</option>
						<option value={'Community and Education'}>
							{'Community and Education'}
						</option>
						<option value={'Climate Solutions'}>{'Climate Solutions'}</option>
						<option value={'DeSci'}>{'DeSci'}</option>
						<option value={'Other Public Goods'}>{'Other Public Goods'}</option>
					</Select>
					<FormErrorMessage>{inputErrors.category}</FormErrorMessage>
				</FormControl>
				<FormControl isRequired isInvalid={!!inputErrors.members}>
					<FormLabel
						htmlFor='members'
						textColor='gray.500'
						fontWeight='medium'
						fontSize='md'
					>
						# of Proyect Members
					</FormLabel>
					<Select
						id='members'
						name='members'
						autoComplete='members'
						placeholder='Pick members number'
						w='full'
						rounded='md'
						value={inputValues.members}
						onChange={handleSelectChange}
						textColor='gray.600'
						focusBorderColor='brand.dark'
					>
						<option value={'0-10'}>{'0-10'}</option>
						<option value={'10-50'}>{'10-50'}</option>
						<option value={'50-100'}>{'50-100'}</option>
					</Select>
					<FormErrorMessage>{inputErrors.members}</FormErrorMessage>
				</FormControl>
			</Flex>
			<Flex mt='2%'>
				<FormControl mr='2%'>
					<FormLabel
						htmlFor='logo'
						textColor='gray.500'
						fontWeight='medium'
						fontSize='md'
					>
						Pick project logo image
					</FormLabel>
					<div>
						<input
							type='file'
							onChange={e => handleImageChange(e, ImageType.LOGO)}
							id='logo'
						/>
					</div>
				</FormControl>
				<FormControl mr='2%' ml='2%'>
					<FormLabel
						htmlFor='banner'
						textColor='gray.500'
						fontWeight='medium'
						fontSize='md'
					>
						Pick project banner image
					</FormLabel>
					<input
						type='file'
						onChange={e => handleImageChange(e, ImageType.BANNER)}
						id='banner'
					/>
				</FormControl>
			</Flex>
			<FormControl mt='2%'>
				{selectedLogo && (
					<>
						<FormLabel
							htmlFor='logo'
							textColor='gray.500'
							fontWeight='medium'
							fontSize='md'
						>
							Logo Image
						</FormLabel>
						<Flex align='center' justify='center' mb='2%'>
							<Image
								objectFit='cover'
								src={selectedLogo}
								alt='Logo Project Selected Image'
								maxHeight={200}
							/>
						</Flex>
					</>
				)}
				{selectedBanner && (
					<>
						<FormLabel
							htmlFor='banner'
							textColor='gray.500'
							fontWeight='medium'
							fontSize='md'
						>
							Banner Image
						</FormLabel>
						<Flex align='center' justify='center'>
							<Image
								objectFit='cover'
								src={selectedBanner}
								alt='Logo Project Selected Image'
								maxHeight={200}
							/>
						</Flex>
					</>
				)}
			</FormControl>
		</div>
	)
}

export default forwardRef(Form1Create)
