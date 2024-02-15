const search = (docs, word) => {
  if (docs.length === 0) {
    return [];
  }

  const result = [];

  for (let i = 0; i < docs.length; i += 1) {
    if (docs[i].text.replace(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g, '').split(' ').includes(word)) {
      result.push(docs[i].id);
    }
  }

  return result;
};

export default search;
