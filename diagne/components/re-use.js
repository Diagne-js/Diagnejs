import {store} from '../reactivity/store.js'

export const reUse = (name) => {
  const matchedValue = store.find(s => s.name == name).valur
  return matchedValue
}