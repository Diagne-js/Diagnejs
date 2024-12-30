import {v} from '../v/v.js'
import {observe} from '../customMethods/proxy.js'
import {renderObjectsTree} from '../utils/utils.js'
import {dynamicAttr} from './dynamicAttributes.js'

export default function dFor() {
  document.querySelectorAll("[d-for]").forEach(function(el) {
   let [itemName, iterableStr] = el.getAttribute("d-for").split(" in ")
   iterableStr = iterableStr.trim()
   itemName = itemName.trim()
   
   let iterable = v[iterableStr]
  
   const innerBase = el.parentElement.innerHTML
  el.parentElement.innerHTML = addEls(iterable,el.parentElement,itemName,innerBase)
  
   el.style.display="none"
  observe(() => {
     dFor()
  },iterableStr)
 })
}


function addEls(obj,parent,itemName,innerBase) {
const inner = innerBase
let finalHtml = ''

for (let [index,item] of obj.entries()) {

  if (typeof item == 'object'){
      const tree = renderObjectsTree(item,itemName)
      for(let branch of tree) {
         innerBase = innerBase.replaceAll(`{ ${branch.str} }`,branch.value)
     }
   finalHtml += innerBase
   innerBase = inner
  }
  else{
    innerBase = innerBase.replaceAll(`{ ${itemName} }`, item)
    finalHtml += innerBase
    innerBase = inner
   }
   
}
   return finalHtml
}