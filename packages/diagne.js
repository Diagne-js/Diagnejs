import {App} from '../src/app.js'

import {
    dIf,dBind,dFor,
    setEvents,dynamicAttr
} from './attributes/attributes.js'
   
import {v,catchDynamicV} from './v/v.js'
import {navigate} from "./router/router.js"
import {renderObjectsTree} from './utils/utils.js'



const app = document.getElementById("app");

function render() {
  app.innerHTML = catchDynamicV(App());
  dIf();
  setEvents();
  dBind()
  dFor()
  dynamicAttr()
}
render()
