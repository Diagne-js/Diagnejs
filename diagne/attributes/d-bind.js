export const bindStore = []


export const newBind = (callback,name) => {
    
       const binding = {
         actions: (el) => {
            callback(el.value)
            el.oninput = () => callback(el.value)
            el.removeAttribute('bind')
         },
         name: name
       }
       bindStore.push(binding)
}


export const activeBindings = () => {
  for (let stockedBind of bindStore) {
     document.querySelectorAll(`[bind = "${stockedBind.name}"]`)
     .forEach((el) => {
        stockedBind.actions(el)
     })
  }
}
