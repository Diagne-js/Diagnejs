import {store} from './store.js'

export const bindValues = (target, Store = null) => {
  
  if (Store != null) {
    
    const componentName = Store.componentName

    for(let stocked of Store.variables){
      target = target.replaceAll(`{${stocked.name}}`,
      `<span data-binding="${componentName}.${stocked.name}">${stocked.value}</span>`)
    
    }
    return target
  }
  
for(let stocked of store){
   target = target.replaceAll(`{${stocked.name}}`, `<span data-binding="${stocked.name}">${stocked.value}</span>`)
    
  }
  
  return target
}