import {
  create,
  set,
  newWatch,
} from './reactivity/reactivity.js'

import { seo } from './seo/seo.js'
import { event } from './custom-methods/events.js'
import { newBind } from './attributes/attributes.js'
import { navigate, redirect, newRoute } from './routing/index.js'
export { getPageDatas } from './custom-methods/page-datas.js'
import { component } from './components/componentsStore.js'
export { reUse } from './components/reUse.js'

export { 
    create, set, newWatch, seo, event, newBind,
    navigate, redirect, newRoute,
    component
}


export const D = {
  watch: newWatch,
  create,
  set,
  bind: newBind,
  event,
  component,
  seo
}