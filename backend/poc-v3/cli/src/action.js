const inquirer = require('inquirer')
const colors = require('colors')
const { r, y, g, b, gr, sc, dash } = require('./style')
const { usersQuery } = require('./graphql/query')
const {
  startOneBlockMutation,
  completeOneBlockMutation,
  addOneResponderMutation,
} = require('./graphql/mutation')

const addOneResponderFollowUp = async ({ id }) => {
  const { users } = await usersQuery()
  const choices = {}
  users.map((user) => (choices[user.name] = user.id))
  const questions = [
    {
      type: 'list',
      name: 'choices',
      message: 'Who do you want to add as a responder?',
      choices: Object.keys(choices),
    },
  ]
  inquirer.prompt(questions).then(async (answers) => {
    const userId = choices[answers.choices]
    const { responders } = await addOneResponderMutation({ id, userId })
    console.log(
      `Responders: ${y(responders.map((user) => user.name).join(', '))}`,
    )
  })
}

// prompt for actions
const addOneResponder = async ({ id, userId }) => {
  console.log(colors.gray(`addOneResponder (${id}, ${userId})`))
  addOneResponderFollowUp({ id })
}

const startOneBlock = async ({ id, userId }) => {
  const { state } = await startOneBlockMutation({ id, userId })
  console.log(`Block ID: ${id}, state: ${sc(state)}`)
}

const completeOneBlock = async ({ id, userId }) => {
  const { state } = await completeOneBlockMutation({ id, userId })
  console.log(`Block ID: ${id}, state: ${sc(state)}`)
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

  inquirer.prompt(questions).then(async (answers) => {
    choices[answers.choices]({ id: block.id, userId })
  })
}
