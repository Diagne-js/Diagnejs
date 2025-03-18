import {component, event, create, set, newWatch} from 'diagne'

component('Form', ({addTodo, $from}) => {
  const from = $from
  let newTodo = create('')
  let i = 0;
  event('writing', (e) => {
    set(() => newTodo = e.target.value,{from})
  })
  
  event('addTodo', () => {
    const nextTodo = {
      title: newTodo,
      isDone: false,
      isModifying: false,
      id: i
    }
    addTodo(nextTodo)
    i++
  })
  
  return `
    <input type="text" oninput="writing" />
    <button onclick="addTodo" d-disabled="newTodo == ''">add</button>
    {newTodo}
  `
})