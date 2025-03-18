export const newFetching = async (url,cb) => {
  if (url.startsWith('/api/')) {
     url = '/server'+url+'.json'
  }
  
  let data
  fetch(url).then(res => res.json())
  .then(json => {
    data = json
    cb(data)
  })
  .catch(err => 'failed to fetch '+url+ ' \n '+ err)
  return data
}