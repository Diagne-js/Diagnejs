import { store } from '../reactivity/reactivity.js'

export const newStyle = (obj) => {
  let style = ''
  if (obj) {
    for (let key of Object.keys(obj)) {
      const prop = key.replaceAll('_', '-')
      style += `${prop}: ${obj[key]};`
    }
   return style
  }
  throw new ReferenceError('diagne: something is wrong on your style')
}