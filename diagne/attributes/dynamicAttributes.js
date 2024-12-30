import {store} from '../reactivity/store.js'
import {dEval} from '../utils/d-eval.js'


export const targetAttributes = [
   'class',
   'id',
   'value',
   'type',
   'placeholder',
   'disabled',
   'style'
]


export const variablesUsedByDynAttributes = []


export const useDynamicsAttributes = () => {
for(const attr of targetAttributes){
   document.querySelectorAll(`[d-${attr}]`).forEach(el => {
      const val = el.getAttribute(`d-${attr}`)
      
      let condition = 'the default value: true'
      let bruteCondition = condition
      let value = val
      
      if (val.includes('=>')) {
        condition = dEval(val.split('=>')[0])
        bruteCondition = val.split('=>')[0].trim()
        value = val.split('=>')[1].trim()
      }
      
      if (attr == 'disabled') {
        condition = dEval(val)
        bruteCondition = val
        
      }
      
      const dynamicValue = attr != 'disabled' ? 
       store.find(s => s.name == value).value  : condition
  
      if (condition) {

        if(attr != 'disabled') el.setAttribute(attr, dynamicValue)
        if(attr == 'disabled') el.disabled = true
      }else{
        if(attr == 'disabled') el.disabled = false
      }
      
      el.removeAttribute('d-'+ attr)
      
      variablesUsedByDynAttributes.push({
           prop: attr,
           el: el,
           condition: bruteCondition,
           value: dynamicValue,
           variableName: attr != 'disabled' ? 
              store.find(s => s.name == value).name :
              null
      })
      bruteCondition = ''
   })
}
}
