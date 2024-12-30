import {v} from '../v/v.js'

export default function dBind() {
  document.querySelectorAll("[d-bind]").forEach((el) => {
    const bindTo = el.getAttribute("d-bind");
   if(el == "[object HTMLInputElement]") {
      el.oninput = () => {
        v[bindTo] = el.value
      }
      setInterval(() => {
        if(v[bindTo] != el.value) el.value = v[bindTo]
      },5)
    }
  });
}