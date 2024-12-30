import { effects} from './watch-effect.js'
import {update} from './update.js'
import {store} from './store.js'
import renderObjectsTree from '../utils/render-tree-of-object.js'



export const create = (init,name) => {
 
 let existingAlright = false
 
  for (let i in store) {
    const stocked = store[i]
    if (stocked.name == name) {
      throw new SyntaxError(`the variable ${name} is already assigned`)
    }
  }
  if(!existingAlright) store.push({value: init, name: name})
  
   if(typeof init == 'object' && Object.keys(init).length != 0) {
 
   for(let b of renderObjectsTree(init,name)){
      store.push({value: b.value, name: b.name})
   }
 }
  
  return init
}
  
  
  
  
  
export const set = (callback, options = null) => {

  const setter = callback();
   
  const stringify = `${callback}`
  
  let action = 
  stringify.slice(stringify.indexOf("=>")+2,stringify.length).trim()
  
  if (options) {
     const keys = Object.keys(options)
     for (let key of keys) {
       action = action.replaceAll(key, options[key])
     }
  }

  
  let key;
  
  
  let newValue = setter
  
  if (action.includes('+=')) {
    key = action.slice(0, action.indexOf("+=")).trim()
  }else if(action.includes('-=')) {
    key = action.slice(0, action.indexOf("-=")).trim()
  }else if (action.includes('*=')) {
      key = action.slice(0, action.indexOf("*=")).trim()
   }else if (action.includes('/=')) {
      key = action.slice(0, action.indexOf("/=")).trim()
   }else{
     key = action.slice(0, action.indexOf("=")).trim()
   }


  
 for(let i in store){
    const stocked = store[i]
  
    if (typeof newValue == 'object' && 
        Object.keys(newValue).length > 
        Object.keys(stocked.value).length && key == stocked.name) {
        
        let treeOfNewValue = renderObjectsTree(newValue[newValue.length-1], `${key}[${stocked.value.length}]`)
          for (let b of treeOfNewValue) {
            store.push({name: b.name, value: b.value})
          }
       
    }
        if(stocked.name == key && stocked.value != newValue) {
      store[i].value = newValue
    }
  } 
  
  
  update(key,newValue)
  
  for(const effect of effects){
    effect()
  }
}
 
 