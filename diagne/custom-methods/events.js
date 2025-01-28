import {dEval, usedFrom } from '../utils/utils.js'

export const eventsStore = []


export const event = (name, handler) => {
   let from = usedFrom(new Error, {useRoot: true})
   eventsStore.push({name: name, handler: handler, from})
}
  
  
  export const addEvents = () => {
   const events = Object.keys(window).filter(e => e[0]=="o" && e[1] == "n")
   
   for (let event of events) {
     const targetElements = document.querySelectorAll(`[${event}]`)
      for(const el of [...targetElements]) {
         let value = el.getAttribute(event).split(':')
         let from = 'root'
         if (value[0].includes('/#/')) {
           from = value[0].slice(0,value[0].indexOf('/#/'))
           value[0] = value[0].slice(value[0].indexOf('/#/')+3).trim()
         }
         
         if (event == 'onsubmit') {
           onSubmit(value[0], el)
           continue
         }
         
         const matchedEvent =
      eventsStore.find(eS => eS.name == value[0] && eS.from == from)
         
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
          el[event] = (e) => handler(e, ...params)
        }
        else if (pSplited[0] != 'e' && params.length > 0) {
          el[event] = () => handler(...params)
        }
        else if(pSplited[0] != 'e' && params.length == 0){
          el[event] = () => handler()
        }
      }
   }
  }

const onSubmit = (value, el) => {
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