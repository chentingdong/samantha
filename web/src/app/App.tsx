import * as React from "react"
import Amplify, { Auth, Hub } from "aws-amplify"
import { useEffect } from "react"
import { hot } from "react-hot-loader/root"
import Routes from "../routes/Routes"
import { UPSERT_USER } from "../operations/mutations/upsertUser"
import { useMutation, useApolloClient, gql, useQuery } from "@apollo/client"
import { setAuthUser } from "../operations/mutations/setAuthUser"
import config from "../../configs/config"
import "../../dist/tailwind/tailwind.generated.css"
import LogRocket from "logrocket"

const App = () => {
  const [upsertUser] = useMutation(UPSERT_USER)
  const client = useApolloClient()
  Amplify.configure(config)

  async function checkLogin() {
    let poolUser
    try {
      poolUser = await Auth.currentUserPoolUser({ bypassCache: true })
    } catch (error) {
      // do nothing
    }
    let authUser
    if (poolUser) {
      authUser = {
        id: poolUser?.username,
        name: poolUser?.attributes?.name || poolUser?.username,
        email: poolUser?.attributes?.email,
        isAuthenticated: true,
      }
      setAuthUser({ ...authUser })
      LogRocket.identify(authUser.id, {
        name: authUser.name,
        email: authUser.email,
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
            upsertUser({ variables: { object: user } })
          }

          break
        case "signOut":
          setAuthUser({ isAuthenticated: false })

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
