import {dEval} from '../utils/d-eval.js'

export const eventsStore = []


export const event = (name, handler) => {
   eventsStore.push({name: name, handler: handler})
}
  
  
  export const addEvents = () => {
   
   const events = Object.keys(window).filter(e => e[0]=="o" && e[1] == "n")
   
   for (let event of events) {
      
      document.querySelectorAll(`[${event}]`)
      .forEach(el => {
        
         let value = el.getAttribute(event).split(':')
         
         const matchedEvent =
         eventsStore.find(eS => eS.name == value[0])
         
         
         
         const params = []
         
         
         if (value[1]) {
           for (let param of value[1].split(',')) {
            params.push(param)
           }
         }
         
         const handler = matchedEvent.handler
         
        let paramsStr = handler.toString()
        paramsStr = paramsStr.slice(
                     paramsStr.indexOf('(') + 1,
                     paramsStr.indexOf(')')
              ).trim()
              
        const pSplited = paramsStr.split(',').map(p => p.trim())
              
        if (paramsStr == 'e') {
           el[event] = (e) => handler(e)
        }
        else if (pSplited[0] == 'e' && params.length > 0) {
          el[event] = (e) => handler(e, ...paarams)
        }
        else if (pSplited[0] != 'e' && params.length > 0) {
          el[event] = (e) => handler(...params)
        }
        else{
          el[event] = (e) => handler()
        }
        
        
         
        
     
      })
   }
   
  }
