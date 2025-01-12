import {specialsAttributes} from '../utils/utils.js'

export const specifyProvidence = (target,compName) => {
   target = target.toString()
   let html = target.slice(target.indexOf('return`    ') + 6, target.length - 1).trim()
   
   for (let specAttr of specialsAttributes) {
      const findSpecAttr = new RegExp(` ${specAttr}=["][^"]*["]`, 'g')
       const matched = html.match(findSpecAttr)
      
       if (!matched) continue
       
       for(const match of matched){
           const value = match.slice(match.indexOf('=')+2, match.length - 1)
           html = html.replace(match, ` ${specAttr}="${compName}| ${value}"`)
        }
       
   }
  
  return html
}