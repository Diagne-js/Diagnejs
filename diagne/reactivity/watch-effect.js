import {store} from './store.js'
import {usedFrom} from '../utils/utils.js'

export const effects = [];

export const newWatch = (callback, options) => {
  const str = callback.toString()
  let from = options && options.from ? 
             options.from : usedFrom(new Error, {useRoot: true})
  const localStore = from == 'root' ? store.app : store[from]
  let dependences = []
  localStore.map(s => s = s.name).forEach(s => {
    if (str.includes(s)) {
      dependences.push(s)
    }
  })
  
  
  if (dependences.length == 0) {
    dependences = 'all'
  } else if (dependences.length > 0) {
    for (let dp of dependences) {
       if (str.includes(dp+ ' = ')) {
         dependences = dependences.filter(d => d != dp)
       }
    }
  }
  
  if (options) {
     if(options.callNow) callback()
     if(options.all) dependences = 'all'
     if(options.dependences) dependences = options.dependences
  }
   effects.push({callback, dependences, from }) 
 }