import {variablesUsedBy_dFor,dFor} from '../attributes/d-for.js'
import {
  dHide,
  dShow,
  dIf,
  variablesUsedByDynAttributes
} from '../attributes/attributes.js';
import {addEvents} from '../custom-methods/events.js'
import {dEval} from '../utils/d-eval.js'
import {store} from '../reactivity/store.js'
import {updateHTML} from './updateHtml.js'

export const update = (name, newValue, componentName = null) => {
  const localStore = componentName && componentName != 'app' && componentName != 'root' ? store[componentName] : store.app
  variablesUsedBy_dFor.map((v,i) => {
   if (v.name == name && (v.isNum ||  newValue.length != v.length)) {
      update_dFor(v,i)
    }
  })
  
  updateHide(name)
  updateShow(name)
  updateValuesOfDynamicsValue(name,newValue)
  updateHTML(name, newValue, componentName)
  updateHTML(name, newValue, componentName)
}


const update_dFor = (key,i) => {
  document.querySelectorAll(`[data-for="${key.name}"]`).forEach(item => {
          item.outerHTML = key.template
          dFor(i)
   })
   addEvents()
}


const updateHide = (key) => {
  document.querySelectorAll(`[data-hide]`).forEach(el => {
     let value = el.getAttribute('data-hide')
     if (value.includes(key)) {
       const condition = dEval(value)
       el.style.display = condition ? 'none' : ''
     }
  })
}



const updateShow = (key) => {
  document.querySelectorAll(`[data-show]`).forEach(el => {
     let value = el.getAttribute('data-show')
     if (value.includes(key)) {
       const condition = dEval(value)
       
       if (el.hasAttribute('transition')) {
         const transitionName = el.getAttribute('transition')
         
          if (condition && el.style.display == 'none') {
            el.classList.add(`d-tran-${transitionName}-coming`)
            setTimeout(() => el.classList.remove(`d-tran-${transitionName}-coming`), 100)
          }
          
          else if (!condition && el.style.display != 'none') {
            
            el.classList.add(`d-tran-${transitionName}-leaving`)
            const initH = getComputedStyle(el).height
            
            setTimeout(() => {
                el.classList.remove(`d-tran-${transitionName}-leaving`)
               el.style.display = 'none'

            }, 200)
            return
          }
       
      }
          el.style.display = condition ? '' : 'none'
     }
  })
}

const updateValuesOfDynamicsValue = (key,newValue) => {
   for (let i in variablesUsedByDynAttributes) {
     const v = variablesUsedByDynAttributes[i]
     if (v.prop == 'disabled') {
       v.el.disabled = false
       v.el.style.opacity = 1
       if (dEval(v.condition)) {
         v.el.disabled = true
         v.el.style.opacity = 0.5;
       }
     }else if (v.variableName != key && v.condition.includes(key)) {
         if (dEval(v.condition)) {
             v.el.setAttribute(v.prop, v.value)
         }else{
           v.el.setAttribute(v.prop, '')
         }
      }else if (v.variableName == key && 
          v.condition == 'the default value: true') {
                  v.el.setAttribute(v.prop, newValue)
      }else if (v.variableName == key && 
                 v.condition != 'the default value: true'){
             if (dEval(v.condition)) {
               v.el.setAttribute(v.prop, newValue)
             }
             v.value = newValue 
      }
   }
}