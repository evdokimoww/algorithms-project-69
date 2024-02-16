const getMatchedWordsArray = (text) => text.match(/\w+/g).map((el) => el.toLowerCase());

const sortSearchResult = (a, b) => {
  const aDocCount = a[1][0];
  const bDocCount = b[1][0];

  const aWordCount = a[1][1];
  const bWordCount = b[1][1];

  if (aDocCount > bDocCount) {
    return -1;
  }

  if (aDocCount < bDocCount) {
    return 1;
  }

  if (aDocCount === bDocCount) {
    if (aWordCount > bWordCount) {
      return -1;
    }

    if (aWordCount < bWordCount) {
      return 1;
    }
  }

  return 0;
};

const search = (docs, searchString) => {
  if (docs.length === 0) {
    return [];
  }

  const indexes = {};

  for (let i = 0; i < docs.length; i += 1) {
    const cleanText = getMatchedWordsArray(docs[i].text);

    cleanText.forEach((el) => {
      if (indexes[el]) {
        indexes[el] = {
          ...indexes[el],
          [docs[i].id]: indexes[el][docs[i].id] ? indexes[el][docs[i].id] + 1 : 1,
        };
      } else {
        indexes[el] = { [docs[i].id]: 1 };
      }
    });
  }

  const cleanSearchString = getMatchedWordsArray(searchString);
  const result = Object.entries(indexes).filter((el) => cleanSearchString.includes(el[0]));

  const sorted = {};

  result.map((el) => el[1]).forEach((el) => {
    Object.entries(el).forEach((el2) => {
      if (sorted[el2[0]]) {
        sorted[el2[0]] = [sorted[el2[0]][0] + 1, sorted[el2[0]][1] + el2[1]];
      } else {
        sorted[el2[0]] = [1, el2[1]];
      }
    });
  });

  return Object.entries(sorted).sort(sortSearchResult).map((el) => el[0]);
};

export default search;
