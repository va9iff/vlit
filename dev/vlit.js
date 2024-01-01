export * from "./lit.js"

import { LitElement, html } from "./lit.js"

export function v() {
	return html(...arguments)
}

let pascalToKebab = s => s.replace(/([a-z0–9])([A-Z])/g, "$1-$2").toLowerCase()

const realState = {}
const livingVLitElements = []

export class V extends LitElement{
	static props = class {}
	static properties = {}
	static get done(){
		this.properties = { ...this.properties } // kinda dirty
		for (let key in new this.props) this.properties[key] = {}
		customElements.define(pascalToKebab(this.name), this)
	}
	listeningStateKeys = []
	constructor(){
		super(...arguments)
		let propsObj = new this.constructor.props()
		for (let key in propsObj) this[key] = propsObj[key]

		const that = this
		this.state = new Proxy({}, {
			get(obj, prop) {
				if (!that.listeningStateKeys.includes(prop)) 
					that.listeningStateKeys.push(prop)
				return realState[prop]
			},
			set(obj, prop, value) {
				realState[prop] = value
				for (const listner of livingVLitElements) 
					if (listner.listeningStateKeys.includes(prop))
						listner.requestUpdate()
				return true
			}
		})
	}
	connectedCallback(){
		super.connectedCallback(...arguments)
		livingVLitElements.push(this)
	}
	disconnectedCallback(){
		super.disconnectedCallback(...arguments)
		let index = livingVLitElements.indexOf(this);
		if (index !== -1) {
		  livingVLitElements.splice(index, 1);
		}
	}
	createRenderRoot() {
		if (this.constructor.shadow) 
			return super.createRenderRoot()
		return this
	}
}