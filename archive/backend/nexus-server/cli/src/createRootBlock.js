const inquirer = require('inquirer')
const colors = require('colors')
const {
  usersQuery,
  requestsMade,
  requestsReceived,
  requestCatalog,
  blockCatalog,
} = require('./graphql/query')
const { createOneRootBlockMutation } = require('./graphql/mutation')
const { getBlockLine } = require('./print')

const cloneOneBlock = async ({ blockDef, userId, newBlockName }) => {
  const data = {
    name: newBlockName,
    state: 'ACTIVE',
    type: blockDef.type,
    // todo: deep clone children
    requestors: { connect: [{ id: userId }] },
  }
  const newBlock = await createOneRootBlockMutation({ data })
  return newBlock
}

module.exports = async ({ userId }) => {
  const { blockDefs } = await requestCatalog()

  if (blockDefs.length == 0)
    console.log(
      colors.gray(
        'Request catalog is empty. Try to create some requests in the catalog!',
      ),
    )

  const choices = {}

  blockDefs.map((blockDef) => (choices[getBlockLine(blockDef)] = blockDef))

  const questions = [
    {
      type: 'list',
      name: 'choices',
      message: 'Please a request template from the catalog:',
      choices: Object.keys(choices),
    },
    {
      type: 'input',
      name: 'name',
      message: 'What is the name of this request?',
    },
  ]
  inquirer.prompt(questions).then(async (answers) => {
    // choices[answers.choices]({ userId })
    const blockDef = choices[answers.choices]
    const newBlockName = answers.name
    const newBlock = await cloneOneBlock({
      blockDef,
      userId,
      newBlockName,
    })
    console.log(`New block ID: ${newBlock.id}`)
  })
}
