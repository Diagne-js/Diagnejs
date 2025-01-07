
export const dIndexOf = (str, searchValue, n) => {
  let index = -1;
  while (n > 0) {
    index = str.indexOf(searchValue, index + 1);
    if (index === -1) return -1; // Si l'occurrence n'existe pas
    n--;
  }
  return index;
}




