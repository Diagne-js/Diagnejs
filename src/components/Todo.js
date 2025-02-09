import {component,  set, create, event} from 'diagne'
import './Form.js'

component('Todo', ({$from}) => {
  const from = $from
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
  let newTodo = create('')
  const addTodo = create((newTodo) => {
    set(() => todos = [...todos, newTodo],{from})
  })
  
  let modified = ''
  
  event('done', (id) => set(() => todos[id].isDone = !todos[id].isDone,{id,from}))
  
  event('modify', (id) => {
    set(() => todos[id].isModifying = !todos[id].isModifying, {id,from})
    if (!todos[id].isModifying) {
       set(() => todos[id].title = modified, {id},{from})
    }
  })
  
  let i = 0
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
  
  event('modifyingValue', (e) => {
    modified = e.target.value
  })
  
  return`
     <D_Spacing size=2 />
     <h1>My Todo Component</h1>
    <D_Spacing />
         <input type="text" oninput="writing" /> 
    <button onclick="addTodo"
    d-disabled="newTodo.length == 0" > add </button> 
    { newTodo } 
    <D_Spacing size = 2 / >
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