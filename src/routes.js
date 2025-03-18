import {home} from './pages/homePage.js'
import {users} from './pages/usersPage.js'
import {signInPage} from './pages/signInPage.js'
import {profile} from './pages/profilePage.js'
import {notFoundPage} from './pages/notFoundPage.js'


export const routes = [
  {path: '/', content: home},
  {path: '/users', content: users},
  {path: '/users/:id', content: profile},
  {path: '/sign-in', content: signInPage},
  {path: '*', content: notFoundPage}
]