export const updateHTML = (name, newValue, componentName) => {
  if (componentName) {
      document.querySelectorAll(`[data-binding="${componentName}.${name}"]`).forEach((el) =>{
            el.innerText = newValue
     })
  }
  
  else{
    document.querySelectorAll(`[data-binding="${name}"]`).forEach((el) =>{
         el.innerText = newValue
     })
  }
}