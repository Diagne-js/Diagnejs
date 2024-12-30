import {v} from '../v/v.js'
import {renderObjectsTree} from '../utils/utils.js'

export const attributes = [
 "src",
  "class",
  "id",
  "type",
  "placeholder",
  "value",
  "href",
  "style"
]



export function dynamicAttr(aVal = false) {
  attributes.forEach(attr => {
     document.querySelectorAll(`[d-${attr}]`).forEach(el => {
    
      let value;
       if(!aVal) value = el.getAttribute(`d-${attr}`)
       if(aVal) value = aVal
       let tree = renderObjectsTree(v,false)
       for(const branch of tree){
          value = value.replaceAll(branch.str,branch.value)
       }


       if(!value.includes(":")) {
           if(attr == "class") {
              el.className = value;
           }else if(attr == "src") {
              el.src = value
           }else{
             el[attr] = value;
           }
       }else{
           let [condition, val] = value.spli(":")
           condition = condition.trim()
           if(v[condition]){
               if(attr != "class") el[attr] = val
               if(attr == "class") el.className = val
           }else{
               if(attr == "class") el[attr] = ''
               if(attr == "class") el[attr] = ''
           }
       }


     })
  })
 
}
