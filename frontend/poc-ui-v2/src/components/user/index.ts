import { Auth } from 'aws-amplify'
import apiWrapper from '../utils/api-wrapper'
import users from '../../../data/users.json'
import { User } from '../context/interface'

const getUser = async (): Promise<User> => {
  try {
    const poolUser = await Auth.currentUserPoolUser()
    const currentUser = {
      id: poolUser.username,
      attributes: poolUser.attributes,
    }
    return currentUser
  } catch (err) {
    console.log(err)
  }
}

const getUsers = async (): Promise<User[]> => {
  try {
    // const resp = await apiWrapper.get('/users')
    // const users = resp.data.map((user) => {
    //   return {
    //     id: user.username,
    //     attributes: user.attributes,
    //   }
    // })
    // return users
    return await users
  } catch (err) {
    console.log(err)
    return []
  }
}

export { getUser, getUsers }