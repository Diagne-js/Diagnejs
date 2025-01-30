import {store} from './store.js'

export const effects = [];

export const newWatch = (callback, options) => {
  const str = callback.toString()
  let dependences = []
  store.app.map(s => s = s.name).forEach(s => {
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
  }
   effects.push({callback, dependences }) 
 }