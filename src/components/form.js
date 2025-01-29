import {component, event, create, set} from 'diagne'

component('Form', (props) => {
  let newTodo = create("")
  console.log(props)
  event('Input', (e) => {
      set(() => newTodo = e.target.value)
  })

  return`
    <input oninput="Input" d-placeholder='props.placeholder'/><br>
    <div if="newTodo"> 
     <h5>writing todo: { newTodo }</h5>
    </div>
    <div else style="text-align: center">
       write a new todo
    </div>
    <br>
    player : {props.player}
    <br>
  `
})