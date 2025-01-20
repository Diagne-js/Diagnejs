import {specialsAttributes} from '../utils/utils.js'
import {eventsStore} from '../custom-methods/events.js'

export const specifyProvidence = (target,compName) => {
   target = target.toString()
   target = sPOfAttributes(target, compName)
   eventsStore.push({componentName: compName, events: []})
   return target
}

const sPOfAttributes = (target, compName) => {
let html = target.trim()

for (let specAttr of specialsAttributes) {
  const findSpecAttr = new RegExp(` ${specAttr}=("[^"]*"|'[^']*')
`, 'g')
  const matched = html.match(findSpecAttr)
  
  console.log(matched)
  if (!matched) continue

  for (const match of matched) {
    const value = match.slice(match.indexOf('=') + 2, match.length - 1)
    html = html.replace(match, ` ${specAttr}="${compName}| ${value}"`
    )
  }

}
return html
}