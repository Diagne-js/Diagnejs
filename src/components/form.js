import {component, event, create, set} from 'diagne'

component('Form', (props) => {
  let newTodo = create("")
  
  event('Input', (e) => {
      set(() => newTodo = e.target.value)
  })
  
  event('play', () => console.log('you are playing'))
  
  return`
    <input oninput="Input" d-placeholder='props.placeholder'/><br>
    <div if="newTodo"> 
     <h5>writing todo: { newTodo }</h5>
    </div>
    <div else style="text-align: center">
       write a new todo
    </div>
    <span onclick="play">play</span>
    
    <div for="t of props.todos">
      n° {t}
    </div>
  `
})