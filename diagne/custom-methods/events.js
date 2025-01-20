import {dEval, dIndexOf } from '../utils/utils.js'

export const eventsStore = []


export const event = (name, handler) => {
   eventsStore.push({name: name, handler: handler})
}
  
  
  export const addEvents = () => {
   
   const events = Object.keys(window).filter(e => e[0]=="o" && e[1] == "n")
   
   for (let event of events) {
      for(const el of [...document.querySelectorAll(`[${event}]`)]) {
         let value = el.getAttribute(event).split(':')
         
         if (event == 'onsubmit') {
           onSubmit(value[0], el)
           continue
         }
         
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
      }
   }
  }

const onSubmit = (value, el) => {m
  let prevent = false
  if (value.includes('-prevent')) {
    prevent = true
    value = value.slice(0, value.indexOf('-prevent')).trim()
  }
  
  const matchedEvent =
         eventsStore.find(eS => eS.name == value)
  
  const data = {}
         
  const submitBtn = el.querySelector("input[type='submit']")
  
  const inputs = el.querySelectorAll('[name]')
         
  el.onsubmit = (e) => {
    if (prevent) {
      e.preventDefault()
    }
    inputs.forEach((input) => {
    const name = input.getAttribute('name')
    data[name] = input.value
  })
    matchedEvent.handler(data)
  }
}