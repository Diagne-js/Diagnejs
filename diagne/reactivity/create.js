import {store} from './store.js'
import {renderObjectsTree} from '../utils/utils.js'
  
const declarations = (app) => {
  app = app.toString()
  const findDeclaration = 
   /(const|let)\s+([a-zA-Z_$][\w$]*)\s*=\s*(.+)/g;
   
    const matches = app.match(findDeclaration)
    
    return matches
}
  
export const addNames = (app) => {
  
    for(const declaration of declarations(app)){
         if(declaration.includes("create(")) {
              const name = declaration.slice(declaration.indexOf(" "), 
                           declaration.indexOf("=")).trim()
              store.push({name: name})
         }
    }
    
}


let createUsedTime = 0


export const create = (init) => {
  if(init == 3) console.log(store)
  if (store.length == 1) {
      createUsedTime = 0
  }
  
  const correspondingItem = store[createUsedTime]
  
   correspondingItem.value = init
   
   if(typeof init == 'object' && Object.keys(init).length != 0) {
 
       for(let b of renderObjectsTree(init,correspondingItem.name)){
          store.push({value: b.value, name: b.name})
       }
   }
   
   createUsedTime++
  //if(init == 3) console.log(store)
  return init
}