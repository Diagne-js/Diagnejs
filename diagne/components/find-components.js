import {restrictNoDeclaredVariables} from './restrict-no-declared-variables.js'


import {bindValues, store} from '../reactivity/reactivity.js'

export const findComponents = async (html) => {
  const findComponents = /<([A-Z][a-zA-Z0-9]*)\/>/g;

  const match = html.match(findComponents);

  if (!match) return html;

  for (const componentTag of match) {
    const name = componentTag.slice(1, componentTag.indexOf("/>"));

    const path = `../../src/components/${name}.js`;

    await import(path)
      .then((module) => {
       // const savedStore = [...store]
     //   store.length = 0
        let component = bindValues(module[name]());
        
        
       restrictNoDeclaredVariables(module[name])
        html = html.replaceAll(componentTag, component);
      })
      .catch((err) => console.error(err));
  }

  return html;
};
