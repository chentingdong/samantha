#!/usr/bin/env node
const { program } = require('commander')

program
  .command('clone <source>')
  .description('clone a repository into a newly created directory')
  .action((cmd, source) => {
    console.log(`command called from ${source} to`)
  })
  .parse(process.argv)

console.log(process.argv)
