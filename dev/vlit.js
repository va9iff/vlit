export * from "./lit.js"

import { LitElement, html } from "./lit.js"

export function v() {
	return html(...arguments)
}

let pascalToKebab = s => s.replace(/([a-z0–9])([A-Z])/g, "$1-$2").toLowerCase()

const realState = {}

export class V extends LitElement{
	static props = class {
		active = false
	}
	static properties = {}
	static get done(){
		this.properties = { ...this.properties } // kinda dirty
		for (let key in new this.props) this.properties[key] = {}
		customElements.define(pascalToKebab(this.name), this)
	}
	constructor(){
		super(...arguments)
		let propsObj = new this.constructor.props()
		for (let key in propsObj) this[key] = propsObj[key]

		/* TODO */
		// this.state = new Proxy({}, {}, {})
		this.state = realState
	}
	createRenderRoot() {
		if (this.constructor.shadow) 
			return super.createRenderRoot()
		return this
	}
}