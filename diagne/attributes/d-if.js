import { dEval, usedFrom } from '../utils/utils.js'


export let dIfStore = []

export const dIf = () => {
  document.querySelectorAll('[if]').forEach(el => {
    const parent = el.parentElement;
    let condition = el.getAttribute("if")
    let From = 'app'
    const siblings = Array.from(parent.children);
    const ref = parent.children[siblings.indexOf(el) + 1];
    el.removeAttribute('if')
    if (dEval(condition)) {
      if (ref.hasAttribute('else')) {
        ref.remove()
      }
    } else {
      el.remove()
    }

    if (condition.includes('/#/')) {
      const [from, input] = condition.split('/#/').map(i => i.trim())
      From = from
    }

    dIfStore.push({
      target: el,
      ref: ref,
      condition: condition,
      parent: parent,
      from: From
    })
  })
}