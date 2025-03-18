import {store} from './store.js'

import {variablesUsedBy_dFor} from '../attributes/d-for.js'

import {effects} from './watch-effect.js'

import {
  variablesUsedByDynAttributes,
  bindStore
} from '../attributes/attributes.js';

import {eventsStore} from '../custom-methods/events.js'

import {componentsNames, componentsStore, lastCreationFrom} from '../components/components.js'


export const resetData = (resetStore = true) => {
  const cNs = componentsNames
  if (resetStore) {
  Object.keys(store).map(part =>  delete store[part])
  store.app = []
  }
  console.log(store)
  variablesUsedBy_dFor.length = 0;
  effects.length = 0;
  variablesUsedByDynAttributes.length = 0;
  bindStore.length = 0;
  componentsNames.length = 0;
  eventsStore.length = 0
  lastCreationFrom.value = ''
}