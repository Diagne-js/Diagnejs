import {specialsAttributes, renderObjectsTree} from '../utils/utils.js'
import {store} from '../reactivity/reactivity.js'



export const restrictNoDeclaredVariables = (component,name) => {
   component = component.toString()
   const findDynamicHtml = /\{(.*?)\}/g
   
   let dynamicValues = component.match(findDynamicHtml)
   
   let externeVariableIsUsed = {state: false}
   
   const internalVariables = []

   const matchedStore = store.find(s => s.componentName == name)

   for (let stocked of matchedStore.variables) {
      internalVariables.push(stocked.name)
   }
   
   if(internalVariables.length == 0 && dynamicValues.length > 0) throw new ReferenceError(`${dynamicValues[0]} has been not declared `)
   
   if(!dynamicValues) return 
   
   for (let dynamicValue of dynamicValues) {
     const alpha = /[a-zA-Z]/
     if(!dynamicValue) return
     const name = dynamicValue.slice(1, dynamicValue.length-1)
      
      
      for (let specAttr of specialsAttributes) {
        const findSpecAttr =
        new RegExp(` ${specAttr}=('|")[^"']*('|")`, 'g')
        const matched = component.match(findSpecAttr)
        if (matched) {
        for(const match of matched){
           const value = match.slice(match.indexOf('=')+2, match.length - 1)
            const items = value.split(' ')
            for (let item of items) {
              
              if (specAttr == 'for') {
                const [itemName, o, variable] = value.split(' ')
                const correspondingValue = 
                   internalVariables.find(v => v == variable)
                  if (correspondingValue) {
                    internalVariables.push(itemName)
                    continue
                  }else{
                    throw new ReferenceError(variable + ' is not defined')
                  }
                  continue;
              }
              
              
              if (!item.startsWith("'") && !item.startsWith(`"`) 
                  && isNaN(parseFloat(item)) && item.match(alpha)) {
                    
                   const correspondingValue = 
                   internalVariables.find(v => v == item)
                  if (correspondingValue) {
                    
                  }else{
                   throw new ReferenceError(item + ' is not defined')
                  }
                  continue;
              }
            }
         }
        }
      }
      
      const correspondingValueFromInternalVar = 
      internalVariables.find(v => v == name) 
      
      if (correspondingValueFromInternalVar) {
        
      }else{
        throw new ReferenceError(name + ' is not defined')
        break
      }
   }
   
}
