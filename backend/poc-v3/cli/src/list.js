const inquirer = require('inquirer')
const pad = require('pad')
const colors = require('colors')
const { r, y, g, b, gr, sc, d40 } = require('./style')
const {
  usersQuery,
  requestsMade,
  requestsReceived,
  requestCatalog,
  blockCatalog,
} = require('./graphql/query')

const printBlockLine = (block) => {
  console.log(
    [
      `ID: ${g(block.id)}`,
      `parent :${g(block.parent ? block.parent.id : 'null')}`,
      `name: ${g(block.name)}`,
      `state: ${sc(block.state)}`,
      `type: ${g(block.type)}`,
      `Requestors: ${y(block.requestors.map((user) => user.name).join(', '))}`,
      `Responders: ${y(block.responders.map((user) => user.name).join(', '))}`,
    ].join(' '),
  )
}

const listRequestsMade = async ({ userId }) => {
  const { blocks } = await requestsMade({ userId })
  if (blocks.length == 0)
    console.log(
      colors.gray(
        'You have made 0 request so far. Try to create some requests!',
      ),
    )
  blocks.map((block) => printBlockLine(block))
}

const listRequestsReceived = async ({ userId }) => {
  const { blocks } = await requestsReceived({ userId })
  if (blocks.length == 0)
    console.log(colors.gray('You have received 0 request so far!'))
  blocks.map((block) => printBlockLine(block))
}

const listRequestCatalog = async () => {
  const { blocks } = await requestCatalog()
  if (blocks.length == 0)
    console.log(
      colors.gray(
        'Request catalog is empty. Try to create some requests in the catalog!',
      ),
    )
  blocks.map((block) =>
    printBlockLine(
      colors.gray(
        'Request catalog is empty. Try to create some requests in the catalog!',
      ),
    ),
  )
}

const listBlockCatalog = async () => {
  const { blocks } = await blockCatalog()
  if (blocks.length == 0)
    console.log(
      colors.gray(
        'Block catalog is empty. Try to create some blocks in the catalog!',
      ),
    )
  blocks.map((block) => printBlockLine(block))
}

const listUsers = async () => {
  const { users } = await usersQuery()
  users.map((user) =>
    console.log([`name: ${g(user.name)}`, `email: ${g(user.email)}`].join(' ')),
  )
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

module.exports = async ({ userId }) => {
  inquirer.prompt(questions).then(async (answers) => {
    choices[answers.choices]({ userId })
  })
}
