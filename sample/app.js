import {VLit, html, init} from "../vlit.js"

const state = init({
	s: 2
})

class MyMain extends VLit {
	render(){
		return html`
			<my-pair></my-pair>
			<my-pair></my-pair>
			<my-pair></my-pair>`
	}
}
MyMain.done

class MyPair extends VLit {
	static props = ({
		s 	  // observes global
	}) => ({
		k: 0, // property
	})
	render(){
		return html`
			<button @click=${e => this.k++}>prop ${this.k}</button>
			<button @click=${e => state.s++}>state ${state.s}</button> <br>
			`
	}
}
MyPair.done

