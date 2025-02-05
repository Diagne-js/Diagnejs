import {component,  set, create, event} from 'diagne'
import './Form.js'

component('Todo', () => {
  let todos = create([
    {
      title: 'test',
      isDone: false,
      isModifying: false,
      id: 0
    }
  ])
  const isDoneStyle = create(`
      opacity: 0.5;
  `)
  const addTodo = create((newTodo) => {
    set(() => todos = [...todos, newTodo])
  })
  
  let modified = ''
  
  event('done', (id) => set(() => todos[id].isDone = !todos[id].isDone,{id}))
  
  event('modify', (id) => {
    set(() => todos[id].isModifying = !todos[id].isModifying, {id})
    if (!todos[id].isModifying) {
       set(() => todos[id].title = modified, {id})
    }
  })
  
  event('modifyingValue', (e) => {
    modified = e.target.value
  })
  
  return`
     <D_Spacing size=2 />
     <h1>My Todo Component</h1>
    <D_Spacing />
     <Form addTodo=addTodo />
     <li
        for="todo in todos"
        d-class="todo.isDone => 'isDone'"
        id='todo'>
         <span if='todo.isModifying == false'>
           {todo.title}
         </span>
         <input type='text' oninput="modifyingValue" else/>
        <button onclick='modify:todo.id'>
          <span if='todo.isModifying == false'> modify</span>
          <span else>ok</span>
        </button>
        <input type='checkbox' onclick='done:todo.id' />
    </li>
     
  `
})