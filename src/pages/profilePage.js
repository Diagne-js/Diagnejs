import {create, set, event, newStyle} from 'diagne'

export const profile = (userInfos) => {
  const user = create(userInfos)
  const styles = create({
    h1: newStyle({
      'margin': '10px',
      'color': 'red'
    }),
    h3: newStyle({
      border_bottom: 'solid 2px red',
      margin_bottom: '10px'
    }),
    card: newStyle({
      border: 'red solid 2px',
      border_radius: '10px',
      width: '80%',
      max_width: '500px',
      padding: '20px',
      margin: '20px 0'
    }),
    contact: newStyle({
      color: 'gray',
      font_weight: 350
    }),
    infos: newStyle({
      display: 'flex',
      align_items : 'center',
      padding: '15px 0',
      color: 'white',
      flex_direction: 'column',
    }),
    small: newStyle({color: 'gray'})
  })
  
  return `
    <div style='background: black '>
    <h1 d-style='styles.h1'>
      {user.name}
    </h1>
    <small d-style='styles.small'>
      @{user.username}
    </small>
    <div style='height: 4px; background: #262626; margin:10px'></div>
    <br>
    <section d-style='styles.infos'>
    <h3 d-style='styles.h3'>Entreprises</h3>
       <div d-style='styles.card' for='company of user.company'>
         <h5>
          {company.name}
         </h5>
         <br>
      <p>{company.catchPhrase}</p>
      <br>
      <h5>
      <br>
       website: <span style='${styles.contact} color: red'>
          {user.website}
      </span><br>
       siege: <span d-style='styles.contact'>
           street {user.address.street} on {user.address.city}
        </span>
      </h5>
      </div>
      </section>
      </div>
  `
}