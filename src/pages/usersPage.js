import { create, set, event,newRoute, newFetching} from 'diagne'
import {profile} from './profilePage.js'
import '../components/Progress.js'

export const users = () => {
  function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

  let users = create([])
  let isLoading = create(true)
  newFetching('/api/users', data => {
     set(() => users = data)
  //   await sleep(800)
     set(() => isLoading = false)
     for (let user of users) {
        newRoute('/users/'+user.id, profile, user)
     }
    })
  
  return `
   <section if='isLoading == false'>
    <div for='user in users'>
      <h3>{user.name}</h3>
      <p style='color: gray; padding: 5px'>{user.username}</p>
      <a to="/users/::i+1">more about {user.name}</a>
    </div>
  </section>
  <p else>loading...</p>
  `
}