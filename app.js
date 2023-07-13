import {V, v, init} from "./vlit.js"

// global state
const state = init({
	s: 2
})

class MyMain extends V{
	static props = ({
		// observes global
		s
	}) => ({
		// local state
		k: 0,
	})
	render(){
		return v`
			<button @click=${e => this.k++}>prop ${this.k}</button>
			<button @click=${e => state.s++}>state ${state.s}</button>
			<button @click=${e=> this.remove()}>-</button>
			<button @click=${e=>{
				document.body.appendChild(document.createElement("my-main"))
			}}>+</button>
			<br>
			`
	}
}

MyMain.done