import {create, set, event, component} from 'diagne'
import './form.js'
import './test3564367434752/todo.js'

component('Todo', (props) => {
   const todos = create([1,2])
   let player = create('messie')
   setInterval(() => set(() => player = 'Ronaldo'), 1000)
  return `
     <h1>my todo component</h1>
     { props.player }
     <Form placeholder='add a new todo' player=player />
     <Test />
     { player }
  `
})