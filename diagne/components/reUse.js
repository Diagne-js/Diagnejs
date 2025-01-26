import {store} from '../reactivity/store.js'

const reused = []

export const reUse = (reusing) => {
  const requests = reusing.slice(0, reusing.indexOf('from'))
  .trim().split(',')
  const path = reusing.slice(reusing.indexOf('from')+4,).trim()
  const reused = {}
  for (var i = 0; i < requests.length; i++) {
     const request = requests[i]
     reused[request] = store[path].find(s => s.name == request).value
  }
  return reused
}