export class MyComponent extends V {
	// when .done is used, these will set as reactive properties 
	// also the values will set as default values at constructor
	static props = class {
		name = "user name"
		age = 0
		awards = []
		active = false
	}
	render() {
		// every component has this property set in constructor.
		const { state } = this
		// what key you get, the element will subscribe this key
		// whenever the same key is set, subscribers are updated
		return v`
			<button @click = ${this.changeActive}>
				toggle
			</button>
		`
	}
	changeActive(e){
		const { state } = this
		state.isActive = !state.isActive
	}
	// when element disconnected from dom, 
}

// sets up static properties for reactive props
// defines component in a kebab-case form of the class name
MyComponent.done

