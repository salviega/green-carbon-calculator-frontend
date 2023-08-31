import { CertificateDetails } from './certificate-details.model'
import { EmissionDetails } from './emission-details.model'
import { EventDetails } from './event-details.model'

export interface Project {
	project_id: string
	ownerWallet: string | undefined
	name: string
	description: string
	responsableName: string
	logo?: string //firebase storage url
	banner?: string //firebase storage url
	country: string
	events: Event[]
	raisedTotal: number
	socialNetwors: SocialMedia
	certificates: CertificateDetails[]
	goal: number
	totalContributors: number
	totalToraise: number
}

export interface Event {
	event_id: string
	isCertified: boolean
	name: string
	description: string
	details?: EventDetails
	emissionDetails: EmissionDetails
	creationTx?: string
	nftId?: string
}
interface SocialMedia {
	webpage?: string
	twitter?: string
	youtube?: string
	linkedin?: string
}
