import {dIf,dBind,dFor} from '../attributes/attributes.js'
import {renderObjectsTree} from '../utils/utils.js'
import {attributes} from '../attributes/attributes.js'

export let v = {}

function makeReactive(obj,callback) {
  return new Proxy(obj, {
    set(target, key, value) {
      callback(key, target[key], value);
      target[key] = value;
      dIf();
      dBind()  
      return true;
    },
  });
}
 v = makeReactive(v, (key,old, value) => renderNewValue(key,old,value));
 
 
 
 function renderNewValue(variableName, oldValue,newValue) {
  document.querySelectorAll(`[data-binding="${variableName}"]`).forEach((el) => {
    el.textContent = newValue;
  });

    for(const attr of attributes){
  document.querySelectorAll(`[d-${attr} = '[ ${variableName} ]']`).forEach(el => {
        if(attr === "source") {
      const ref = oldValue.slice(oldValue.indexOf("/"),oldValue.length) 
          if(el.src.includes(ref)) {
              el.src = newValue
             //  console.log(newValue);
           }
         }
        else if(attr === "class") {
          if(el.className.includes(oldValue)) {
          el.className = el.className.replaceAll(oldValue, newValue)
         }
         return                
        }else{
          if(el[attr].includes(oldValue)) {
          el[attr] = el[attr].replaceAll(oldValue, newValue) 
         }
        }
        
     })
   }
   dIf()
}


export function set(obj,newVal) {
  let tree = renderObjectsTree(v,false)
  for(const branch of tree){
    if(branch.str.trim() == obj.trim()) {
       renderNewValue(branch.str.trim(),null, newVal)
    }
  }
}


export function catchDynamicV(str) {
//str = str.replace(/\s+/g," ")
  const tree = renderObjectsTree(v, false)
  for(let branch of tree){
    branch.str = branch.str.trim()
    if(str.includes(branch.str)) {
const newVal=`<span data-binding="${branch.str}">${branch.value}</span>`
       str = str.replaceAll(`{ ${branch.str } }`, newVal)
    }
  }
  return str.trim();
}
