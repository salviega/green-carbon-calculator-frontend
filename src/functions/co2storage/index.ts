import { Auth, FGStorage } from '@co2-storage/js-api'
import { CertificateDetails } from '../../models/certificate-details.model'

const authType = 'pk'
const ipfsNodeType = 'client'
const ipfsNodeAddr = '/dns4/web2.co2.storage/tcp/5002/https'
const fgApiUrl = 'https://co2.storage'
const fgStorage = new FGStorage({
	authType: authType,
	ipfsNodeType: ipfsNodeType,
	ipfsNodeAddr: ipfsNodeAddr,
	fgApiHost: fgApiUrl
})

export async function addAsset(asset: CertificateDetails): Promise<any> {
	const transform: any = (obj: CertificateDetails) => {
		let result = []

		for (let [key, value] of Object.entries(obj)) {
			if (typeof value === 'object' && !Array.isArray(value)) {
				result.push({
					name: key,
					value: transform(value)
				})
			} else {
				result.push({
					name: key,
					value: value
				})
			}
		}

		return result
	}

	const assetElements = transform(asset)

	const templateCID =
		'bafyreiapqf3tek7fscgkv4kipt2nnpzfv2xvov36fambjermsjhm6cf5vm'
	const chainName = 'Footprint'
	const assetName = `${asset.event_name}`
	const assetDescription = `${asset.event_description}`

	const addAssetResponse: any = await fgStorage.addAsset(
		assetElements,
		{
			parent: null,
			name: assetName,
			description: assetDescription,
			template: templateCID,
			filesUploadStart: () => {
				console.log('Upload started')
			},
			filesUpload: async (bytes: any, p: any) => {
				console.log(`${bytes} uploaded`)
			},
			filesUploadEnd: () => {
				console.log('Upload finished')
			},
			createAssetStart: () => {
				console.log('Creating asset')
			},
			createAssetEnd: () => {
				console.log('Asset created')
			}
		},
		chainName
	)

	console.log(`Asset created`)
	return addAssetResponse
}

export async function addTemplate(): Promise<any> {
	// Template parameters
	const template = {
		owner: { type: 'string' },
		image: { type: 'string' },
		project_id: { type: 'string' },
		project_name: { type: 'string' },
		project_description: { type: 'string' },
		event_id: { type: 'string' },
		event_name: { type: 'string' },
		event_description: { type: 'string' },
		event_duration: { type: 'number' },
		event_co2: { type: 'json' },
		country: { type: 'string' },
		participants: { type: 'number' },
		employees: { type: 'number' },
		heated_area: { type: 'number' },
		air_conditioned_area: { type: 'number' },
		number_of_people_arriving_by_car: { type: 'number' },
		average_distance_traveled_by_car: { type: 'string' },
		number_of_people_traveling_by_public_transport: { type: 'number' },
		short_haul_flights: { type: 'number' },
		medium_haul_flights: { type: 'number' },
		long_haul_flights: { type: 'number' },
		percentage_business_class: { type: 'string' },
		over_night_stay_three_stars: { type: 'string' },
		over_night_stay_four_stars: { type: 'string' },
		over_night_stay_five_stars: { type: 'string' },
		meal_meat_amount: { type: 'string' },
		meal_vegetarian_amount: { type: 'string' },
		snacks_amount: { type: 'string' },
		soda_liters: { type: 'string' },
		coffee_cups: { type: 'string' },
		tea_cups: { type: 'string' },
		wine_liters: { type: 'string' },
		beer_liters: { type: 'string' },
		spirits_liters: { type: 'string' },
		power_consumption: { type: 'string' },
		printed_matter: { type: 'string' },
		plastics: { type: 'string' },
		recyclable_material: { type: 'string' },
		plant_based_materials: { type: 'string' },
		event_stand_area: { type: 'string' },
		transported_weight: { type: 'string' },
		transported_distance: { type: 'string' },
		garbage: { type: 'string' },
		recycling: { type: 'string' }
	}

	const templateName: string = 'Footprint v3'
	const templateDescription: string =
		'Template to compensate netzero certificate events'
	const chainName: string = 'Footprint'

	const addTemplateResponse: any = await fgStorage.addTemplate(
		template,
		templateName,
		null,
		templateDescription,
		null,
		chainName
	)

	console.log(`Template created`)
	return addTemplateResponse
}
