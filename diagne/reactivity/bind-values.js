import {store} from './store.js'
import {dEval} from '../utils/utils.js'

export const bindValues = (target, Store = null) => {
  const findDynamicHtml = /\{([^{}]*)\}/g
  
  const dynamicsHtml = target.match(findDynamicHtml)
  
  if(!dynamicsHtml) return target
  
  for (let dynHtml of dynamicsHtml) {
    
    let name = dynHtml.slice(1, dynHtml.length - 1).trim()

     if (Store != null) {
         const componentName = Store.componentName
         let value = dEval(componentName + '| ' + name, false)
         if (value != undefined) {
           target = target.replace(dynHtml,
                   `<span data-binding="${componentName}.${name}">${value}</span>`)
        }
     }else{
       let value = dEval(name, false)
        if(value != undefined) {
           target = target.replace(dynHtml, 
         `<span data-binding="${name}">${value}</span>`)
        }
     }
}
  return target
}