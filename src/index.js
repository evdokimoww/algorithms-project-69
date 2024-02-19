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
    cleanText.forEach((word) => {
      if (indexes[word]) {
        indexes[word] = {
          ...indexes[word],
          [docs[i].id]: indexes[word][docs[i].id] ? indexes[word][docs[i].id] + 1 : 1,
        };
      } else {
        indexes[word] = { [docs[i].id]: 1 };
      }
    });
  }

  // избавляемся от лишних символов в поисковой строке
  const cleanSearchString = getMatchedWordsArray(searchString);

  // оставляем только документы, содержащие хотя бы одно слово из поисковой строки
  // вид результата [ слово, { документ: количество повторений } ]
  const result = Object.entries(indexes).filter(([word]) => cleanSearchString.includes(word));

  const tfIdfDocs = {};

  result.forEach(([, docsCounts]) => {
    const entries = Object.entries(docsCounts);

    entries.forEach(([docId, count]) => {
      const tf = count / wordDocCount[docId];
      const idf = Math.log(1 + (docs.length - entries.length + 1) / (entries.length + 0.5));
      const tfIdf = tf * idf;

      tfIdfDocs[docId] = tfIdfDocs[docId] ? tfIdfDocs[docId] + tfIdf : tfIdf;
    });
  });

  return Object.entries(tfIdfDocs).sort((a, b) => b[1] - a[1]).map(([id]) => id);
};

export default search;
