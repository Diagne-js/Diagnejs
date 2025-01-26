import {store} from './store.js'

import {variablesUsedBy_dFor} from '../attributes/d-for.js'

import {effects} from './watch-effect.js'

import {
  dIfStore,
  variablesUsedByDynAttributes,
  bindStore
} from '../attributes/attributes.js';

import {eventsStore} from '../custom-methods/events.js'


export const resetData = () => {
  Object.keys(store).map(part => store[part] = [])
  variablesUsedBy_dFor.length = 0;
  effects.length = 0;
  dIfStore.length = 0;
  variablesUsedByDynAttributes.length = 0;
  bindStore.length = 0;
 // componentsName.length = 0;
  eventsStore.length = 0
}