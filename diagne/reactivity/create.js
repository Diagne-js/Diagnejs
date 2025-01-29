import {store} from './store.js'
import {renderObjectsTree, usedFrom} from '../utils/utils.js'
  
const declarations = (app) => {
  app = app.toString()
  const findDeclaration = 
   /(const|let)\s+([a-zA-Z_$][\w$]*)\s*=\s*(.+)/g;
   
    const matches = app.match(findDeclaration)
    return matches
  
}

//  <<<<<<<<<_______ 
//    the function that add the names to all variables declared with    create() to the store
// _________>>>>>>>>>>>
export const addNames = (app, component = null, props = {}) => {
  let localStore = store.app
  let i

  if(component) {
    store[component] = []
    localStore = store[component]
  }
  
  if(!declarations(app) && Object.keys(props).length == 0) return
  if (declarations(app)) {
    for(const declaration of declarations(app)){
         if(declaration.includes("create(")) {
              const name = declaration.slice(declaration.indexOf(" "), 
                           declaration.indexOf("=")).trim()
          if(!localStore.find(lS => lS.name == name)) localStore.push({name: name})
         }
    }
  }
  if (component) {
    const propsAdded = renderObjectsTree(props,'props')
    localStore = [...localStore, ...propsAdded]
    store[component] = localStore
    return
  }
    store.app = localStore
}

export const addStorage = (target, name, to) => {
  let localStore = store
  if (to == 'root') {
    localStore = store.app
  }else{
    localStore = store[to]
  }
  
  if (typeof target != 'object') {
     localStore.push({name, value: target})
  }else{
    for (let b of renderObjectsTree(target, name)) {
       localStore.push({name: b.name, value: b.value})
    }
  }
}


//      <<<<<<<<_________ the create function ------->>>>>>>

let createUsedTime = 0

export const create = (init, options = null) => {
  let changeFrom = new Error()
  changeFrom = usedFrom(changeFrom, {identify: 'yes'})
  
    let localStore = store.app
    
    let onComp = false

    if (!changeFrom.includes('Page') && changeFrom != 'app') {
      onComp = true
      changeFrom = changeFrom[0].toUpperCase()+changeFrom.slice(1)
      localStore = store[changeFrom]
    } 
  if (!localStore[0].hasOwnProperty('value')){
      createUsedTime = 0
  }
   const correspondingItem = localStore[createUsedTime]
   correspondingItem.value = init
   
   if (options) {
     if (options.setter) {
       if (options.setter() == 'initial') {
          correspondingItem.setter = () => init
       }else{
         correspondingItem.setter = options.setter
       }
     }
     if (options.keepAlive) {
       correspondingItem.keepAlive = [true, changeFrom]
     }
  }
  
   if(typeof init == 'object' && Object.keys(init).length != 0) {
       for(let b of renderObjectsTree(init,correspondingItem.name, false)){
          localStore.push({value: b.value, name: b.name})
       }
   }
  
   createUsedTime++
  return init
}