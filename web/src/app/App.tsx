import React, { useEffect } from "react"
import Amplify, { Auth, Hub } from "aws-amplify"

import { hot } from "react-hot-loader/root"
import Routes from "../routes/Routes"
import { UPSERT_USER } from "../operations/mutations/upsertUser"
import { useMutation } from "@apollo/client"
import { setAuthUser } from "../operations/mutations/setAuthUser"
import config from "../../configs/config"
import LogRocket from "logrocket"
import { injectRsuiteStyle } from "utils/styles"

const App = (any) => {
  useEffect(() => {
    injectRsuiteStyle("bell")
  }, [])

  const [upsertUser] = useMutation(UPSERT_USER)

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
        family_name: poolUser?.attributes?.family_name,
        given_name: poolUser?.attributes?.given_name,
        picture: poolUser?.attributes?.picture,
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
            const { isAuthenticated, ...user } = authUser
            upsertUser({ variables: { object: user } })
          }
          break
        case "signOut":
          setAuthUser({ isAuthenticated: false })
          break
        case "signIn_failure":
          console.error("user sign in failed")
          break
        default:
          break
      }
    })
  }, [])

  return (
    <div className="w-screen h-screen font-sans">
      <Routes />
    </div>
  )
}

export { App }
export default hot(App)
