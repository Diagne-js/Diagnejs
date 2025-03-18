export const bindStore = []


export const newBind = (name, callback) => {
       const binding = {
         actions: (el) => {
            callback(el)
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
