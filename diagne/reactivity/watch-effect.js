export const effects = [];

export const watchUpdates = (callback) => {
   effects.push(callback) 
 }