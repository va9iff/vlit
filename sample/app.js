import {VLitElement, html, init} from "../vlit.js"

const state = init({
	s: 2
})

class MyMain extends VLitElement {
	r(state){
		return html`
			<my-pair></my-pair>
			<my-pair></my-pair>
			<my-pair></my-pair>`
	}
}
MyMain.done

class MyPair extends VLitElement {
	static props = ({
		// s	// no need. state.s from the argument of r() will tell that 
				// this component uses the state property s
	}) => ({
		k: 0, // property
	})
	r(state){
		return html`
			<button @click=${e => this.k++}>prop ${this.k}</button>
			<button @click=${e => state.s++}>state ${state.s}</button> <br>
			`
	}
}
MyPair.done

