import {componentsStore} from "./componentsStore.js"
import {specifyProvidence} from './specifyProvidence.js'
import {addNames, bindValues, store} from '../reactivity/reactivity.js'
import {dEval, usedFrom} from '../utils/utils.js'

export const componentsNames = []

export const findComponents = (html, from = 'app') => {
  const findComponentsRegEx = /<([A-Z][a-zA-Z0-9]*)\s*(?:\s*[a-zA-Z0-9]+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s/>]+)\s*)*\/>/g;

  const match = html.match(findComponentsRegEx);

  if (!match) return html;
  
  for (const componentTag of match) {
    let name = componentTag.slice(1, 
                 componentTag.indexOf("/>")).trim();
    const props = {}
    let propsStr
     if (name.includes('=')) {
      const findProps = /(\w+)\s*=\s*("[^"]*"|'[^']*'|[^\s]+)/g;
      propsStr = name.slice(name.indexOf(' '), name.length).trim()
      name = name.slice(0, name.indexOf(' '))
      for (let propStr of propsStr.match(findProps)) {
        const propName = propStr.split('=')[0].trim()
        let propValue = propStr.split('=')[1].trim()
        if (propValue.startsWith(`"`) || propValue.startsWith("'")) {
          propValue = propValue.slice(1, propValue.length-1)
        }else{
           propValue = dEval(propValue, false, from)
         }
         props[propName] = propValue
      }
     }
                 
     let matchedContent = 
     componentsStore[name]
     
     const numOfCall = 
     componentsNames.filter(n => n.includes('##') &&  n.split('##')[0].trim() == name).length
     
     name = name + `##${numOfCall}`
     componentsNames.push(name)
     
     addNames(matchedContent, name, props)
     
     matchedContent = matchedContent(props)
     
     matchedContent = specifyProvidence(matchedContent, name)
     
     matchedContent = bindValues(matchedContent, name)
     
     if (matchedContent.match(findComponentsRegEx)) {
       matchedContent = findComponents(matchedContent, name)
     }
     
     html = html.replaceAll(componentTag, matchedContent)
  }
  return html;
};