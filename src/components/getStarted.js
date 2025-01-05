import {reUse, create} from 'diagne'

export const GetStarted = () => {
  
  const player = create('hi')
  
  return`
      {player}
     <section class="getStarted">
         learn diagne.js at <a href="https://diagnejs.netlify.app">diagne.js website</a>
      </section>
  `
}
