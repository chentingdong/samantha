import * as React from "react"
import Amplify, { Auth, Hub } from "aws-amplify"
import { useEffect } from "react"
import { hot } from "react-hot-loader/root"
import Routes from "../routes/Routes"
import "../assets/scss/app.scss"
import config from "../../configs/config"
import { UPSERT_ONE_USER } from "../operations/mutations/upsertOneUser"
import { useMutation, useApolloClient, gql, useQuery } from "@apollo/client"
import { AUTH_USER } from "../operations/queries/authUser"

const App = () => {
  const [upsertOneUser] = useMutation(UPSERT_ONE_USER)
  const client = useApolloClient()
  Amplify.configure(config)

  async function checkLogin() {
    let poolUser
    try {
      poolUser = await Auth.currentUserPoolUser()
    } catch (error) {
      // do nothing
    }
    let authUser
    if (poolUser) {
      authUser = {
        id: poolUser?.username,
        name: poolUser?.attributes.name || poolUser?.username,
        email: poolUser?.attributes.email,
        isAuthenticated: true,
      }
      client.writeQuery({
        query: AUTH_USER,
        data: {
          authUser,
        },
      })
    }
    return authUser
  }

  useEffect(() => {
    checkLogin()
  }, [])

  useEffect(() => {
    Hub.listen("auth", async ({ payload: { event } }) => {
      switch (event) {
        case "signIn":
          const authUser = await checkLogin()
          if (authUser) {
            // upsert cognito user to backend
            const user = {
              id: authUser.id,
              name: authUser.name,
              email: authUser.email,
            }
            upsertOneUser({
              variables: { where: { id: user.id }, create: user, update: user },
            })
          }

          break
        case "signOut":
          client.writeQuery({
            query: AUTH_USER,
            data: { authUser: { isAuthenticated: false } },
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
    <div className="h-full font-serif">
      <Routes />
    </div>
  )
}

export { App }
export default hot(App)
