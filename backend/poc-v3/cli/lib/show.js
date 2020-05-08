const inquirer = require('inquirer')
const pad = require('pad')
const colors = require('colors')
const { requestSurface, responseSurface, designSurface } = require('./graphql')

const r20 = (s) => colors.red(pad('' + s, 20))
const y20 = (s) => colors.yellow(pad('' + s, 20))
const g20 = (s) => colors.green(pad('' + s, 20))
const b20 = (s) => colors.blue(pad('' + s, 20))

const printRequestSurface = (block) => {
  console.log(
    [
      `ID: ${g20(block.id)}`,
      `parent :${g20(block.parent ? block.parent.id : 'null')}`,
      `name: ${g20(block.name)}`,
      `state: ${g20(block.state)}`,
      `Requestors: ${y20(block.requestors.map((user) => user.name).join(','))}`,
      `Responders: ${y20(block.responders.map((user) => user.name).join(','))}`,
    ].join(' '),
  )
  if (block.type.includes('COMPOSITE')) {
    if (block.type === 'COMPOSITE_PARALLEL') {
      console.log(
        '-'.repeat(40),
        colors.blue('Parallel Container'),
        '-'.repeat(40),
      )
    }
    if (block.type === 'COMPOSITE_SEQUENTIAL') {
      console.log(
        '-'.repeat(40),
        colors.blue('Sequential Container'),
        '-'.repeat(40),
      )
    }
    block.children.map((block) => {
      console.log(
        [
          ' '.repeat(8),
          `ID: ${g20(block.id)}`,
          `name: ${g20(block.name)}`,
          `state: ${g20(block.state)}`,
          `type: ${g20(block.type)}`,
        ].join(' '),
      )
    })
  }
}

const printResponseSurface = (block) => {
  printRequestSurface(block)
  if (block.type === 'LEAF_FORM') {
    console.log('-'.repeat(40), colors.blue('FORM'), '-'.repeat(40))
    console.log(
      ' '.repeat(8),
      colors.gray(`TODO: dynamically prompt through context.form object`),
    )
  }
}

const printDesignSurface = (block) => {
  console.log(
    [
      `ID: ${g20(block.id)}`,
      `name: ${g20(block.name)}`,
      `type: ${g20(block.type)}`,
    ].join(' '),
  )
}

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
}

const showDesignSurface = async ({ id, userId }) => {
  const { block } = await designSurface({ id })
  printDesignSurface(block)
}

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

module.exports = function ({ userId }) {
  inquirer.prompt(questions).then(function (answers) {
    choices[answers.choices]({ id: answers.id, userId })
  })
}
