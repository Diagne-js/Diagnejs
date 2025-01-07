import {dIndexOf} from './d-index-of.js'


export const changedFrom = () => {
  let changeFrom = new Error()
  changeFrom = changeFrom.stack.slice(
              dIndexOf(changeFrom.stack,' at ', 2),
              dIndexOf(changeFrom.stack,' at ', 3),
      )
      
  changeFrom = changeFrom.slice(
                changeFrom.lastIndexOf('/')+1,
                changeFrom.indexOf('.js')
     ).trim()
     
  return changeFrom
}