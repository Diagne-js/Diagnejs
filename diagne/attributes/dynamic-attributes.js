import { store as globalStore } from '../reactivity/store.js'
import { dEval } from '../utils/d-eval.js'


export const targetAttributes = [
   'class',
   'id',
   'value',
   'type',
   'placeholder',
   'disabled',
   'style',
   'href',
   'src',
   'to'
]


export const variablesUsedByDynAttributes = []

export const useDynamicsAttributes = () => {

  for (const attr of targetAttributes) {

    document.querySelectorAll(`[d-${attr}]`).forEach(el => {
      let store = globalStore.app
      let compName = null
      let val = el.getAttribute(`d-${attr}`)

      if (val.includes('/#/')) {
        compName = val.split('/#/')[0].trim()
        store = globalStore[compName]
      }

      let condition = 'the default value: true'
      let bruteCondition = condition
      let value = val

      if (val.includes('=>')) {
        condition = dEval(val.split('=>')[0].trim())
        bruteCondition = val.split('=>')[0].trim()
        value = val.split('=>')[1].trim()
      }


      if (attr == 'disabled') {
        condition = dEval(val)
        bruteCondition = val

      }

      let isReactive = false

      let dynamicValue

      if (store.find(s => s.name == value)) {
        dynamicValue = store.find(s => s.name == value).value
        isReactive = true
      } else if (value[0] == "'" || value[0] == `"`) {
        value = value.slice(1, value.length - 1).trim()
        dynamicValue = value
      }

      if (condition) {
        if (attr != 'disabled') el.setAttribute(attr, dynamicValue)
        if (attr == 'disabled') {
          el.disabled = true
          el.style.opacity = 0.5;
        }
      } else if (attr == 'disabled') {
           el.disabled = false
      }

      el.removeAttribute('d-' + attr)
      variablesUsedByDynAttributes.push({
        prop: attr,
        el: el,
        condition: bruteCondition,
        value: dynamicValue,
        variableName: isReactive ?
          store.find(s => s.name == value).name : 'anything',
        dependences: attr == 'style' ? store.filter(s => dynamicValue.includes(s.name)).map(s => s.name) : []
      })
      
      bruteCondition = ''
    })
  }
}