import { store } from '../reactivity/reactivity.js'
import { renderObjectsTree, specialsAttributes, dEval } from '../utils/utils.js'
import {
  dShow,
  dHide,
  activeBindings,
  dIf,
  useDynamicsAttributes
} from '../attributes/attributes.js'

export const variablesUsedBy_dFor = []

const attributes = [...specialsAttributes]

export const dFor = (l = null) => {
  const targets = document.querySelectorAll('[for]')

  for(const target of [...targets]) {
    let value = target.getAttribute("for");
    let localStore = store.app

    if (value.includes('/#/')) {
      const [componentName, input] = value.split('/#/').map(v => v.trim())
      localStore = store[componentName]
      value = input
    }
    let split = value.split(" ");
    let html = '';
    const innerToSave = target.outerHTML
    target.removeAttribute("for");
    const innerBase = target.outerHTML
    
    if (split[0] == 'let') {
      const itemName = value.slice(value.indexOf('let')+3, value.indexOf('=')).trim()
      const starting = dEval(value.slice(value.indexOf('=')+1, value.indexOf('from')).trim())
      const src = value.slice(value.indexOf('from')+4).trim()
      const num = dEval(src)
      for (let i = 0; i < num; i++) {
         let currentHTML = innerBase
         currentHTML = innerBase.replaceAll(`{${itemName}}`, i)
         currentHTML = includesAttributes(currentHTML,true, itemName, null, i)
         html += currentHTML 
      }
      if (!src[0].includes(['1','2','3','4','5','6','7','8','9','0'])) {
        target.insertAdjacentHTML('beforebegin', `<div data-for='${src}'>${html}</div>`);
        stock(src, null , innerToSave, l, true)
      }else{
        target.insertAdjacentHTML('beforebegin', html);
      }
      target.remove();
    continue
    }
    
    let itemName = split[0]

    let iterable = localStore.find(s => s.name == split[2].trim()).value

    let iterableStr = split[2].trim()
    let tracker = iterableStr

    stock(iterableStr, iterable.length, innerToSave, l)
    
    let template = `<div data-for='${tracker}'></div>`
    if (iterable.length == 0) {
      target.insertAdjacentHTML('beforebegin', template);
      target.remove();
      return;
    }

    for (let i in iterable) {
      const item = iterable[i]
      let currentHTML = innerBase

      if (typeof item == 'object') {
        const tree = renderObjectsTree(item, itemName)
        for (let j in tree) {
          const branch = tree[j]
          if (innerBase.includes(branch.name)) {
            const binding = iterableStr + `[${i}]` + branch.name.slice(branch.name.indexOf('.'), branch.name.length)
            currentHTML = currentHTML.replaceAll(`{${branch.name}}`,
              `<span data-binding="${binding}">
           ${branch.value}</span>`);
            currentHTML = provideIndex(currentHTML, i)
            currentHTML = includesAttributes(currentHTML, false, itemName, iterableStr, i)

            currentHTML = currentHTML.replaceAll(`[${branch.name}]`, branch.value);
          }
        }
      } else {
        const binding = iterableStr + `[${i}]`
        currentHTML = innerBase.replaceAll(`{${itemName}}`, `<span data-binding="${binding}">${item}</span>`);
        currentHTML = provideIndex(currentHTML, i)
        currentHTML = includesAttributes(currentHTML, false, itemName, iterableStr, i)
      }

      html += currentHTML;
    }

    template = `
      <div data-for='${tracker}'>
      ${html}
      </div>
    `
    target.insertAdjacentHTML('beforebegin', template);
    target.remove();
  };
  dShow();
  dHide();
  activeBindings()
  useDynamicsAttributes()
}


const stock = (name, length, template, l, isNum = false) => {
  const storeLoop = {
    name,
    length,
    template,
    isNum
}

if (!l) {
  variablesUsedBy_dFor.push(storeLoop)
} else {
  variablesUsedBy_dFor[l] = storeLoop
}
}


const includesAttributes = (str, isForFrom, itemName, iterable, i) => {
  for (const attr of attributes) {
    if (str.includes(`${attr}=`)) {
      const catchProps = new RegExp(`${attr}="([^"]*)"|${attr}='([^']*)'`, 'g');
      const catchValue = /"([^"]*)"|'([^']*)'/;

      let catches = str.match(catchProps);

      if (!catches) return str;

      for (const catched of catches) {
        let primValue = catched.match(catchValue)[0];
        let value;

        if (isForFrom) {
          value = primValue.replaceAll(itemName, `${i}`);
        } else {
          // Ajoute l'itérable correctement pour transformer item.id en items[i].id
          value = primValue.replace(new RegExp(`\\b${itemName}\\b`, 'g'), `${iterable}[${i}]`);
        }

        if (value != primValue) {
          str = str.replace(catched, `${attr}=${value}`);
        }
      }
    }
  }
  return str;
};


const provideIndex = (target, i) => {
  target = target.replaceAll('::i', i)
  for (var n = 1; n < 20; n++) {
    i = parseFloat(i)
    target = target.replaceAll(`::i+${n}`, i + n)
    target = target.replaceAll(`::i-${n}`, i - n)
  }
  return target
}
