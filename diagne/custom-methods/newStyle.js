import { store } from '../reactivity/reactivity.js'

export const newStyle = (obj) => {
  let style = ''
  if (style) {
    for (let key of Object.keys(obj)) {
      style += `${key}: ${obj[key]};`
    }
   return style
  }
  throw new ReferenceError('diagne: something is wrong on your style')
}