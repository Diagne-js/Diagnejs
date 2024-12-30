export const restrictNoDeclaredVariables = (component) => {

   component = component.toString()
   
   const findDeclaration = 
   /(const|let)\s+([a-zA-Z_$][\w$]*)\s*=\s*(.+)/g;
   
   const findDynamicHtml = /\{(.*?)\}/g
   const findDynamicAttr = /(.*?)/g;
   
   const declarations = component.match(findDeclaration)
   
   const dynamicValues = component.match(findDynamicHtml)
   .concat(component.match(findDynamicAttr))
   
   let externeVariableIsUsed = {state: false}
   
   const internalVariables = []
   
   for (let declaration of declarations) {
     const name = declaration.slice(
              declaration.indexOf(' '),
              declaration.indexOf('=')
       ).trim()
      internalVariables.push(name)
   }
   
    
   
   for (let dynamicValue of dynamicValues) {
     const name = dynamicValue.slice(1, dynamicValue.length-1)
      const correspondingValueFromInternalVar = 
      internalVariables.find(v => v == name) 
      
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
   
}
