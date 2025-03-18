import {routes} from '../../src/routes.js'

export const newRoute = (path, content, params = []) => {
  path = path.trim()
  if (!routes.find(r => r.path == path)) {
     if(params.length == 0) {
       routes.push({path, content})
     }
     else{
       routes.push({
         path, 
         content,
         params,
      })
     }
  }
}