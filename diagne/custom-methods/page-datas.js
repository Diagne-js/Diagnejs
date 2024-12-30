export const gettingToPageDatasStore = []

export const getPageDatas = (callback) => {
  gettingToPageDatasStore.push(callback)
}
