const inquirer = require('inquirer')
const colors = require('colors')
const {
  requestSurface,
  responseSurface,
  designSurface,
} = require('./graphql/query')

// prompt for actions
const addOneResponder = async ({ id, userId }) => {
  console.log(colors.gray(`addOneResponder (${id}, ${userId})`))
}

const startOneBlock = async ({ id, userId }) => {
  console.log(colors.gray(`startOneBlock (${id}, ${userId})`))
}

const completeOneBlock = async ({ id, userId }) => {
  console.log(colors.gray(`completeOneBlock (${id}, ${userId})`))
}

const addOneChildBlock = async ({ id, userId }) => {
  console.log(colors.gray(`addOneChildBlock (${id}, ${userId})`))
}

const fillOneForm = async ({ id, userId }) => {
  console.log(colors.gray(`fillOneForm (${id}, ${userId})`))
}

module.exports = async ({ block, userId, asResponder = false }) => {
  if (block.state === 'COMPLETE') return

  const choices = {
    'Add a Responder': addOneResponder,
  }

  if (block.state === 'PENDING') {
    choices['Start'] = startOneBlock
  }

  if (block.state === 'ACTIVE') {
    choices['Complete'] = completeOneBlock
  }

  if (block.type.includes('COMPOSITE')) {
    choices['Add a Block'] = addOneChildBlock
  }

  if (asResponder && block.type === 'LEAF_FORM') {
    choices['Fill a Form'] = fillOneForm
  }

  const questions = [
    {
      type: 'list',
      name: 'choices',
      message: 'What action do you want to take?',
      choices: Object.keys(choices),
    },
  ]

  inquirer.prompt(questions).then(function (answers) {
    choices[answers.choices]({ id: block.id, userId })
  })
}
