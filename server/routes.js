import { once } from 'events'
import config from './config.js'
import { Controller } from './controller.js'
import { logger } from './util.js'
const {
	location,
	pages: { homeHTML, controllerHTML },
	constants: { CONTENT_TYPE },
} = config
const controller = new Controller()

async function routes(req, res) {
	const { method, url } = req
	if (method === 'GET' && url === '/') {
		res.writeHead(302, { Location: location.home })
		return res.end()
	}
	if (method === 'GET' && url === '/home') {
		const { stream } = await controller.getFileStream(homeHTML)

		// Padrão do response é text/html
		// res.writeHead(200, { 'Content-Type': 'text/html' })
		return stream.pipe(res)
	}
	if (method === 'GET' && url === '/controller') {
		const { stream } = await controller.getFileStream(controllerHTML)
		return stream.pipe(res)
	}
	if (method == 'GET' && url.includes('/stream')) {
		const { stream, onClose } = await controller.createClientStream()
		req.once('close', onClose)
		res.writeHead(200, {
			'Content-Type': 'audio/mpeg',
			'Accept-Ranges': 'bytes',
		})
		return stream.pipe(res)
	}

	if (method === 'POST' && url === '/controller') {
		const data = await once(req, 'data')
		const item = JSON.parse(data)
		const result = await controller.handleCommand(item)
		return res.end(JSON.stringify(result))
	}

	//files
	if (method === 'GET') {
		const { stream, type } = await controller.getFileStream(url)
		const contentType = CONTENT_TYPE[type]
		if (contentType) {
			res.writeHead(200, { 'Content-Type': contentType })
		}
		return stream.pipe(res)
	}

	res.writeHead(404)
	return res.end('hello')
}

function handlerError(err, res) {
	if (err.message.includes('ENOENT')) {
		logger.warn(`asset not found ${err.stack}`)
		res.writeHead(404)
		return res.end()
	}

	logger.error(`caugth error on API ${err.stack}`)
	res.writeHead(500)
	return res.end()
}

export function handler(req, res) {
	return routes(req, res).catch((err) => handlerError(err, res))
}
