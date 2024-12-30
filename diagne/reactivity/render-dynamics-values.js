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



export const render = async (str,selector) => {
  
  str = bindValues(str)
  
  str = await findComponents(str)
  document.querySelector(selector).innerHTML = str
  renderCorrectPath()
  dFor()
  useDynamicsAttributes()
  dHide()
  dShow()
  addEvents()
  activeBindings()
  dIf()
}