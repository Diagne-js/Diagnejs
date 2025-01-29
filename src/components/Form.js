import {component, event, create, set} from 'diagne'

component('Form', ({addTodo}) => {
  let newTodo = create('')
  event('writing', (e) => newTodo = e.target.value)
  event('addTodo', () => addTodo(newTodo))
  
  return `
    <input type="text" oninput="writing" />
    <button onclick="addTodo">add</button>
  `
})