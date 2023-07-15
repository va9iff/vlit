Lit is a great library but its js api is kinda messed up. I made a version of
lit that is optimized to build things rapidly without ts.

# Features

- tag name is automatically set to the class name in kebab case
- global state with simple syntax and automatic subscription
- declare reactive properties and set defaults in the same place
- (no shadow dom by default (just add `static shadow = true`))

let's look at the syntax it gives us

```js
import { VLitElement, html, init } from "./vlit.js"

// global state
const state = init({
	s: 2,
})

class MyMain extends VLitElement {
	r(state) {
		return html`
			<my-pair></my-pair>
			<my-pair></my-pair>
			<my-pair></my-pair>
		`
	}
}
MyMain.done

class MyPair extends VLitElement {
	static props = () => ({ k: 0 })
	r(state) {
		return html`
			<button @click=${e => this.k++}>prop ${this.k}</button>
			<button @click=${e => state.s++}>state ${state.s}</button> <br />
		`
	}
}
MyPair.done
```

---

probable faqs:

- why `r` and not `render`?
  `render` method will return a call of `r` method but with the `state` 
  argument which is used for global state.

- where are Property options?  
  they're still there in `static properties` but you can also 
  write it with `props`. it defines a default reactive properties with `{}` 
  but if if you have options already in `properties` they won't be overwritten. 

- what is the `state` argument? and why `r`?  
  the argument is a proxy which will give you whatever you would got from 
  the real state (which can be used by importing. also `init` sets and returns 
  to this state) but it will record whatever you used in `render`. 
  here we use `state.s` from the argument so it knows that this component uses 
  the state `s`. but if we'd just import `state` and use it then the result 
  would be correct but changing the state wouldn't refresh the component. 

- I want my shadow back  
  `static shadow = true`

- why the `.done` tho?  
  this getter will define the dynamic properties from `props` and define the 
  tag. so you must `.done` after defining a class.  

  (also makes the class observe the old way manually defined state in `props`)
  (currently no way to pass other arguments to `customElements.define()`)

`VLitElement` is also exported as `V` and `html` is exported as `v` if you're
a lazy typer or don't want a 4 letter prefix when using in template literals

---

the older version of vlit used manual subscription for state. if you need to 
define `render` rather than the wrapper `r`, it's possible this way or get the
automatic subscribing state in render simply by `this.state` or 
`const { state } = this`.

```js
import { VLitElement, html, state } from "./vlit.js"

class MyPair extends VLitElement {
  static props = ({
    s, // observes global state
  }) => ({
    k: 0, // reactive property
  })
  render() {
    return html`
      <button @click=${e => this.k++}>prop ${this.k}</button>
      <button @click=${e => state.s++}>state ${state.s}</button> <br />
    `
  }
}
MyPair.done
````
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

  - should I deconstruct what properties of state the element observes?  
    no. if the parent element has `s` then all its inherited classes will
    update when `state.s` is set. but for the default properties yes you
    should. the best way is to make another function and use .


_I know it's a bit disgusting to see deconstructed properties from an 
argument that aren't gonna be used but I just didn't want to write observing 
state property names just in strings. Indeed it does look elegant to me - being 
before the default property values and it has no default cuz uses the global. 
also it's recommended to use first way with automatic subscription._