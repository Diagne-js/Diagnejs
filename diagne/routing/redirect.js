import {navigate} from './router.js'

export const redirect = (path, params = []) => {
  navigate(path, params)
}