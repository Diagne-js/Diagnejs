export const addDescription = (description) => {
 // Get the meta description tag
     let metaDescription = document.querySelector('meta[name="description"]');

 // Check if it exists, if not, create it
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.name = "description";
        document.head.appendChild(metaDescription);
      }

    // Set or update the description content
     metaDescription.content = description;
 }



 export const addKeywords = (keywords) => {
    // Get the meta keywords tag
     let metaKeywords = document.querySelector('meta[name="keywords"]');

     // Check if it exists, if not, create it
     if (!metaKeywords) {
         metaKeywords = document.createElement('meta');
         metaKeywords.name = "keywords";
         document.head.appendChild(metaKeywords);
     }

    // Set or update the keywords content
     metaKeywords.content = keywords;
}