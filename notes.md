Should I write the global state listeners everytime? Since it's set on `.done` 
this may look like a yes but `.done` will modify the `ShadowClass` which 
extends `this` and modifies `.observes` array. `.observes` array is inherited 
from `this` so it'll reflect on the class itself too after `.done`.  
This means you can extend from your class and have the all the global listeners 
you defined in the `props` argument deconstruction. But you can't unhave them. 

```js
class MyBase extends VLit {
	static props = ({ s }) => ({})
}
MyBase.done

// still reacts state.s setter
class MySecond extends VLit {
	static props = ({}) => ({})
}
```


WELL NEVERMIND CUZ WE GOT RID OF `ShadowClass` NOW :D
IT GOES ALL IN THE CLASS SO EVERYTHING'S BECOME JUST A SYNTACTIC SUGAR