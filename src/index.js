const search = (docs, word) => {
  if (docs.length === 0) {
    return [];
  }

  const result = [];

  for (let i = 0; i < docs.length; i += 1) {
    const cleanString = docs[i].text.match(/\w+/g).map((el) => el.toLowerCase());
    const cleanWord = word.match(/\w+/g)[0].toLowerCase();

    if (cleanString.includes(cleanWord)) {
      result.push(docs[i].id);
    }
  }

  return result;
};

export default search;
