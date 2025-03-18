import { dEval, usedFrom } from '../utils/utils.js'
import {store, effects} from '../reactivity/reactivity.js'
import {addEvents} from '../custom-methods/events.js'
import {dFor} from './attributes.js'

export const dIf = () => {
  document.querySelectorAll('[if]').forEach(el => {
      let input = el.getAttribute("if")
      let From = 'app'
      let lS = store.app
      el.removeAttribute('if')
      
      if (input.includes('/#/')) {
         [From, input] = input.split('/#/').map(i => i.trim())
        lS = store[From]
      }
      console.log(input)
      let toTrack = lS.filter(s => input.includes(s.name))
           .map(s => s.name)
      console.log(toTrack)
      const condition = () => dEval(input,0,From)
      const comment = document.createComment('condition')
      let parent = el.parentElement
      
      if (!parent) return
      
      if (el.nextElementSibling && el.nextElementSibling.hasAttribute('else')) {
        const elseEl = el.nextElementSibling
        elseEl.removeAttribute('else')
        const elsecomment = document.createComment('else')
        if (condition()) {
          parent.replaceChild(elsecomment, elseEl)
        }
        effects.push({
        callback: () => {
          if (!parent) return
          
          if (!condition() && parent.contains(elsecomment)) {
            parent.replaceChild(elseEl, elsecomment)
            addEvents()
            updateHtml(elseEl, lS)
            dFor()
          } else if (condition() && parent.contains(elseEl)) {
             parent.replaceChild(elsecomment, elseEl)
          }
        },
        dependences: toTrack,
        from: From 
      })
      }
      
      if (!condition()) {
        parent.replaceChild(comment, el)
      }
      
      effects.push({
        callback: () => {
          if (!parent) return
          if (!condition() && parent.contains(el)) {
            parent.replaceChild(comment, el)
          } else if (condition() && parent.contains(comment)) {
            parent.replaceChild(el, comment)
            addEvents()
            updateHtml(el, store[From])
            dFor()
          }
        },
        dependences: toTrack,
        from: From 
      })
    
  })
}

const updateHtml = (el, localStore) => {
  el.querySelectorAll('[data-binding]').forEach(d => {
    const bindTo = d.getAttribute('data-binding')
    setTimeout(() => {
      let matchedValue = localStore.find(s => s.name == bindTo).value
    d.innerText = matchedValue
    },10)
  })
}