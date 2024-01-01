import { V, v } from "./vlit.js"

console.log(';hi')

/*

	TODO: global state listeners

	TODO: add tag setter to not write the tag class name twice
	tags.MyComponent = class extends V {} // yes disables export but can be rewritten with export easily when needed
*/

export class MyInput extends V {
	render() {
		return v`
			<br>
			<br>
			<br>
			<input type="text">
			<button @click=${this.setName}>change global state</button>
		`
	}
	setName(e){
		const {state} = this
		state.name = e.target.value

		document.querySelector('my-component').update() //!!!!
	}
}
MyInput.done


export class MyComponent extends V {
	static props = class {
		name = "user name"
	}
	render() {
		const { state } = this
		return v`
			<button @click = ${this.changeName}>
				${this.name}
			</button> <br>
			global: <b>${state.name}</b>
		`
	}
	changeName(e){
		const { state } = this
		this.name += "hi"
	}
	// when element disconnected from dom, 
}

// sets up static properties for reactive props
// defines component in a kebab-case form of the class name
MyComponent.done


const el = document.createElement("my-component")
document.body.appendChild(el)

const el2 = document.createElement("my-input")
document.body.appendChild(el2)