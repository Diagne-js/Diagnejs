
import {store} from '../reactivity/store.js'



export const dEval = (str) => {
const items = []
const splited = str.split(" ")

for(let item of splited) {
        item = item.trim()
   
       const matchedValue = store.find(s => s.name == item)
  
        if(matchedValue) {
            items.push(matchedValue.value)
         }
       
         else if (typeof parseFloat(item) == 'number' && 
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
          // console.log(item)
             items.push(item.slice(1, item.length - 1))
         }
         
         else if (item == 'undefined') {
             items.push(undefined)
         }
         
         else if (item == 'null') {
         elitems.push(null)
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
        // if (!finalExp) return false
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
