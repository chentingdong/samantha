import * as React from "react"
import Amplify, { Auth, Hub } from "aws-amplify"
import { useEffect, useContext } from "react"
import { hot } from "react-hot-loader/root"
import Routes from "../routes/Routes"
import "../assets/scss/app.scss"
import { Context, initialState } from "../context/store"
import config from "../../configs/config"
import { UPSERT_ONE_USER } from "../operations/mutations/upsertOneUser"
import { useMutation, useLazyQuery } from "@apollo/client"
import { GET_USERS } from "../operations/queries/getUsers"

const App = () => {
  const { state, dispatch } = useContext(Context)
  const [upsertOneUser] = useMutation(UPSERT_ONE_USER)
  const [getUsers, { data }] = useLazyQuery(GET_USERS)

  useEffect(() => {
    if (data && data.users) {
      dispatch({
        type: "set",
        data: { users: data?.users },
      })
    }
  }, [data])

  Amplify.configure(config)

  useEffect(() => {
    async function checkLogin() {
      const poolUser = await Auth.currentUserPoolUser()
      if (poolUser) {
        dispatch({ type: "authenticate", isAuthenticated: true })
        const user = {
          id: poolUser.username,
          attributes: poolUser.attributes,
        }
        dispatch({
          type: "set",
          data: { user },
        })
        getUsers()
      }
    }
    checkLogin()
  }, [])

  useEffect(() => {
    Hub.listen("auth", async ({ payload: { event } }) => {
      switch (event) {
        case "signIn":
          dispatch({ type: "authenticate", isAuthenticated: true })
          // get user from cognito
          const cognitoUser = await Auth.currentUserPoolUser()
          dispatch({ type: "set", data: { user: cognitoUser } })

          // upsert cognito user to backend
          const user = {
            id: cognitoUser.username,
            name: cognitoUser.attributes?.name || cognitoUser.id,
            email: cognitoUser.attributes?.email,
          }
          upsertOneUser({
            variables: { where: { id: user.id }, create: user, update: user },
          })
          // update users
          getUsers()

          break
        case "signOut":
          dispatch({ type: "authenticate", isAuthenticated: false })
          dispatch({ type: "set", data: { user: initialState.user } })
          dispatch({ type: "set", data: { users: initialState.users } })
          break
        case "signIn_failure":
          // console.error("user sign in failed")
          break
        default:
          break
      }
    })
  }, [])

  return (
    <div className="app wrapper vh-100">
      <Routes />
    </div>
  )
}

export { App }
export default hot(App)
