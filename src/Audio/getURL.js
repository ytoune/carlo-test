export const getURL = async src => {
	const { readFile, lookup } = window
	const type$ = lookup(src)
	const data = await readFile(src, 'base64')
	const type = await type$

	if (!data) return

	const blob = toBlob(data, type)
	return URL.createObjectURL(blob)
}

function toBlob(base64, type) {
	const bin = atob(base64)
	const { buffer } = new Uint8Array(bin.length).map((_, i) => bin.charCodeAt(i))
	return new Blob([buffer], { type })
}
