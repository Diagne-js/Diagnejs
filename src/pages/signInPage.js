import {event, redirect, newRoute, create,set} from 'diagne'
import {userPage} from './userPage.js'

export const signInPage = () => {
  let accounts = create([])
  event('handleSubmit', (data) => {
    newRoute('/users/' + data.username, userPage)
    set(() => accounts = [data.username, ...accounts])
    redirect('/users/' + data.username, [data])
  })
  return `
    <h1>
      sign in
      <form onsubmit="handleSubmit -prevent">
         <input type="text" name="username" value="bamba"/>
         <input type="email" name="email" value="cheikhounadiagne2000@gmail.com"/>
         <textarea name="description">hello guys</textarea>
         <input type='submit' value='sign in' />
      </form>
    </h1>
    
    <h2>
      your accounts
    </h2>
    <a for="account of accounts" to="/users/[account]">
        {account} <br>
    </a>
  `
}