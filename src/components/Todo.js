import {component,  set, create} from 'diagne'
import './Form.js'

component('Todo', () => {
  let todos = create([])
  const addTodo = create((newTodo) => {
    set(() => todos = [...todos, newTodo])
  })
  
  return`
     <h1>My Todo Component</h1>
     <Form addTodo=addTodo />
     <div for="todo in todos">{todo}</div>
  `
})

component('test', () => 'test')