import {home} from './pages/homePage.js'
import {getStartedPage} from './pages/getstartedPage.js'


export const routes = [
  {path: '/', content: home},
  {path: '/get-started', content: getStartedPage}
]