import {dEval} from '../utils/d-eval.js'
import {store} from '../reactivity/reactivity.js'


export const dShow = () => {
    document.querySelectorAll("[show]").forEach(el => {
  
       const condition = dEval(el.getAttribute("show"))
       
       const display = window.getComputedStyle(el).display
       
       el.setAttribute('data-show', el.getAttribute("show"))
       
       el.removeAttribute('show')
       
       el.style.display = condition ? display : 'none'
       if (el.hasAttribute('transition')) {
         if (!el.style.transition) {
           el.style.transition = '0.3s'
         }
         const transitionName = el.getAttribute('transition')
         el.classList.add(`d-tran-${transitionName}-coming`)
         setTimeout(() => el.classList.remove(`d-tran-${transitionName}-coming`), 100)
       }
       
    })
}
