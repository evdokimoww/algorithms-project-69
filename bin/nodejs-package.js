#!/usr/bin/env node

import search from '../index.js';

console.log(search(Number(process.argv[process.argv.length - 1])));
