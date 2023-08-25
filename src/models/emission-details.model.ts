import { EventDetails } from './event-details.model'

export interface EmissionDetails {
	co2_amount: number
	sections: {
		Mobility: number
		Accommodation: number
		Catering: number
		Energy: number
		Materials: number
		Transport: number
		Waste: number
	}
}
