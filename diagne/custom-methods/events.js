import {dEval} from '../utils/d-eval.js'

export const eventsStore = []


export const newEvent = (handler,name) => {
   eventsStore.push({name: name, handler: handler})
}
  
  
  export const addEvents = () => {
   
   const events = Object.keys(window).filter(e => e[0]=="o" && e[1] == "n").map(e => e = e.slice(2, e.length))
   
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
         
      const onevent = 'on'+event
      el[onevent] = (event) => matchedEvent.handler(params,event)
     
      })
   }
   
  }
