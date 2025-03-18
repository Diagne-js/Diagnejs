import { routes } from '../../src/routes.js'
import { render, store, resetData, addNames} from '../reactivity/reactivity.js'
import { gettingToPageDatasStore } from '../custom-methods/page-datas.js'
import { addEvents } from '../custom-methods/index.js'

let keepedAlive = []

const pageDatas = {
  toNewPage: false,
  path: '/'
}

const pages = []

const addDynamicsRoutes = () => {
  if (routes.length == 0) return
  for (let route of routes) {
    if (route.path.includes(":") && route.src) {
      let dynamicValue = route.path.slice(route.path.indexOf(":") + 1)
      dynamicValue = dynamicValue.slice(0, dynamicValue.indexOf("/"))
      for (const i in route.src) {
        const src = route.src[i]
        let key;
        for (let prop of Object.keys(src)) {
          if (src[prop] == src[dynamicValue] && src[prop]) {
            key = src[prop]
          }
        }
        routes.push({
          path: route.path.replaceAll(`:${dynamicValue}`, key),
          content: (ref) => route.content(ref),
          ref: src,
          type: "dynamic"
        })
      }

    }
  }

}
addDynamicsRoutes()


export const findDLinks = () => {
  document.querySelectorAll('a').forEach(link => {
    if (link.hasAttribute("to")) {

      const value = link.getAttribute('to')
      link.href = document.location.origin + value
      link.removeAttribute('to')
      link.addEventListener('click', (event) => {
        event.preventDefault();
        navigate(value);
      })
    }
  })
}


export const navigate = (path, params = [], newPath = true) => {
  if (window.location.pathname == path) return

  if (newPath) window.history.pushState({}, '', path);
  if (!pages.find(p => p.path == path)) {
    renderRoute(path, params);
    return
  }
  toAnUsedPage(path)
};

const toAnUsedPage = (path) => {
  resetData()
  const page = pages.find(p => p.path == path)
  if (!page) {
    renderRoute(path)
    return
  }
  addNames(page.mainContent)
  page.content()
  activateGetPageData(path)
  addEvents()
  findDLinks()
}

let firstRender = true

const renderRoute = (path, params = []) => {
  if (routes.length == 0) return
  const route = routes.find(r => r['path'] == path) ||
    routes.find(r => r.path == "*") || { path: "404", content: () => `
          <h1 style='text-align:center'>404</h1>
          <h4 style='text-align:center'>Not Found</h4>
          <small>the path ${path} is not found !</small>
      ` }

  if (route.params) {
    params = route.params
  }
  let content = route.content;

  if (!firstRender) resetData()

  let page = null
  
  if (route.path == '404') {
    activateGetPageData('404')
    document.querySelector("#view").innerHTML = content()
    return
  } else if (route.path == '*') {
    activateGetPageData('*')
    render(() => content(path), '#view')
  } else
  if (Object.keys(params).length > 0 && route.type == 'dynamic') {
    page = () => render(() => content(route.ref, params),'#view')
  } else if (Object.keys(params).length > 0 && !route.type) {
    page = () => render(() => content(params), '#view')
  } else if (route.type == "dynamic") {
    page = () => render(() => content(route.ref), '#view')
  } else {
    page = () => render(() => content(), '#view')
  }

  if (page) {
    addNames(content)
    page()
    pages.push({ path, content: page, mainContent: content})
  }
  activateGetPageData(path)
  findDLinks()
  firstRender = false
};

// Event delegation for efficient event handling

const activateGetPageData = (path) => {
  pageDatas.toNewPage = true
  pageDatas.path = path
  for (let getting of gettingToPageDatasStore) {
    getting(pageDatas)
  }
  pageDatas.toNewPage = false
}

// Initial page load and handling back/forward navigation

window.addEventListener('DOMContentLoaded', () => {
  renderRoute(window.location.pathname.includes("index.html") ?
    '/' :
    window.location.pathname);

  findDLinks()
  window.addEventListener('popstate', () => {
    let to = window.location.pathname
    if (to == '/index.html') {
      to = '/'
    }
    toAnUsedPage(to)
  });
});