import {effects, render} from './reactivity.js'
import {update} from './update.js'
import {store as vStore} from './store.js'
import {renderObjectsTree, usedFrom} from '../utils/utils.js'


  
export const set = (callback, options = null) => {
  
  let changeFrom = new Error()
  changeFrom = usedFrom(changeFrom)
  
  console.log(changeFrom)

 let store = vStore
 let oldValue
 
 let componentName = null

 if (!changeFrom.includes('Page') && changeFrom != 'app') {
     componentName = changeFrom[0].toUpperCase()+changeFrom.slice(1)
     store = store[componentName]
 }else{
   store = vStore.app
 }
 

 
 if (typeof callback == 'string') {
   const target = callback 
   const stockedIndex = store.findIndex(s => s.name == target)
   const stocked = store[stockedIndex]
   const newValue = stocked.setter(stocked.value)
   oldValue = stocked.value 
   stocked.value = newValue
   
   if(componentName) update(target,newValue, componentName)
   if(!componentName) update(target,newValue)
   useEffects(target, newValue, oldValue)
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
   }else if(action.includes('=')){
     key = action.slice(0, action.indexOf("=")).trim()
   }
       const stockedIndex = store.findIndex(s => s.name == key)
       const stocked = store[stockedIndex]
       
       if(!stocked) return
       
       oldValue = stocked.value
  
    if (newValue && typeof newValue == 'object' && 
        Object.keys(newValue).length > 
        Object.keys(stocked.value).length && key == stocked.name) {
        
        let treeOfNewValue 
        if (typeof newValue[newValue.length - 1] == 'object') {
          treeOfNewValue = renderObjectsTree(newValue[newValue.length-1], `${key}[${stocked.value.length}]`)
        } else {
          treeOfNewValue = [{name:`${key}[${stocked.value.length}]`, value: newValue[newValue.length - 1]}]
        }
          for (let b of treeOfNewValue) {
         if(!store.find(s => s.name == b.name)) store.push({name: b.name, value: b.value})
          }
  } 
  
      stocked.value = newValue

  if(componentName) update(key,newValue, componentName)
  if(!componentName) update(key,newValue)
  
  useEffects(key,newValue, oldValue)
}

const useEffects = (key, newValue,oldValue) => {
   if(!effects) return
  for(const effect of effects){
    if (effect.dependences == 'all') {
       effect.callback(oldValue,  newValue,  key)
       continue
    }
    if (effect.dependences.find(d => d == key)) {
      effect.callback(oldValue,  newValue, key)
    }
  }
}