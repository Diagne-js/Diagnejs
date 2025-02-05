import {component, event, create, set} from 'diagne'

component('Form', ({addTodo, $from}) => {
  let newTodo = create('')
  let i = 0
  event('writing', (e) => set(() => newTodo = e.target.value),{from:$from})
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
    <button onclick="addTodo" d-disabled="newTodo.length == 0">add</button>
    {newTodo}
    <D_Spacing size=2 />
  `
})