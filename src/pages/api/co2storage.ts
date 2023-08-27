import {
	addAsset,
	addTemplate,
	returnCertifiedEventsTotals
} from '../../functions/co2storage'

import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		switch (req.method) {
			case 'POST':
				if (req.body.type === 'createTemplate') {
					return await createTemplate(req, res)
				}
				if (req.body.type === 'createAsset') {
					return createAsset(req, res)
				}
				break
			case 'GET':
				console.log('req.query.type:', req.query.type)
				if (req.query.type === 'getCertifiedEventsTotals') {
					return getCertifiedEventsTotals(req, res)
				}
				// if (req.query.type === 'getAsset') {
				// 	return getAsset(req, res)
				// }
				break
			default:
				res.status(405).end() // Método no permitido
				break
		}
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'error creating template' })
	}
}

async function createAsset(req: NextApiRequest, res: NextApiResponse) {
	const newAsset: any = await addAsset(req.body.event)

	if (newAsset) {
		res.status(200).json({ message: 'Asset created!', data: newAsset })
		return
	}

	res.status(500).json({ message: 'Error creating asset' })
}

async function createTemplate(req: NextApiRequest, res: NextApiResponse) {
	const newTemplate: any = await addTemplate()

	if (newTemplate) {
		res.status(200).json({ message: 'Template created!', data: newTemplate })
		return
	}

	res.status(500).json({ message: 'Error creating template' })
}

async function getCertifiedEventsTotals(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const [certifiedEventsTotal, CO2total] = await returnCertifiedEventsTotals()

	if (certifiedEventsTotal && CO2total) {
		res.status(200).json({ certifiedEventsTotal, CO2total })
		return
	}

	res.status(500).json({
		message:
			'Error fetching certificed events and CO2 total of the certificed events'
	})
}

// const IPFSURL = `https://ipfs.io/ipfs/${CID}`
