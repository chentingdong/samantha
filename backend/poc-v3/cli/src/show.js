const inquirer = require('inquirer')
const colors = require('colors')
const { r, y, g, b, gr, sc, dash } = require('./style')
const action = require('./action')
const {
  requestSurface,
  responseSurface,
  designSurface,
} = require('./graphql/query')

// printing functions

const printRequestSurface = (block) => {
  console.log(
    [
      `ID: ${g(block.id)}`,
      `parent :${g(block.parent ? block.parent.id : 'null')}`,
      `name: ${g(block.name)}`,
      `state: ${sc(block.state)}`,
      `Requestors: ${y(block.requestors.map((user) => user.name).join(', '))}`,
      `Responders: ${y(block.responders.map((user) => user.name).join(', '))}`,
    ].join(' '),
  )
  if (block.type.includes('COMPOSITE')) {
    if (block.type === 'COMPOSITE_PARALLEL') {
      console.log(dash, colors.blue('Parallel Container'), dash)
    }
    if (block.type === 'COMPOSITE_SEQUENTIAL') {
      console.log(dash, colors.blue('Sequential Container'), dash)
    }
    block.children.map((block) => {
      console.log(
        [
          ' '.repeat(8),
          `ID: ${g(block.id)}`,
          `name: ${g(block.name)}`,
          `state: ${sc(block.state)}`,
          `type: ${g(block.type)}`,
        ].join(' '),
      )
    })
  }
}

const printResponseSurface = (block) => {
  printRequestSurface(block)
  if (block.type === 'LEAF_FORM') {
    console.log(dash, colors.blue('FORM'), dash)
    console.log(
      ' '.repeat(8),
      colors.gray(`TODO: dynamically prompt through context.form object`),
    )
  }
}

const printDesignSurface = (block) => {
  console.log(
    [
      `ID: ${g(block.id)}`,
      `name: ${g(block.name)}`,
      `type: ${g(block.type)}`,
    ].join(' '),
  )
}

// prompt for show command

const showRequestSurface = async ({ id, userId }) => {
  const { block } = await requestSurface({ id })
  if (!block) {
    console.log(`Request ID:${id} doesn't exist`)
    return
  }
  if (block.requestors.filter((user) => user.id === userId).length == 0) {
    console.log(`You are not the requestor of request ID: ${id}`)
    return
  }
  printRequestSurface(block)

  action({ block, userId })
}

const showResponseSurface = async ({ id, userId }) => {
  const { block } = await responseSurface({ id })
  if (!block) {
    console.log(`Request ID:${id} doesn't exist`)
    return
  }
  if (block.responders.filter((user) => user.id === userId).length == 0) {
    console.log(`You are not the responder of request ID: ${id}`)
    return
  }
  printResponseSurface(block)

  action({ block, userId, asResponder: true })
}

const showDesignSurface = async ({ id, userId }) => {
  const { block } = await designSurface({ id })
  printDesignSurface(block)
}

module.exports = async ({ userId }) => {
  const choices = {
    'Request Surface': showRequestSurface,
    'Response Surface': showResponseSurface,
    'Design Surface': showDesignSurface,
  }

  const questions = [
    {
      type: 'list',
      name: 'choices',
      message: 'What do you want to show?',
      choices: Object.keys(choices),
    },
    {
      type: 'number',
      name: 'id',
      message: 'Please enter the ID',
    },
  ]
  inquirer.prompt(questions).then(async (answers) => {
    choices[answers.choices]({ id: answers.id, userId })
  })
}
