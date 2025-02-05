import {component, create, set, event, newWatch} from 'diagne'

component('Progress', (props) => {
  let style = create(`
         width:${props.step+1 * 100}px;
         height: 5px;
         border-radius: 5px;
         background:blue;
  `)
  return `
   <div style="width:304px; overflow: hidden; border:solid 1px gray; padding: 1px; border-radius: 8px;">
    <div d-style="style"></div>
    </div>
  `
})