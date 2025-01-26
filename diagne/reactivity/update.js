import {variablesUsedBy_dFor,dFor} from '../attributes/d-for.js'
import {
  dHide,
  dShow,
  dIf,
  dIfStore,
  variablesUsedByDynAttributes
} from '../attributes/attributes.js';
import {addEvents} from '../custom-methods/events.js'
import {dEval} from '../utils/d-eval.js'
import {store} from '../reactivity/store.js'
import {updateHTML} from './updateHtml.js'



export const update = (name, newValue, componentName = null) => {
  
  const localStore = store[componentName] || store.app
  
  variablesUsedBy_dFor.find((v,i) => {
   if (v.name == name && Object.keys(newValue).length != v.length) {
      update_dFor(v,i)
    }
  })
  
  updateHide(name)
  updateShow(name)
  updateIf(name, componentName)
  updateValuesOfDynamicsValue(name,newValue)
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
       if (dEval(v.condition)) {
         v.el.disabled = true
       }
     }else if (v.variableName == "anything") {
         if (dEval(v.condition)) {
             v.el.setAttribute(v.prop, v.value)
         }else{
           v.el.setAttribute(v.prop, '')
         }
      }else if (v.variableName == key && 
          v.condition == 'the default value: true') {
                  v.el.setAttribute(v.prop, newValue)
      }else if (v.variableName != key && 
                v.condition.includes(key)) {
                  
            if (dEval(v.condition)) {
                v.el.setAttribute(v.prop, v.value)
            } else {
                  v.el.setAttribute(v.prop, '')
            }
      } else if (v.variableName == key && 
                 v.condition != 'the default value: true'){
             v.el.setAttribute(v.prop, newValue)
             v.value = newValue 
      }
   }
}


const updateIf = (name, from) => {
  if (from == null) {
    from = 'app'
  }
  
  const ref = dIfStore.find(r => r.from == from && r.condition.includes(name))
  if (ref) {
     if (dEval(ref.condition)) {
             if(!ref.parent.contains(ref.target))  ref.parent.insertBefore(ref.target, ref.ref)
        if (ref.ref.hasAttribute('else')) ref.ref.remove()
     }else{
       if (ref.ref.hasAttribute('else')) ref.target.insertAdjacentElement('afterend', ref.ref)
      if(ref.parent.contains(ref.target)) ref.target.remove()
     }
  }
}