// @ts-check

import { test, expect } from '@jest/globals';
import search from '../index.js';

const doc1 = { id: 'doc1', text: "I can't shoot straight unless I've had a pint!" };
const doc2 = { id: 'doc2', text: "Don't shoot that thing at me." };
const doc3 = { id: 'doc3', text: "I'm your shooter." };
const doc4 = { id: 'doc4', text: "Don't shoot shoot shoot shoot that thing at me." };
const doc5 = { id: 'doc5', text: "Don't shoot shoot that thing at me." };

const docs = [doc1, doc2, doc3];
const docsForRelevant = [doc1, doc3, doc4, doc5];

test('search', () => {
  expect(search(docs, 'shoot')).toContain('doc1', 'doc2');
});

test('emptysearch', () => {
  expect(search([], 'shoot')).toStrictEqual([]);
});

test('relevant', () => {
  expect(search(docsForRelevant, 'shoot')).toStrictEqual(['doc4', 'doc5', 'doc1']);
});

test('fuzzy', () => {
  expect(search(docsForRelevant, 'shoot that thing')).toStrictEqual(['doc4', 'doc5', 'doc1']);
});
