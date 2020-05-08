const inquirer = require('inquirer')
const pad = require('pad')
const colors = require('colors')
const {
  usersQuery,
  requestsMade,
  requestsReceived,
  requestCatalog,
  blockCatalog,
} = require('./graphql')

const r20 = (s) => colors.red(pad('' + s, 20))
const y20 = (s) => colors.yellow(pad('' + s, 20))
const g20 = (s) => colors.green(pad('' + s, 20))
const b20 = (s) => colors.blue(pad('' + s, 20))

const printBlockLine = (block) => {
  console.log(
    [
      `ID: ${g20(block.id)}`,
      `parent :${g20(block.parent ? block.parent.id : 'null')}`,
      `name: ${g20(block.name)}`,
      `state: ${g20(block.state)}`,
      `type: ${g20(block.type)}`,
      `Requestors: ${y20(block.requestors.map((user) => user.name).join(','))}`,
      `Responders: ${y20(block.responders.map((user) => user.name).join(','))}`,
    ].join(' '),
  )
}

const listRequestsMade = async ({ userId }) => {
  const { blocks } = await requestsMade({ userId })
  if (blocks.length == 0) console.log('Empty')
  blocks.map((block) => printBlockLine(block))
}

const listRequestsReceived = async ({ userId }) => {
  const { blocks } = await requestsReceived({ userId })
  if (blocks.length == 0) console.log('Empty')
  blocks.map((block) => printBlockLine(block))
}

const listRequestCatalog = async () => {
  const { blocks } = await requestCatalog()
  if (blocks.length == 0) console.log('Empty')
  blocks.map((block) => printBlockLine(block))
}

const listBlockCatalog = async () => {
  const { blocks } = await blockCatalog()
  if (blocks.length == 0) console.log('Empty')
  blocks.map((block) => printBlockLine(block))
}

const listUsers = async () => {
  const { users } = await usersQuery()
  users.map((user) => console.log(user.name))
}

const choices = {
  'Requests Made': listRequestsMade,
  'Requests Received': listRequestsReceived,
  'Request Catalog': listRequestCatalog,
  'Block Catalog': listBlockCatalog,
  Users: listUsers,
}

const questions = [
  {
    type: 'list',
    name: 'choices',
    message: 'What do you want to list?',
    choices: Object.keys(choices),
  },
]

module.exports = function ({ userId }) {
  inquirer.prompt(questions).then(function (answers) {
    choices[answers.choices]({ userId })
  })
}
