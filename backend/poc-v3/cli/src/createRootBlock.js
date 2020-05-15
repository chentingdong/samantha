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

const cloneOneBlock = async ({ block, userId, newBlockName }) => {
  const data = {
    name: newBlockName,
    state: 'ACTIVE',
    type: block.type,
    // todo: deep clone children
    requestors: { connect: [{ id: userId }] },
  }
  const newBlock = await createOneRootBlockMutation({ data })
  return newBlock
}

module.exports = async ({ userId }) => {
  const { blocks } = await requestCatalog()

  if (blocks.length == 0)
    console.log(
      colors.gray(
        'Request catalog is empty. Try to create some requests in the catalog!',
      ),
    )

  const choices = {}

  blocks.map((block) => (choices[getBlockLine(block)] = block))

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
    const block = choices[answers.choices]
    const newBlockName = answers.name
    const newBlock = await cloneOneBlock({
      block,
      userId,
      newBlockName,
    })
    console.log(`New block ID: ${newBlock.id}`)
  })
}
