import { CertificateDetails } from './certificate-details.model'
import { EventDetails } from './event-details.model'

export interface Project {
	ownerWallet: string | undefined
	name: string
	description: string
	responsableName: string
	logo?: string //firebase storage url
	banner?: string //firebase storage url
	country : string
	events: Event[]
	raisedTotal: number
	eventTotal: number
	socialNetwors: SocialMedia
	certificates?: CertificateDetails[]
}

export interface Event {
	name: string
	description: string
	date: string
	details?: EventDetails
}
interface SocialMedia {
	webpage?: string
	twitter?: string
	youtube?: string
	linkedin?: string
}