import React, { Component } from 'react'

import { Audio } from './Audio'

const key = 'hogehoge'

export class App extends Component {
	constructor(...p) {
		super(...p)
		this.state = {
			src: localStorage[key] || '',
		}
		this.pushByEv = ({ target: { value } }) =>
			this.setState({ src: (localStorage[key] = value) })
	}
	render() {
		const {
			pushByEv,
			state: { src },
		} = this
		return (
			<div>
				<p>
					<input
						onChange={pushByEv}
						value={src}
						placeholder="example: /etc/music/hoge.mp3"
					/>
				</p>
				<Audio src={src} />
			</div>
		)
	}
}
