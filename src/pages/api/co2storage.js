import { Auth, FGStorage } from '@co2-storage/js-api'

export default async function handler(req, res) {
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
				if (req.query.type === 'getTemplate') {
					return getTemplate(req, res)
				}
				if (req.query.type === 'getAsset') {
					return getAsset(req, res)
				}
				if (req.query.type === 'authenticate') {
					return authenticate(req, res)
				}
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

async function authenticate(req, res) {
	try {
		let authResponse = await auth.authenticate()

		if (authResponse.error != null) {
			console.error(authResponse.error)
			await new Promise(reject => setTimeout(reject, 300))
			process.exit()
		}

		console.dir(authResponse.result, { depth: null })

		res.status(200).json({ message: 'authenticated!' })
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'error creating authenticate' })
	}
}

async function createTemplate(req, res) {
	// Template parameters
	const template = {
		RegistryName: { type: 'string', mandatory: true },
		RegistryUrl: { type: 'string', mandatory: true },
		Id: { type: 'string', mandatory: true },
		Name: { type: 'string', mandatory: true },
		Description: { type: 'string', mandatory: true },
		State: { type: 'string' },
		EmissionReductions: { type: 'string' },
		CategoryName: { type: 'string' },
		Acreage: { type: 'string' },
		RegistrationDate: { type: 'string' },
		Status: { type: 'string' },
		ValidatorName: { type: 'string' },
		ProponentName: { type: 'string' },
		PoolCredits: { type: 'string' },
		CreditPeriod: { type: 'string' },
		GeoCid: { type: 'string', mandatory: true },
		Url: { type: 'string', mandatory: true }
	}
	const templateName = 'Green Carbon Gitcoin'
	const templateDescription = 'bla, bla, bla...'
	const chainName = 'sandbox'

	console.log(':D')

	// Create template
	let addTemplateResponse = await fgStorage.addTemplate(
		template,
		templateName,
		null,
		templateDescription,
		null,
		chainName
	)

	console.log('D:')

	console.log('addTemplateResponse: ', addTemplateResponse)
	res.status(200).json({ message: 'Template created!' })
}

function createAsset(req, res) {
	// Tu lógica para crear un recurso aquí
	res.status(200).json({ message: 'Asset created!' })
}

function getAsset(req, res) {
	// Tu lógica para obtener un recurso aquí
	res.status(200).json({ message: 'Asset fetched!' })
}
