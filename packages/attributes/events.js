import {v} from '../v/v.js'


export default function setEvents() {
 let events = Object.keys(window).filter(e => e[0]=="o" && e[1] == "n")
 events.forEach((event,i) => {
 const attr = event.slice(2,event.length)
   document.querySelectorAll(`[d-${attr}]`).forEach((el,j) => {
   const func = el.getAttribute(`d-${attr}`);
      el[event] = v[func]
   })
 })
}
