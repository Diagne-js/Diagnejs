import {routes} from '../../src/routes.js'

export const newRoute = (newPath, content) => {
  if (!routes.find(r => r.path == newPath)) {
     routes.push({path: newPath, content})
  }
}