import {create, set, event, redirect} from 'diagne'

export const notFoundPage = (path) => {
  let url = ''
 
  event('writting',(e) => url = e.target.value)
  
  event('go', () => redirect(url))
  return `
    <D_Spacing size=2 />
    <h1 style="text-align: center">
      page not found
    </h1>
    <p>
      Your requested page ${path} is not found 
    </p>
    
    <D_Spacing size=3 />
    
    <p>
      Are you looking for another page
    </p>
    <input
         type='text'
         oninput='writting'
         placeholder="enter the url without diagnejs.com">
    <button onclick='go'>
      goooo !
    </button>
  `
}