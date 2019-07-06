import React, { Component } from 'react'

import { Subject } from 'rxjs'

import { getURL } from './getURL'

export class Audio extends Component {
	constructor(...p) {
		super(...p)
		this.state = {}
	}
	componentDidMount() {
		const src$ = new Subject()
		this.$ = src$.subscribe(src => this.setState({ src }))
		this.push = src => src$.next(src)
		this.fetch()
	}
	componentWillUnmount() {
		this.$.unsubscribe()
		this.$ = null
		this.push = null
	}
	componentDidUpdate({ src: prevsrc }) {
		const {
			props: { src },
		} = this
		if (src !== prevsrc) this.fetch()
	}
	async fetch() {
		try {
			const {
				props: { src },
			} = this
			const url = await getURL(src)
			this.push && this.push(url)
		} catch (x) {
			console.error(x)
		}
	}
	render() {
		const {
			state: { src },
		} = this
		if (!src) return null
		return <audio src={src} controls autoPlay />
	}
}
