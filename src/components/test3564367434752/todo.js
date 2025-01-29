import {component, create, set} from 'diagne' 

component('Test', () => {
  let y = create('hello')
  setTimeout(() => set(() => y = 'hey'), 1200)
  return `{y}`
})