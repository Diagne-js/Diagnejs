import {effects, render} from './reactivity.js'
import {update} from './update.js'
import {store as vStore} from './store.js'
import {renderObjectsTree, dIndexOf} from '../utils/utils.js'
import {componentsName} from '../components/find-components.js'


  
export const set = (callback, options = null) => {
  
  let changeFrom = new Error()
  changeFrom = changeFrom.stack.slice(
              dIndexOf(changeFrom.stack,' at ', 2),
              dIndexOf(changeFrom.stack,' at ', 3),
      )
      
  changeFrom = changeFrom.slice(
                changeFrom.lastIndexOf('/')+1,
                changeFrom.indexOf('.js')
     ).trim()
     

 let store = vStore
 
 let componentName = null

 if (!changeFrom.includes('Page') && changeFrom != 'app') {
     const i = store.findIndex(s => s.componentName === changeFrom)
     componentName = store[i].componentName
     store = store[i].variables
 }
 if (typeof callback == 'string') {
   const target = callback 
   const i = store.findIndex(s => s.name == target)
   const newValue = store[i].setter()
   
   store[i].value = newValue 
   
   if(componentName) update(target,newValue, componentName)
   if(!componentName) update(target,newValue)
  
   if(!effects) return
   for(const effect of effects){
      effect()
   }
   return newValue
 }
  
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
  
    if (!stocked.componentName && typeof newValue == 'object' && 
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
  

  if(componentName) update(key,newValue, componentName)
  if(!componentName) update(key,newValue)
  
  if(!effects) return
  for(const effect of effects){
    effect()
  }
}
 
 