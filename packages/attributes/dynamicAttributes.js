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



export function dynamicAttr() {
  attributes.forEach(attr => {
     document.querySelectorAll(`[d-${attr}]`).forEach(el => {
       let value = el.getAttribute(`d-${attr}`)
       if(!value.includes(":")) {
         let tree = renderObjectsTree(v,false)
         for(const branch of tree){
           value = value.replaceAll(`[ ${branch.str} ]`,branch.value)
         }
        if(attr == "class") {
           el.className = value;
        }else if(attr == "src") {
          el.src = value
          el.databinding = "value"
        }else{
           el[attr] = value;
        }
       }
     })
  })
 
}
