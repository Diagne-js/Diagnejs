import {restrictNoDeclaredVariables} from './restrict-no-declared-variables.js'
import {specifyProvidence} from './specifyProvidence.js'

import {addNames} from '../reactivity/reactivity.js'

import {bindValues, store} from '../reactivity/reactivity.js'

import {dEval} from '../utils/utils.js'


export const componentsName = []

export const findComponents = async (html) => {
  
const findComponents = /<([A-Z][a-zA-Z0-9]*)\s*(?:\s*[a-zA-Z0-9]+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s/>]+)\s*)*\/>/g;

  const match = html.match(findComponents);

  if (!match) return html;

  for (const componentTag of match) {
    let name = componentTag.slice(1, componentTag.indexOf("/>")).trim();
    let props = {}
    if (name.includes('=')) {
      let propsStr = name.slice(name.indexOf(' '), name.length).trim()
      const findProps = /(\w+)\s*=\s*("[^"]*"|'[^']*'|[^\s]+)/g;
      name = name.slice(0, name.indexOf(' '))
      for (let propStr of propsStr.match(findProps)) {
        const propName = propStr.split('=')[0].trim()
        let propValue = propStr.split('=')[1].trim()
        if (propValue.startsWith(`"`) || propValue.startsWith("'")) {
          propValue = propValue.slice(1, propValue.length-1)
        }else{
           propValue = dEval(propValue)
         }
         props[propName] = propValue
      }
    }
  
    componentsName.push(name)
    
    const path = `../../src/components/${name}.js`;

    await import(path)
      .then((module) => {
         const savedStore = [...store]
         
         const target = module[name]
         store.push({componentName: name, variables: []})
        addNames(target, name, props)
       
       let component
       if (props) {
         component = target(props);
       }else{
         component = target();
       }
       component = bindValues(component, store[store.length - 1])
       restrictNoDeclaredVariables(target, name)
       component = specifyProvidence(component,name)
      
       
        html = html.replaceAll(componentTag, component);
        
      })
      .catch((err) => console.error(err));
  }
  return html;
}