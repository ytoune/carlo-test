
const path = require('path')
const carlo = require('carlo')
const resolve = path.resolve.bind(path, __dirname)

const mime = require('mime-types')
const {promisify} = require('util')
const fs = require('fs')

const fsops = {}
const methods = ['readdir', 'readFile']
for (const mes of methods) {
	const _fn = promisify(fs[mes])
	fsops[mes] = async (...p) => {
		try {
			return await _fn(...p)
		} catch(x) {}
	}
}

const main = async () => {

	const app = await carlo.launch()

	app.on('exit', () => process.exit())

	if (development) {
		app.serveOrigin('http://localhost:3000')
		app.mainWindow().load = load
	} else {
		app.serveFolder(resolve('build'))
	}

	await app.exposeFunction('lookup', path => mime.lookup(path))
	for (const mes of methods)
		await app.exposeFunction(mes, fsops[mes])

	await app.load('index.html')

}

const development = (() => {
	// try { return !!require('./package.json') } catch(x) {}
	return false
})()

async function load(uri = '', params) {
	if (!this.www_.size && !this.wwwOrigin_) {
		this.page_.close()
		throw new Error('Please call app.serveFolder(__dirname) or point to ' +
										'other folder(s) with your web files')
	}
	await this.initNetwork_
	this.page_.goto(`${this.wwwOrigin_}/${uri}`, {timeout: 0})
	return this.initializeRpc_(params)
}

Promise.resolve().then(main).catch(x => {
	console.error(x)
})
