import { V, v, tag } from "./vlit.js"

/*
	TODO: add tag setter to not write the tag class name twice
	tags.MyComponent = class extends V {} // yes disables export but can be rewritten with export easily when needed
*/

export class MyInput extends V {
	render() {
		return v`
			<br>
			<br>
			<br>
			<input type="text" @change=${this.setName}>
		`
	}
	setName(e){
		const { state } = this
		state.name = e.target.value
	}
}
MyInput.done


tag.MyComponent = class extends V {
	static props = class {
		name = "user name"
	}
	render() {
		console.log('hi')
		const { state } = this
		console.log(state.name)
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
}


const el = document.createElement("my-component")
document.body.appendChild(el)

const el2 = document.createElement("my-input")
document.body.appendChild(el2)