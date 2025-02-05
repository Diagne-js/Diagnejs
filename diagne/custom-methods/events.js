import { dEval, usedFrom } from '../utils/utils.js'
import {store, update} from '../reactivity/reactivity.js'

export const eventsStore = []


export const event = (name, handler) => {
  let from = usedFrom(new Error, { useRoot: true, identify: 'yes' })
  eventsStore.push({ name: name, handler: handler, from })
}


export const addEvents = () => {
  const events = Object.keys(window).filter(e => e[0] == "o" && e[1] == "n")
  events.push('set')

  for (let event of events) {
    const targetElements = document.querySelectorAll(`[${event}]`)
    for (const el of [...targetElements]) {
      let value = el.getAttribute(event).split(':')
      let from = 'root'
      if (value[0].includes('/#/')) {
        from = value[0].slice(0, value[0].indexOf('/#/'))
        value[0] = value[0].slice(value[0].indexOf('/#/') + 3).trim()
      }
      
      if (value[0] == 'set') {
         const setter = value[1].trim()
         const key = setter.slice(0, setter.indexOf(' ')).trim()
         const newValue = dEval(setter.slice(setter.indexOf('=')+1,).trim())
         const localStore = from == 'root' ? store.app : store[from]
         const targetIndex = localStore.findIndex(s => s.name == key)
         if (targetIndex > -1) {
            el.onclick = () => {
              localStore[targetIndex].value += newValue
              if (from != 'root') {
                update(key, localStore[targetIndex].value , from)
              }else{
                update(key, localStore[targetIndex].value )
              }
            }
         }
         continue
      }

      if (event == 'onsubmit') {
        onSubmit(value[0], el)
        continue
      }
      const matchedEvent =
        eventsStore.find(eS => eS.name == value[0] && eS.from == from)

      if (!matchedEvent && !value[0].startsWith('set(')) {
        console.error(`the handler ${value[0]} is not found`)
        continue
      }
      if (value[0].startsWith('set(')) {
        continue
      }

      const params = []

      if (value[1]) {
        for (let param of value[1].split(',')) {
          param = param.trim()
          params.push(dEval(param, true, from))
        }
      }

      const handler = matchedEvent.handler

      let paramsStr = handler.toString()
      paramsStr = paramsStr.slice(
        paramsStr.indexOf('(') + 1,
        paramsStr.indexOf(')')
      ).trim()

      const pSplited = paramsStr.split(',').map(p => p.trim())
      el.removeAttribute(event)
      if (paramsStr == 'e') {
        el[event] = (e) => handler(e)
      }
      else if (pSplited[0] == 'e' && params.length > 0) {
        el[event] = (e) => handler(e, ...params)
      }
      else if (pSplited[0] != 'e' && params.length > 0) {
        el[event] = () => handler(...params)
      }
      else if (pSplited[0] != 'e' && params.length == 0) {
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