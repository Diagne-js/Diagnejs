import {store} from '../reactivity/reactivity.js'
import renderObjectsTree from '../utils/render-tree-of-object.js'
import {
  dShow,
  dHide,
  activeBindings,
  dIf,
  useDynamicsAttributes
} from '../attributes/attributes.js'



export const variablesUsedBy_dFor = []

const attributes = ['show','hide','if','d-style','to']

export const dFor = (l=null) => { 
  const targets = document.querySelectorAll('[for]')
  
  targets.forEach(target => {
    let value = target.getAttribute("for");
    
    let localStore = store
    
    if (value.split('|')[1]) {
       localStore = store.find(s => s.componentName == value.split('|')[0].trim()).variables
         console.log(localStore)
       value = value.split('|')[1].trim()
    }
    
    let split = value.split(" ");
    let itemName = split[0]
    
    let iterable = localStore.find(s => s.name == split[2].trim()).value
    let iterableStr = split[2].trim()
      
    
    let tracker = iterableStr
      
     const storedHtml = target.outerHTML
     
      
    target.removeAttribute("for");
    
    const innerBase = target.outerHTML
    
    const storeLoop = {
     name: iterableStr,
     itemName: itemName,
     length: iterable.length,
     template: storedHtml
    }
  
    let html = '';
    
    
    if (!l) {
      variablesUsedBy_dFor.push(storeLoop)
    } else {
      variablesUsedBy_dFor[l] = storeLoop
    }
    
    if (iterable.length == 0) {
      const template = `<div data-for='${tracker}'></div>`
      target.insertAdjacentHTML('beforebegin', template);
      target.remove();
      
      return;
    }
    
    
    
for (let i in iterable) {
 const item = iterable[i]
 let currentHTML = innerBase
      
 if (typeof item == 'object') {
     const tree = renderObjectsTree(item,itemName)
    for (let j in tree){
       const branch = tree[j]
       if (innerBase.includes(branch.name)) {
                
        const binding = iterableStr+`[${i}]`+branch.name.slice(branch.name.indexOf('.'),branch.name.length)
                
         currentHTML = currentHTML.replaceAll(`{${branch.name}}`,
          `<span data-binding="${binding}">
           ${branch.value}</span>`);
           
           currentHTML = includesAttributes(currentHTML, branch.name, itemName, iterableStr, i)
           
           currentHTML = currentHTML.replaceAll(`[${branch.name}]`,branch.value);
           ''
          
        }
    }
   for (var n = 1; n < 20; n++) {
        i = parseFloat(i)
     currentHTML = currentHTML.replaceAll(`::i+${n}`, i+n )
     currentHTML = currentHTML.replaceAll(`::i-${n}`, i-n )
   }
      currentHTML = currentHTML.replaceAll('::i', i )
      html += currentHTML 
      }else{
        const binding = iterableStr+`[${i}]`
        currentHTML = includesAttributes(currentHTML, binding, itemName, iterableStr, i)
        currentHTML = innerBase.replaceAll(`{${itemName}}`, `<span data-binding="${binding}">${item}</span>`);
        for (var n = 1; n < 20; n++) {
        i = parseFloat(i)
     currentHTML = currentHTML.replaceAll(`::i+${n}`, i+n )
     currentHTML = currentHTML.replaceAll(`::i-${n}`, i-n )
   }
      currentHTML = currentHTML.replaceAll('::i', i )
    
        html += currentHTML;
      }
      
      
    }
    
    
    const template = `
      <div data-for='${tracker}'>
      ${html}
      </div>
    `
    
    
    target.insertAdjacentHTML('beforebegin', template);
    
    target.remove();
    
  });
  dShow();
  dHide();
  activeBindings()
  useDynamicsAttributes()
}


const includesAttributes = (str,b,itemName,iterable, i) => {
  for(const attr of attributes){
  if(str.includes(`${attr}=`)) {
    const catchProps = new RegExp(`${attr}="([^"]*)"|${attr}='([^']*)'`, 'g')
    const catchValue = /"([^"]*)"|'([^']*)'/;
    
    let catches = str.match(catchProps)
   
    for(const catched of catches){
       
       let value = catched.match(catchValue)[0]
       
       
      if (value.includes(b) && str.includes(`[${value}]`)) {
         value = 
         value.replaceAll(`[${itemName}`, `[${iterable}[${i}]`)
       }
       if (!str.includes(`${attr}='${value}'`)) {
       str = str.replace(catched, `${attr}=${value}`) 
       }
    }
  }
  }
  
  return str
}
