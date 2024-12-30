import {dEval} from '../utils/d-eval.js'


export const dIfStore = []


export const dIf = () => {
   document.querySelectorAll('[if]').forEach(el => {
       const parent = el.parentElement;
       const condition = el.getAttribute("if")
       const siblings = Array.from(parent.children);
       const ref = parent.children[siblings.indexOf(el)+1];
       

       el.removeAttribute('if')
       
      dIfStore.push({
                      target:el,
                      ref:ref,
                      condition: condition,
                      parent: parent
      })
        
           if(dEval(condition)) {
             if (ref.hasAttribute('else')) {
               ref.remove()
             }
           }else{
                el.remove()
                if (ref.hasAttribute('else')) {
                   
                }
            }
   })
}
