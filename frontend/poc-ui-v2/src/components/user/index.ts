import { Auth } from 'aws-amplify'
import apiWrapper from '../utils/api-wrapper'

const getUser = async (): Promise<Object> => {
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

const getUsers = async (): Promise<[]> => {
  try {
    const resp = await apiWrapper.get('/users')
    const users = resp.data.map((user) => {
      return {
        id: user.username,
        attributes: user.attributes,
      }
    })
    return users
  } catch (err) {
    console.log(err)
    return []
  }
}

export { getUser, getUsers }
