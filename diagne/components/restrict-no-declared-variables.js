import {specialsAttributes} from '../utils/utils.js'

export const restrictNoDeclaredVariables = (component) => {

   component = component.toString()
   
   
   const findDeclaration = /(const|let)\s+([a-zA-Z_$][\w$]*)\s*=\s*(.+)/g;
   
   const findDynamicHtml = /\{(.*?)\}/g
   const findDynamicAttr = /(.*?)/g;
   
   
   
   const declarations = component.match(findDeclaration)
   
    
   
   let dynamicValues = component.match(findDynamicHtml)
   
   if (dynamicValues) dynamicValues = dynamicValues.concat(component.match(findDynamicAttr))
   
   if(!dynamicValues) return
   
   let externeVariableIsUsed = {state: false}
   
   const internalVariables = []
   
   if(!declarations && dynamicValues) throw new ReferenceError('you have use an undeclared variable in your html part')
   
   for (let declaration of declarations) {
     const name = declaration.slice(
              declaration.indexOf(' '),
              declaration.indexOf('=')
       ).trim()
      internalVariables.push(name)
   }
   
    
   
   for (let dynamicValue of dynamicValues) {
     const alpha = /[a-zA-Z]/
     if(!dynamicValue) return
     const name = dynamicValue.slice(1, dynamicValue.length-1)
      const correspondingValueFromInternalVar = 
      internalVariables.find(v => v == name) 
      
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
      
      if (correspondingValueFromInternalVar) {
        
      }else{
        externeVariableIsUsed.vName = name
        externeVariableIsUsed.state = true
        break
      }
   }
   
   if (externeVariableIsUsed.state == true) {
      throw new ReferenceError(externeVariableIsUsed.vName + ' is not defined')
   }
   
   return 
   
}
