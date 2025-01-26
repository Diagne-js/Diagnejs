export const componentsStore = {}

export const component = (name, callback) => {
  componentsStore[name] = callback
}