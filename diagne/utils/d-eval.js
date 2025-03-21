import { store } from '../reactivity/store.js'
import { methodsIntoHtml } from '../utils/utils.js'


export const dEval = (str, verify = true, from = 'root', provideDependences = false) => {
  let localStore = store.app
  const componentName = str.split('/#/')[0]
  let dependences = []
  
  if (from != 'root') {
    localStore = store[from]
  } else if (str.includes('/#/')) {
    localStore = store[componentName]
    str = str.split('/#/')[1].trim()
  }
  const items = []
  const splited = str.split(" ")
  
  for (let item of splited) {
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
    
    else if (item.startsWith("'") || item.startsWith(`"`)) {
      item = item.slice(1, item.length - 1)
      if (item.includes('.')) {
        let method = item.slice(item.lastIndexOf('.'))
        item = item.slice(0, item.indexOf(method))
        
        method = methodsIntoHtml.find(m => m == method.slice(1))
        if (method) {
          items.push(item)
          continue
        }
        method = method.slice(0, method.indexOf('('))
        items.push(item[method]())
      } else {
        items.push(item)
      }
    }
    
    else if (item.match(/[a-zA-Z]/)) {
      const matchedValue = localStore.find(s => s.name == item)
      
      if (matchedValue == undefined) {
        if (verify) throw new ReferenceError(`${item} is not defined`)
        continue
      }
      items.push(matchedValue.value)
    }
    
    else if (item == 'undefined') {
      items.push(undefined)
    }
    
    else if (item == 'null') {
      items.push(null)
    }
    
    else {
      items.push(item)
    }
    
  }
  const output = unionOfItems(items)
  return provideDependences ? { output, dependences } : output
}




const unionOfItems = (items) => {
  let finalExp;
  
  if (!items[1]) {
    return items[0]
  }
  
  if (items[1] == "==") {
    finalExp = items[0] == items[2]
  }
  
  else if (items[1] == '===') {
    finalExp = items[0] === items[2]
  }
  
  else if (items[1] == "!=") {
    finalExp = items[1] != items[2]
  }
  
  else if (items[1] == "!==") {
    finalExp = items[0] !== items[2]
  }
  
  
  else if (items[1] == ">=") {
    finalExp = items[0] >= items[2]
  }
  
  else if (items[1] == "<=") {
    finalExp = items[0] <= items[2]
  }
  
  else if (items[1] == ">") {
    finalExp = items[0] > items[2]
  }
  
  else if (items[1] == "<") {
    finalExp = items[0] < items[2]
  }
  
  else if (items[1] == '+') {
    finalExp = items[0] + items[2]
  }
  
  else if (items[1] == '-') {
    finalExp = items[0] - items[2]
  }
  
  
  if (items[3] == "&&") {
    finalExp =
      finalExp && unionOfItems(items.slice(4, items.length))
  } else if (items[1] == '&&') {
    finalExp = items[0]
    finalExp =
      finalExp && unionOfItems(items.slice(2, items.length))
  } else if (items[3] == '+') {
    finalExp =
      finalExp + unionOfItems(items.slice(4, items.length))
  } else if (items[3] == '-') {
    finalExp =
      finalExp - unionOfItems(items.slice(4, items.length))
  }
  
  return finalExp
}