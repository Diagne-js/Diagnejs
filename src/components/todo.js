import {create, set, event} from 'diagne'

export const Todo = (props) => {
  let todos = create([])
  let newTodo = create('')
  event('addTodo', () => {
    set(() => todos = [newTodo, ...todos]  )
  })
  
  event('input', (e) => set(() => newTodo = e.target.value))
  
  return `

  
    <h1>
      todo list
    </h1>
    
    <input type='text' oninput='input' d-placeholder="props.placeholder">
    <button onclick='addTodo'>
      add
    </button>
      <ul>
          <li for="todo in todos">
             {todo}
          </li>
      </ul>
  `
}