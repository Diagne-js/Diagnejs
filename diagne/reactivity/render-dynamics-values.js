import {
    dFor,
    dHide,
    dShow,
    dIf,
    activeBindings,
    useDynamicsAttributes,
    renderCorrectPath
} from '../attributes/attributes.js'

import {eventsStore, addEvents} from '../custom-methods/events.js'
import {findComponents} from '../components/find-components.js'
import {bindValues} from './bind-values.js'
import {addNames} from './create.js'
import {store} from './store.js'
import {resetData} from './resetData.js'
import {provide} from '../utils/utils.js'


export const render = (app,selector) => {
  let str = app()
  str = bindValues(str)
  str = findComponents(str)
  
  const target = document.querySelector(selector)
  
  target.innerHTML = str
  renderCorrectPath()
  dIf()
  dFor()
  useDynamicsAttributes()
  dHide()
  dShow()
  addEvents()
  activeBindings()
  return target.innerHTML 
}