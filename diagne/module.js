import {
  create,
  set,
  newWatch,
} from './reactivity/reactivity.js'

import { seo } from './seo/seo.js'
import { event, getPageDatas, newStyle } from './custom-methods/index.js'
import { newBind } from './attributes/attributes.js'
import { navigate, redirect, newRoute } from './routing/index.js'
import { component } from './components/componentsStore.js'
import { reUse } from './components/reUse.js'
export {newFetching} from './custom-methods/newFetching.js'
export {
  create,
  set,
  newWatch,
  seo,
  event,
  newBind,
  navigate,
  redirect,
  newRoute,
  component,
  reUse,
  getPageDatas,
  newStyle
}


export const D = {
  create,
  set,
  newWatch,
  seo,
  event,
  newBind,
  navigate,
  redirect,
  newRoute,
  component,
  reUse,
  newStyle,
  getPageDatas
}