
import {store} from '../reactivity/store.js'
import {methodsIntoHtml} from '../utils/utils.js'


export const dEval = (str, verify = true) => {

let localStore = store
if (store.find(s => s.componentName == str.split('|')[0]) ) {
  localStore = 
  store.find(s => s.componentName == str.split('|')[0]).variables
  
  str = str.split('|')[1].trim()
}
const items = []
const splited = str.split(" ")

for(let item of splited) {
        item = item.trim()
       
         if (typeof parseFloat(item) == 'number' && 
                  !isNaN(parseFloat(item))) {
                    
            items.push(parseFloat(item))
         }
         
         else if (item == 'false' && typeof item == 'string') {
           items.push(false)
         }
         
         else if (item == 'true' && typeof item == 'string') {
           items.push(true)
         }
         
         else if(item.startsWith("'") || item.startsWith(`"`)){
             item = item.slice(1, item.length - 1)
            if (item.includes('.')) {
              let method = item.slice(item.lastIndexOf('.'))
              item = item.slice(0, item.indexOf(method))
              
              method = methodsIntoHtml.find(m => m == method.slice(1))
              if (method) {
                items.push(item)
                continue
              }
              method = method.slice(0,method.indexOf('('))
              items.push(item[method]())
            }else{
              items.push(item)
            }
         }
         
         else if(item.match(/[a-zA-Z]/)) {
           if (item.includes('.')) {
              let method = item.slice(item.lastIndexOf('.'))
              item = item.slice(0, item.indexOf(method))
           const matchedValue = localStore.find(s => s.name == item)
              method = methodsIntoHtml.find(m => m == method.slice(1))
              
             if(!matchedValue){
             if(verify) throw new ReferenceError(`${item} is not defined`)
             continue
           }
              if (!method) {
                items.push(matchedValue.value)
                continue
              }
              method = method.slice(0,method.indexOf('('))
              items.push(matchedValue.value[method]())
            }else{
             const matchedValue = localStore.find(s => s.name == item)
             if(!matchedValue){
             if(verify) throw new ReferenceError(`${item} is not defined`)
             continue
           }
              items.push(matchedValue.value)
            }
         }
         
         else if (item == 'undefined') {
             items.push(undefined)
         }
         
         else if (item == 'null') {
           items.push(null)
         }
         
         else{
           items.push(item)
         }
         
}
    const finalExp = unionOfItems(items)
    return finalExp
}
  
  
  
  
  const unionOfItems = (items) => {
   let finalExp;
   
     if(!items[1]) {
       return items[0]
     }
      if(items[1] == "==") {
        finalExp = items[0] == items[2]
      }
      
      else if(items[1] == '==='){
        finalExp = items[0] === items[2]
      }
      
      else if(items[1] == "!=") {
        finalExp = items[1] != items[2]
      }
      
      else if(items[1] == "!==") {
        finalExp = items[0] !== items[2]
      }
      
      
      else if(items[1] == ">=") {
        finalExp = items[0] >= items[2]
      }
      
      else if(items[1] == "<=") {
        finalExp = items[0] <= items[2]
      }
      
      else if(items[1] == ">") {
        finalExp = items[0] > items[2]
      }
      
      else if(items[1] == "<") {
        finalExp = items[0] < items[2]
      }
      
      else if(items[1] == '+'){
        finalExp = items[0] + items[2]
      }
      
      
      if(items[3] == "&&" || items[0] == '||') {
        finalExp = 
        finalExp && unionOfItems(items.slice(4, items.length))
      }
      
    return finalExp
  }