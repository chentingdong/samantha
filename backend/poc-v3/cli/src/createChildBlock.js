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
const { createOneRootBlockMutation } = require('./graphql/mutation')
const { getBlockLine } = require('./print')

const cloneOneBlock = async ({ block, userId, newBlockName, parentBlock }) => {
  const data = {
    name: newBlockName,
    state: parentBlock.type === 'COMPOSITE_PARALLEL' ? 'ACTIVE' : 'PENDING',
    type: block.type,
    parent: { connect: { id: parentBlock.id } },
    // todo: deep clone children
    requestors: { connect: [{ id: userId }] },
  }
  const newBlock = await createOneRootBlockMutation({ data })
  return newBlock
}

module.exports = async ({ id, userId, parentBlock }) => {
  const { blocks } = await blockCatalog()

  if (blocks.length == 0)
    console.log(
      colors.gray(
        'Block catalog is empty. Try to create some requests in the catalog!',
      ),
    )

  const choices = {}

  blocks.map((block) => (choices[getBlockLine(block)] = block))

  const questions = [
    {
      type: 'list',
      name: 'choices',
      message: 'Please a block definitionfrom the catalog:',
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
      parentBlock,
    })
    console.log(`New block ID: ${newBlock.id}`)
  })
}
