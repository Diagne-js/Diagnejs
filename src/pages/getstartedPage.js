import {create, set, event} from 'diagne'

export const getStartedPage = () => {
  
  const setProduct = (product) => {
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
   let products = create(['react', 'vue', 'svelte'])
   
   setTimeout(() => set(() => products = [...products, '...processing']),800)
   setTimeout(() => set(() => products[3] = 'diagnejs'),2300)
   
   event('changeProduct', () => {
     product = set('product')
   })
  
    return`<h1>
      Get started with { product }
      <button onclick="changeProduct">
        change product from {product}
      </button>
      <p for="Sproduct in products">{Sproduct}</p>
    </h1>`
}