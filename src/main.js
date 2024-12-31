import {App} from './app.js'
import {render} from '../diagne/reactivity/reactivity.js'
import {navigate} from '../diagne/routing/router.js'

console.log('hi')

render(App(), '#app')