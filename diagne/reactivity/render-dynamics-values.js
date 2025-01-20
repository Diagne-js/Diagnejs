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




export const render = (app,selector, content = null) => {
  
   if (content) {
     addNames(content)
   }else{
     addNames(app)
   }
  
  let str
  if (content) {
    str = app
  }else{
    str = app()
  }
  str = bindValues(str)
  
  //str = await findComponents(str)
  const target = document.querySelector(selector)
  
  target.innerHTML = str
  renderCorrectPath()
  dFor()
  useDynamicsAttributes()
  dHide()
  dShow()
  addEvents()
  activeBindings()
  dIf()
  return target.innerHTML 
}