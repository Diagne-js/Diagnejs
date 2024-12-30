import {store} from './store.js'

export const bindValues = (target) => {
for(let stocked of store){
    target = target.replaceAll(`{${stocked.name}}`, `<span data-binding="${stocked.name}">${stocked.value}</span>`)
  }
  
  return target
}