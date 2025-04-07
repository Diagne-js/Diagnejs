import Nav from "Nav.di"

export default () => {
    let todos = newReactive([]);
    let newTodo = newReactive('')
    let isWritting = newDerived(() => newTodo.trim() != '')
    console.log(isWritting)
    let isDark = true

    const addTodo = (newTodo) => {
       set todos = prev => {
         prev.push({
            title: newTodo,
            completed: false,
            id: Date.now()
         })
        return prev
      }
      set newTodo = ''
    }
    
    const remove = (todo, i) => {
      set todos = todos.filter(t => t.id != todo.id)
    }

  return <template>
   <main style="background: {isDark ? 'black' : 'white'};height:100vh">
    <Nav />
    <h1 style='padding:40px 0; text-align:center'>My Todo List App</h1>
    <div style='display:flex; justify-content:center;gap:5px'>
    <input type="text" d-model={newTodo} 
    style='width:200px;padding:5px;border-radius:6px;border:solid 2px rgb(180,180,190);'/>
    <button 
    onclick={() => addTodo(newTodo)}
    style='width:50px;background:lightgray;'
    disabled='{!isWritting}'
    >add</button><br>
    </div>
    <p d-if={!isWritting}>Add a new todo !</p>
    {newTodo}
    <ul>
      <li d-for={todo in todos, todo.id}>
        { todo.title} {todo.completed}
        <button
        >👌</button>
         <button onclick={() => remove(todo,i)}>
            remove
         </button>
      </li>
    </ul>
    </main>
  </template>
}