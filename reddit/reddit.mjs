// reddit.mjs
//#! /usr/bin / env node

// import our packages
import open from 'open'
import fetch from 'node-fetch'
import yargs from 'yargs'

console.log(process.argv);
const { argv } = yargs(process.argv)