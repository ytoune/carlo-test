import React from 'react'
import { render } from 'react-dom'
import { App } from './App'

const main = () => {
	render(<App />, document.querySelector('main'))
}

Promise.resolve().then(main)
