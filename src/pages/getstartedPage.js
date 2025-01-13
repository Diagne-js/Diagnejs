import {create, set, event} from 'diagne'

export const getStartedPage = () => {
  
  const setProduct = () => {
    if (product == 'diagne js') {
        return 'react'
      }
    else if (product == 'react') {
        return 'vue'
      }
    else if (product == 'vue') {
        return 'svelte'
      }
    else if (product == 'svelte') {
        return 'diagne js'
       }
  }
  
   let product = create('diagne js',{setter: setProduct})
   
   event('changeProduct', () => {
     product = set('product')
   })
  
    return`<h1>
      Get started with { product }
      <button onclick="changeProduct">
        change product from {product}
      </button>
    </h1>`
}