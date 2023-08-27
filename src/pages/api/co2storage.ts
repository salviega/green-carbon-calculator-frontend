import { addTemplate } from '../../functions/co2storage'

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
				// if (req.body.type === 'createAsset') {
				// 	return createAsset(req, res)
				// }
				break
			case 'GET':
				// if (req.query.type === 'getTemplate') {
				// 	return getTemplate(req, res)
				// }
				// if (req.query.type === 'getAsset') {
				// 	return getAsset(req, res)
				// }
				// if (req.query.type === 'authenticate') {
				// 	return authenticate(req, res)
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

// async function authenticate(req: NextApiRequest, res: NextApiResponse) {
// 	try {
// 		let authResponse = await auth.authenticate()

// 		if (authResponse.error != null) {
// 			console.error(authResponse.error)
// 			await new Promise(reject => setTimeout(reject, 300))
// 			process.exit()
// 		}

// 		console.dir(authResponse.result, { depth: null })

// 		res.status(200).json({ message: 'authenticated!' })
// 	} catch (error) {
// 		console.error(error)
// 		res.status(500).json({ message: 'error creating authenticate' })
// 	}
// }

async function createTemplate(req: NextApiRequest, res: NextApiResponse) {
	const newTemplate: any = await addTemplate()

	if (newTemplate) {
		res.status(200).json({ message: 'Template created!', data: newTemplate })
		return
	}

	res.status(500).json({ message: 'Error creating template' })
}

// function createAsset(req, res) {
// 	// Tu lógica para crear un recurso aquí
// 	res.status(200).json({ message: 'Asset created!' })
// }

// function getAsset(req, res) {
// 	// Tu lógica para obtener un recurso aquí
// 	res.status(200).json({ message: 'Asset fetched!' })
// }
