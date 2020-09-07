#!/usr/bin/env node

const { getCode, getName } = require('country-list');

var myArgs = process.argv.slice(2);
console.log(myArgs);

var country = myArgs[0];
console.log(getCode(country))
var date = new Date();
var year = date.getFullYear();
console.log(year);