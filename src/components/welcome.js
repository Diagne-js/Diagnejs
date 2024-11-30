import {v} from '../../packages/module.js'



export function welcome(content) {
  v.articles = [
  {
    title: "read the documentation", 
    body: `
           If you haven't learn 
          <span style='color:var(--primary)'>Diagne js</span>
          yet, read our documentation at https://diagnejs.com
          `
  },
  {
    title: "Start to code",
    body: `
       Delete the file src/app.js
       and start to code.<br>
       We are alright create files and folders that you will
       need to build you perfect website.
    `
  },
  {
    title: 'deploy your code',
    body: `If you have finish to code your app, you don't
           need to type "npm run dev" just deploy it!
    `
  },
]

  return`
     <section class="welcome">
       <div class="shadow"></div>
        <h1>${ content.title }</h1>
        <p>${ content.body }</p>
     </section>
     <div>
      <section d-for='article in  articles' class='step'>
         <h2>{ article.title }</h2>
         <p>{ article.body }</p
      </section>
    </div>
     
  `
}