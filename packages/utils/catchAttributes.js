export const catchAttributes = (attributes,el) => {
  for (let attr of attributes) {
     el[attr.name] = attr.value
  }
}