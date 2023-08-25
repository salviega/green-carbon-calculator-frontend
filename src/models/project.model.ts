import { CertificateDetails } from './certificate-details.model'
import { EventDetails } from './event-details.model'

export interface Project {
	name: string
	descripcion: string
	logo: string //base64
	banner: string //base64
	events: Event[]
	raisedTotal: number
	eventTotal: number
	socialNetwors: string[]
	certificates?: CertificateDetails[]
}

export interface Event {
	name: string
	description: string
	date: string
	details?: EventDetails
}
