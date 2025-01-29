import {dIndexOf} from './d-index-of.js'
import {componentsNames} from '../components/find-components.js'

export const usedFrom = (useFrom, options = null) => {
  useFrom = useFrom.stack.slice(
              dIndexOf(useFrom.stack,' at ', 2),
              dIndexOf(useFrom.stack,' at ', 3),
      )
      
  useFrom = useFrom.slice(
                useFrom.lastIndexOf('/')+1,
                useFrom.indexOf('.js')
     ).trim()
     
  const isComp = useFrom != 'app' && !useFrom.includes('Page')
     
  if (isComp) {
     useFrom = useFrom[0].toUpperCase() + useFrom.slice(1)
  } else if (options && options.useRoot) {
    useFrom = 'root'
  }
  if (isComp) {
    if (options && options.exist) {
       if (isComp) {
         useFrom = useFrom+'##0'
       }
    }else if(options && options.identify == 'yes') {
      useFrom = componentsNames.at(-1)
    }
  }
  return useFrom
}