// избавление от лишних символов
const getMatchedWordsArray = (text) => text.match(/\w+/g).map((el) => el.toLowerCase());

const search = (docs, searchString) => {
  if (docs.length === 0) {
    return [];
  }

  const indexes = {};
  let wordDocCount = {};

  for (let i = 0; i < docs.length; i += 1) {
    // избавляемся от лишних символов в документе
    const cleanText = getMatchedWordsArray(docs[i].text);

    wordDocCount = {
      ...wordDocCount,
      [docs[i].id]: cleanText.length,
    };

    // находим количество употребления каждого слова в каждом документе
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

  // избавляемся от лишних символов в поисковой строке
  const cleanSearchString = getMatchedWordsArray(searchString);

  // оставляем только документы, содержащие хотя бы одно слово из поисковой строки
  // вид результата [ слово, { документ: количество повторений } ]
  const result = Object.entries(indexes).filter((el) => cleanSearchString.includes(el[0]));

  const tfIdfDocs = {};

  result.forEach((el) => {
    const elEntries = Object.entries(el[1]);
    elEntries.forEach((doc) => {
      const tf = doc[1] / wordDocCount[doc[0]];
      const idf = Math.log(1 + (docs.length - elEntries.length + 1) / (elEntries.length + 0.5));
      const tfIdf = tf * idf;

      tfIdfDocs[doc[0]] = tfIdfDocs[doc[0]] ? tfIdfDocs[doc[0]] + tfIdf : tfIdf;
    });
  });

  return Object.entries(tfIdfDocs).sort((a, b) => b[1] - a[1]).map((el) => el[0]);
};

export default search;
