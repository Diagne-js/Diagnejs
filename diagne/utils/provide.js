import {D} from 'diagne'

export const provide = (fn, from, ...params) => {
  const set = D.set
  const create = D.create
  const event = D.event
  const watch = D.watch
   if (params) {
     return fn(params)
   }else{
     return fn()
   }
}