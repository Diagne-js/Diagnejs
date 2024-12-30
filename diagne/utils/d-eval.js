
import {store} from '../reactivity/store.js'



export const dEval = (str) => {
const items = []

for(let item of str.split(" ")){
  item = item.trim()
  
        if(item[0] == "[" && item[item.length-1] == "]") {
           const name = item.slice(1, item.length-1 )
          
           for (let i in store) {
               let stocked = store[i]
          
               if (stocked.name == name) {
                   items.push(store[i].value)
                   break
               }
           }
       
         }else if (typeof parseFloat(item) == 'number' && 
                  !isNaN(parseFloat(item))) {
                    
            items.push(parseFloat(item))
         }
         
         else if (item == 'false' && typeof item == 'string') {
           items.push(false)
         }
         
         else if (item == 'true' && typeof item == 'string') {
           items.push(true)
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
