import sum from 'lodash/sum.js';

const getMatchedWordsArray = (text) => text.match(/\w+/g).map((el) => el.toLowerCase());

const sortSearchResult = (a, b) => {
  const aValues = Object.values(a[1]);
  const bValues = Object.values(b[1]);

  if (aValues.length > bValues.length) {
    return -1;
  }

  if (aValues.length < bValues.length) {
    return 1;
  }

  if (aValues.length === bValues.length) {
    if (sum(aValues) > sum(bValues)) {
      return -1;
    }

    if (sum(aValues) < sum(bValues)) {
      return 1;
    }
  }

  return 0;
};

const search = (docs, searchString) => {
  if (docs.length === 0) {
    return [];
  }

  const result = {};
  const cleanSearchString = getMatchedWordsArray(searchString);

  for (let i = 0; i < docs.length; i += 1) {
    const cleanText = getMatchedWordsArray(docs[i].text);

    for (let j = 0; j < cleanSearchString.length; j += 1) {
      if (cleanText.includes(cleanSearchString[j])) {
        result[docs[i].id] = {
          ...result[docs[i].id],
          [cleanSearchString[j]]: 0,
        };

        for (let k = 0; k < cleanText.length; k += 1) {
          if (cleanText[k] === cleanSearchString[j]) {
            result[docs[i].id][cleanSearchString[j]] += 1;
          }
        }
      }
    }
  }

  return Object.entries(result).sort(sortSearchResult).map((el) => el[0]);
};

export default search;
