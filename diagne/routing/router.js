import {routes} from '../../src/routes.js'
import {catchDynamicV} from '../v/v.js'
import {dFor} from '../attributes/attributes.js'


export const navigate = (path) => {
  window.history.pushState({page:1}, '', path);
  renderRoute(path);
};

const renderRoute = (path) => {
  if (Object.keys(routes).length == 0) return
  const content = routes[path] || routes['*'];
  if(!content) {
    console.error(`set up correctly the route ${path}`)
    return
  }
  document.querySelector("#view").innerHTML = catchDynamicV(content())
  dFor()
};

// Event delegation for efficient event handling
document.addEventListener('click', (event) => {
const target = event.target
if(target.tagName == "A" && target.getAttribute("to")) {
    event.preventDefault();
    navigate(event.target.getAttribute('to'));
  }
});

// Initial page load and handling back/forward navigation

window.addEventListener('DOMContentLoaded', () => {
  renderRoute("/");
  window.addEventListener('popstate', () => {
  renderRoute(window.location.pathname);
  });
});
