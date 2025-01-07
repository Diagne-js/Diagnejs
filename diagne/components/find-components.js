import {restrictNoDeclaredVariables} from './restrict-no-declared-variables.js'

import {addNames} from '../reactivity/reactivity.js'

import {bindValues, store} from '../reactivity/reactivity.js'


export const componentsName = []



export const findComponents = async (html) => {
  const findComponents = /<([A-Z][a-zA-Z0-9]*)\s*\/>/g;

  const match = html.match(findComponents);

  if (!match) return html;

  for (const componentTag of match) {
    const name = componentTag.slice(1, componentTag.indexOf("/>")).trim();
    
    componentsName.push(name)

    const path = `../../src/components/${name}.js`;

    await import(path)
      .then((module) => {
         const savedStore = [...store]
         store.length = 0
         
         const target = module[name]
         store.push({componentName: name, variables: []})
        addNames(target, name)
        
       restrictNoDeclaredVariables(target)
       
       let component = target();
       
       component = bindValues(component, store[store.length - 1])
       
        html = html.replaceAll(componentTag, component);

        store.push(...savedStore)
      })
      .catch((err) => console.error(err));
  }

  return html;
};