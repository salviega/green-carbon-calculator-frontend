// import { FGStorage } from '@co2-storage/js-api'

// const authType =
// 	'ed9375f4ae87127508e485529d5169c0d0617d12ec0718cfa3447337f6546646'
// const ipfsNodeType = 'client'
// const ipfsNodeAddr = '/dns4/web2.co2.storage/tcp/5002/https'
// const fgApiUrl = 'https://co2.storage'
// const fgStorage = new FGStorage({
// 	authType: authType,
// 	ipfsNodeType: ipfsNodeType,
// 	ipfsNodeAddr: ipfsNodeAddr,
// 	fgApiHost: fgApiUrl
// })

export default async function handler(req, res) {
	console.log(req.body)
	// if (!req.body) {
	// 	return res.status(400).json({ message: 'Input required' })
	// }

	res.status(200).json({ output: 'contractDetails' })

	// // Init FG Storage object - Note: ensure .env file is configured

	// const templateName = 'ForestWatch'
	// const templateDescription =
	// 	'Template for forest-related carbon offset projects which include geospatial data'
	// const chainName = 'ForestWatch'

	// // Create template
	// let addTemplateResponse = await fgStorage.addTemplate(
	// 	template,
	// 	templateName,
	// 	null,
	// 	templateDescription,
	// 	null,
	// 	chainName
	// )

	// console.log(addTemplateResponse)
}
