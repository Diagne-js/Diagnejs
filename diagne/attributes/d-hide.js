import {dEval} from '../utils/d-eval.js'

const variablesUsedBy_hide = []

export const dHide = () => {
    document.querySelectorAll("[hide]").forEach(el => {
       const condition = dEval(el.getAttribute("hide"))
       
       const display = window.getComputedStyle(el).display
       
       el.setAttribute('data-hide', el.getAttribute('hide'))
       
       el.style.display = condition ? 'none' : display 
    })
}
