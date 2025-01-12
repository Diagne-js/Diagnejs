import {reUse, create, set, getPageDatas} from 'diagne'

export const GetStarted = () => {
 let x = create(4)
 
 let nums = create([2,44,32,4,7])
 
 
 let timeOut
 
  return `
     <section class="getStarted" show="x === 4">
         learn diagne.js at <a href="">diagne.js website</a>
      </section>
      <div for="num of nums">
      .....{num}<br>
      </div>
  `
}
