const colors = require('colors')
const { usersQuery } = require('./graphql')

module.exports = async function ({ quiet }) {
  const username = process.env.user
  if (!username) {
    console.log("You haven't logged in.")
    process.exit(1)
  }
  const { users } = await usersQuery()
  const filterUsers = users.filter((user) => username == user.name)
  if (filterUsers.length == 0) {
    console.log("You haven't signed up.")
    process.exit(2)
  }
  if (!quiet) console.log(`Hello, ${filterUsers[0].name}!`)
  return filterUsers[0].id
}
