const renderObjectsTree = (variable,name, addParent = true) => {
  let tree = []
  if(name && addParent) tree.push({name: name, value: variable})
  for(const key of Object.keys(variable)){
    let branch
    if(!Array.isArray(variable)) {
     if(name) {
       tree.push({ name: name + "." + key, value: variable[key]})
       branch = name + "." + key
     }else{
       tree.push({ name: key, value: variable[key]})
       branch = key
     }
    }else if(Array.isArray(variable)) {
        tree.push({name: name + "[" + key + "]", value: variable[key]})
        branch = name + "[" + key + "]"
    }
    if(typeof variable[key] == 'object' ) {
      tree = tree.concat(renderObjectsTree(variable[key],branch))
    } 
  }
  return tree
}
export default renderObjectsTree