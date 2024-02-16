const search = (docs, word) => {
  if (docs.length === 0) {
    return [];
  }

  const result = {};

  for (let i = 0; i < docs.length; i += 1) {
    const cleanString = docs[i].text.match(/\w+/g).map((el) => el.toLowerCase());
    const cleanWord = word.match(/\w+/g)[0].toLowerCase();

    if (cleanString.includes(cleanWord)) {
      result[docs[i].id] = 0;

      for (let j = 0; j < cleanString.length; j += 1) {
        if (cleanString[j] === cleanWord) {
          result[docs[i].id] += 1;
        }
      }
    }
  }

  return Object.entries(result).sort((a, b) => b[1] - a[1]).map((el) => el[0]);
};

export default search;
