export function renderObjectsTree(variable,name) {
  let tree = []
  for(const key of Object.keys(variable)){
    let branch
    if(!Array.isArray(variable)) {
     if(name) {
       tree.push({ str: name + "." + key, value: variable[key]})
       branch = name + "." + key
     }else{
       tree.push({ str: key, value: variable[key]})
       branch = key
     }
    }else if(Array.isArray(variable)) {
        tree.push({ str: name + "[" + key + "]", value: variable[key]})
        branch = name + "[" + key + "]"
    }
    if(typeof variable[key] == 'object' ) {
      tree = tree.concat(renderObjectsTree(variable[key],branch))
    } 
  }
  return tree
}
