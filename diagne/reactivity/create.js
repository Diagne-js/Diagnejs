import {store} from './store.js'
import {renderObjectsTree, dIndexOf} from '../utils/utils.js'
  
const declarations = (app) => {
  app = app.toString()
  const findDeclaration = 
   /(const|let)\s+([a-zA-Z_$][\w$]*)\s*=\s*(.+)/g;
   
    const matches = app.match(findDeclaration)
    
    return matches
}
  
export const addNames = (app, prop = null) => {
  
  let localStore = store
  
  let i

  if(prop) {
    i = store.findIndex(s => s.componentName === prop)
  
    localStore = store[i].variables
  }
  
    
    for(const declaration of declarations(app)){
         if(declaration.includes("create(")) {
              const name = declaration.slice(declaration.indexOf(" "), 
                           declaration.indexOf("=")).trim()
              localStore.push({name: name})
         }
    }
  if (prop) {
    store[i].variables = [...localStore]
    return
  }
  store.push(...localStore)
  
}


let createUsedTime = 0


export const create = (init) => {
  
  let changeFrom = new Error()
  changeFrom = changeFrom.stack.slice(
     dIndexOf(changeFrom.stack, ' at ', 2),
     dIndexOf(changeFrom.stack, ' at ', 3),
   )
   
  changeFrom = changeFrom.slice(
     changeFrom.lastIndexOf('/') + 1,
    changeFrom.indexOf('.js')
  ).trim()
  
    let localStore = [...store]
    
    
    let i = null

    if (changeFrom != 'app') {
      i = store.findIndex(s => s.componentName === changeFrom)
      localStore = localStore[i].variables
      if (!localStore[0].value) {
        createUsedTime = 0
      }
    } 
     
  if (localStore.length == 1 && changeFrom == 'app') {
      createUsedTime = 0
  }
  
  
  
  const correspondingItem = localStore[createUsedTime]
  
   correspondingItem.value = init
   
   
   if(typeof init == 'object' && Object.keys(init).length != 0) {
       for(let b of renderObjectsTree(init,correspondingItem.name)){
          localStore.push({value: b.value, name: b.name})
       }
   }
   createUsedTime++
   
  if (i != null) {
    store[i].variables = [...localStore]
     return init
  }
  
   store.length = 0;
   store.push(...localStore)
   
  return init
}