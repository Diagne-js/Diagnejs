
export const transformType = (target, type) => {
  if (type == 'number') {
    return parseFloat(target)
  }
  
  else if (type == 'string') {
    return target
  }
  
  else if(type == 'object'){
     target = target.replaceAll("'", `"`)
    const keys = /[a-z]+:/g
    
    const matches = target.match(keys)
    
    for (let key of matches) {
       target = target.replaceAll(key, `"${key.slice(0, key.length-1)}":`)
    }
    
    target = JSON.parse(target)
    
    return target
  }
  
  else if (type == 'array') {
  
  }
}



