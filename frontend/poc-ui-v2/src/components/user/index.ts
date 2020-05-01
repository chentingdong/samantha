import { Auth } from 'aws-amplify'
import apiWrapper from '../utils/api-wrapper'

const getUser = async (): Promise<Object> => {
  try {
    const currentUser = await Auth.currentUserPoolUser()
    return currentUser
  } catch (err) {
    console.log(err)
  }
}

const getUsers = async (): Promise<[]> => {
  try {
    const resp = await apiWrapper.get('/users')
    const users = resp.data
    return users
  } catch (err) {
    console.log(err)
    return []
  }
}

export { getUser, getUsers }
