import {store} from '../reactivity/store.js'

const reused = []



export const reUse = (name) => {
  const matchedValue = store.find(s => s.name == name).value
  return matchedValue
}