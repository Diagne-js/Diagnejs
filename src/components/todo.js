import {create, set, event, component} from 'diagne'
import './form.js'

component('Todo', (props) => {
  
  
  return `
     <h1>my todo component</h1>
     <Form placeholder='add a new todo'/>
  `
})