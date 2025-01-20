import {home} from './pages/homePage.js'
import {getStartedPage} from './pages/getstartedPage.js'
import {signInPage} from './pages/signInPage.js'
import {userPage} from './pages/userPage.js'

const users = [
   {
     username: 'diagnejs',
     email: 'diagnejs@futur.com',
     description: 'just the future'
   }
]


export const routes = [
  {path: '/', content: home},
  {path: '/get-started', content: getStartedPage},
  {path: '/sign-in', content: signInPage}
]