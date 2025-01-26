import {dIndexOf} from './d-index-of.js'


export const usedFrom = (useFrom, moveToRoot = false) => {
  useFrom = useFrom.stack.slice(
              dIndexOf(useFrom.stack,' at ', 2),
              dIndexOf(useFrom.stack,' at ', 3),
      )
      
  useFrom = useFrom.slice(
                useFrom.lastIndexOf('/')+1,
                useFrom.indexOf('.js')
     ).trim()
     
  if (useFrom != 'app' && !useFrom.includes('Page')) {
     useFrom = useFrom[0].toUpperCase() + useFrom.slice(1)
  } else if (moveToRoot) {
    useFrom = 'root'
  }
     
  return useFrom
}