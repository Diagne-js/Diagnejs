export const renderCorrectPath = () => {
   document.querySelectorAll('#app [src]').forEach(img => {
     
     if (img.src.includes('assets')) {
       const pathName = img.src.slice(0, img.src.indexOf('/assets'))
        img.src = img.src.replace(pathName, '/src')
     }
   })
}
