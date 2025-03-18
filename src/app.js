import { create, set, event} from 'diagne' 

export const App = () => {
  
 // setInterval(() => set(() => x += 1), 1000)
  return `
    <a to='/'>
      home
    </a>
    <a to='/users'>
      get started
    </a>
    <a to='/sign-in'>
      sign in
    </a>
    <a to='/users/diagnejs'>
      diagnejs
    </a>
    <a to='/users/bamba'>
      bamba
    </a><br>
    <D_Spacing />
    {x}
    <main id='view'>
    </main>
  `
}                                                                                                                                                                                                                                                                                                                                                                                                                              
