import { v, observe, set } from '../packages/module.js'
import { welcome } from './components/welcome.js'


v.theme = "light"
v.content = {
  title: "You did it",
  body: `You have joined the freedom and clear js framework       <br> Below is the steps to use 
          <span style='color:var(--primary)'>Diagne js</span>
        `
}
v.changeTheme = () => {
  v.theme = v.theme == 'light' ? 'dark' : 'light'
}

export const App = () => {
  return `
     
    <main d-class="[ theme ]">
       <img src="./src/assets/diagne.png" />
       <button 
       d-click="changeTheme"
       >change theme from { theme }</button>
       ${welcome(v.content)}
    </main>
  `

}
