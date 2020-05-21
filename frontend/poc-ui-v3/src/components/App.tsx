import * as React from "react"
import Amplify, { Auth, Hub } from "aws-amplify"
import { useEffect } from "react"
import { hot } from "react-hot-loader/root"
import Routes from "../routes/Routes"
import "../assets/scss/app.scss"
import config from "../../configs/config"
import { UPSERT_ONE_USER } from "../operations/mutations/upsertOneUser"
import { useMutation, useApolloClient, gql } from "@apollo/client"
import { AUTHENTICATED_USER } from "../operations/queries/authenticatedUser"
import { IS_AUTHENTICATED } from "../operations/queries/isAuthenticated"

const App = () => {
  const [upsertOneUser] = useMutation(UPSERT_ONE_USER)
  const client = useApolloClient()
  Amplify.configure(config)

  async function checkLogin() {
    let poolUser
    try {
      poolUser = await Auth.currentUserPoolUser()
    } catch (error) {
      console.warn("Please login.")
    }
    let authenticatedUser
    if (poolUser) {
      client.writeQuery({
        query: IS_AUTHENTICATED,
        data: { isAuthenticated: true },
      })
      authenticatedUser = {
        id: poolUser?.username,
        attributes: poolUser?.attributes,
      }
      client.writeQuery({
        query: AUTHENTICATED_USER,
        data: { authenticatedUser },
      })
    }
    return authenticatedUser
  }

  useEffect(() => {
    checkLogin()
  }, [])

  useEffect(() => {
    Hub.listen("auth", async ({ payload: { event } }) => {
      switch (event) {
        case "signIn":
          const authenticatedUser = await checkLogin()
          if (authenticatedUser) {
            // upsert cognito user to backend
            const user = {
              id: authenticatedUser.id,
              name: authenticatedUser.attributes?.name || authenticatedUser.id,
              email: authenticatedUser.attributes?.email,
            }
            upsertOneUser({
              variables: { where: { id: user.id }, create: user, update: user },
            })
          }

          break
        case "signOut":
          client.writeQuery({
            query: IS_AUTHENTICATED,
            data: { isAuthenticated: false },
          })
          client.writeQuery({
            query: AUTHENTICATED_USER,
            data: { authenticatedUser: {} },
          })

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
