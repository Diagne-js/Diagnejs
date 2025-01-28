import {create, set, event, component} from 'diagne'
import './form.js'
import './test3564367434752/todo.js'

component('Todo', (props) => {
   const todos = create([1,2])
  return `
     <h1>my todo component</h1>
     <Form placeholder='add a new todo' todos=todos />
     <Form placeholder='add tags' todos=todos />
    
  `
})