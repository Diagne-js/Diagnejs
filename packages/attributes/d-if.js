import {v} from '../v/v.js'

export default function dIf() {
  document.querySelectorAll("[d-if]").forEach((el) => {
    const condition = el.getAttribute("d-if");
    const display = window.getComputedStyle(el).display
    el.style.display = eval(condition) ? display : "none";
  });
}