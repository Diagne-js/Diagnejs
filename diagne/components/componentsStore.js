import {usedFrom as $uF} from '../utils/utils.js'

export const componentsStore = {}

let lastCreationFrom = ''

export const component = (name, callback) => {
  const usedFrom = $uF(new Error, {identify: 'no'})
  if (usedFrom != lastCreationFrom) {
     lastCreationFrom = usedFrom
  }else if (usedFrom == lastCreationFrom && name[0] == name[0].toUpperCase()) {
    setTimeout(() => console.warn(`if you want to use several components in the same file, you must define just one main component that starts with an upper case letter and then define others components that starts with a lower case letter. These additional components will be available only by the main component of your file`), 10)
      new SyntaxError(`You can assign just one main component per file`)
  }
  componentsStore[name] = callback
}