Lit is a great library but its js api is kinda messed up. I made a version of 
lit that is optimized to build things rapidly without ts. 

# features

- tag name is automatically set to the class name in kebab case 
- global state with simple syntax
- declare reactive properties and set defaults in the same place
- (no shadow dom by default (just add `static shadow = true`))

let's look at the syntax it gives us

```js
import {VLitElement, html, init} from "./vlit.js"

const state = init({
	s: 2
})

class MyMain extends VLitElement {
	render(){
		return html`
			<my-pair></my-pair>
			<my-pair></my-pair>
			<my-pair></my-pair>
		`
	}
}
MyMain.done

class MyPair extends VLitElement {
	static props = ({
		s		// observes global
	}) => ({
		k: 0,	// property
	})
	render(){
		return html`
			<button @click=${e => this.k++}>prop ${this.k}</button>
			<button @click=${e => state.s++}>state ${state.s}</button> <br>
			`
	}
}
MyPair.done
```

--- 

probable faqs:  
- how does this `({ s }) => ({ k: 0 })` weird syntax work?  
	the one before arrow is argument deconstruction. a proxy is given as an 
	argument and this way you are deconstructing the property `s` from it. 
	if we'd write it with a traditional arguments that'd be like: 
	```js
	proxy => {
		let s = proxy.s
		return { k: 0 }
	}
	```
	or we also could use `let { s } = proxy`. the point here is to signal that 
	this element uses `s` from state. the most straightforward way would be an 
	array of strings `["s"]` but we can use shiny JavaScript features to make 
	it a bit more appealing and easy to write and read. the return object's
	properties will be assigned to the element one-by-one so you don't have to 
	write the properties in the constructor again.

- where are Property options?  
	they're still there in `static properties`. you can write it with `props`. 
	`props` defines a default reactive properties `{}` if it's nullish. defined 
	`properties` won't be overwritten. (I'm planning a nice way to add some in 
	the props)

- I want my shadow back  
	`static shadow = true`

- why the `.done` tho ?  
	this getter will set the dynamic properties from `props`, make the class 
	observe the state and define your tag. so you must `.done` after defining 
	a class. 
	(currently no way to pass other arguments to `customElements.define()`)

- should I deconstruct what properties of state the element observes?  
	no. if the parent element has `s` then all its inherited classes will 
	update when `state.s` is set. but for the default properties yes you 
	should. the best way is to make another function and use .

also `VLitElement` is exported as `V` and `html` is exported as `v` if you're 
a lazy typer or don't want a 4 letter prefix when using in template literals