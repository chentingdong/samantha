import { Auth } from "aws-amplify"
import users from "../../../data/users.json"
import { User } from "../context/interface"

const getUser = async (): Promise<User> => {
  try {
    const poolUser = await Auth.currentUserPoolUser()
    const currentUser = {
      id: poolUser.username,
      attributes: poolUser.attributes,
    }
    return currentUser
  } catch (err) {
    // do nothing yet
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
    // do nothing yet
    return []
  }
}

export { getUser, getUsers }
