import { component, set, create, event, newWatch } from 'diagne'
import './Form.js'

component('Todo', ({ $from }) => {
  const from = $from
  let todos = create([])
  const isDoneStyle = create(`
      opacity: 0.5;
  `)
  
  const addTodo = create((newTodo) => {
    set(() => todos = [...todos, newTodo], { from })
  })
  
  let modified = ''
  
  event('done', (id) => {
    set(() => todos[id].isDone = !todos[id].isDone, { id, from })
  })
  
  event('modify', (id) => {
    set(() => todos[id].isModifying = !todos[id].isModifying, { id, from })
    if (!todos[id].isModifying) {
      set(() => todos[id].title = modified, { id, from })
    }
  })
  
  event('modifyingValue', (e) => {
    modified = e.target.value
  })
  
  return `
     <D_Spacing size=2 />
     <h1>My Todo Component</h1>
     <Form addTodo=addTodo />
     <li
        for="todo in todos"
        d-class="todo.isDone => 'isDone'"
        id='todo'>
         <span if="todo.isModifying == false">
           {todo.title}
         </span>
         <input type='text' oninput="modifyingValue" else/>
        <button 
          onclick='modify:todo.id'
          if="todo.isModifying == false"
          >
          modify
        </button>
       <span onclick="modify: todo.id" else>done</span>
        <input type='checkbox' onclick='done:todo.id' />
    </li>
  `
})