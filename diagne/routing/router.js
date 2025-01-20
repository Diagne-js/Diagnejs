import {routes} from '../../src/routes.js'
import {render, store, resetData} from '../reactivity/reactivity.js'
import {gettingToPageDatasStore} from '../custom-methods/page-datas.js'
import {variablesUsedBy_dFor} from '../attributes/attributes.js'

let keepedAlive = []

const pageDatas = {
  toNewPage: false,
  path: '/'
}

const pages = []

const addDynamicsRoutes = () => {
  if(routes.length == 0) return
    for(let route of routes){
      if(route.path.includes(":") && route.src) {
      let dynamicValue = route.path.slice(route.path.indexOf(":")+1)
      dynamicValue = dynamicValue.slice(0, dynamicValue.indexOf("/"))
        for(const i in route.src){
           const src = route.src[i]
           let key;
           for(let prop of Object.keys(src)){
             if(src[prop] == src[dynamicValue] && src[prop]) {
                key = src[prop]
             }
           }
         routes.push({
             path:route.path.replaceAll(`:${dynamicValue}`,key),
             content: (ref) => route.content(ref),
             ref: src,
             type: "dynamic"
          })
        }
     
      }
    }
    
}
addDynamicsRoutes()


const findDLinks = () => {
  document.querySelectorAll('a').forEach(link => {
     if(link.hasAttribute("to")) {
       
        const value = link.getAttribute('to')
        link.href = document.location.origin + value
        link.addEventListener('click', (event) => {
               event.preventDefault();
               navigate(value);
               
        })
     }
  })
}


export const navigate = (path, params = []) => {
  if(window.location.pathname == path) return
  window.history.pushState({}, '', path);
  if (!pages.find(p => p.path == path)) {
    renderRoute(path, params);
    return
  }
  
  resetData()
  document.querySelector('#view').innerHTML = pages.find(p => p.path == path).content()
  
  
};

const renderRoute = (path, params = []) => {
  if (routes.length == 0) return
  
     const route = routes.find(r => r["path"] == path) || 
                   routes.find(r => r.path == "*") ||
     {path: "404", content: () => `
          <h1 style='text-align:center'>404</h1>
          <h4 style='text-align:center'>Not Found</h4>
          the path ${path} is not set
      `}
  
    let content = route.content; 
    

       if(route.path == '*') {
          throw new RenferenceError(`set up correctly the route ${path} at src/routes.js`)
          return
       }
       
       resetData()
       
       let page = ''
      
       if (params.length > 0 && route.type == 'dynamic') {
         page = () => render(content(route.ref, ...params), '#view', content)
       }else if (params.length > 0 && route.type != 'dynamic') {
         page = () => render(content(...params), '#view', content)
       }else if(route.type == "dynamic") {
          page = () => render(content(route.ref), '#view', content)
        }else{
          page = () => render(content, '#view')
        }
        
         page()
        
        pages.push({path, content: page})
        console.log(path)
        page = ''
        
        pageDatas.toNewPage = true
        pageDatas.path = path
        for (let getting of gettingToPageDatasStore) {
           getting(pageDatas)
        }
        pageDatas.toNewPage = false
        findDLinks()
};

// Event delegation for efficient event handling


// Initial page load and handling back/forward navigation

window.addEventListener('DOMContentLoaded', () => {
  renderRoute(window.location.pathname.includes("index.html") ?
    '/':
    window.location.pathname);
    
   findDLinks()
  window.addEventListener('popstate', () => {
  renderRoute(window.location.pathname);
  });
});

