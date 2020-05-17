import * as React from "react"
import Amplify, { Auth, Hub } from "aws-amplify"
import { useEffect, useContext } from "react"
import { hot } from "react-hot-loader/root"
import Routes from "./routes/routes"
import "../assets/scss/app.scss"
import { Context, initialState } from "./context/store"
import config from "../../configs/config"
import { getUser, getUsers } from "./user"
import { Container, Row, Navbar } from "react-bootstrap"

const App = () => {
  const { state, dispatch } = useContext(Context)

  Amplify.configure(config)

  useEffect(() => {
    async function checkLogin() {
      const userInfo = await Auth.currentUserPoolUser()
      if (userInfo) {
        dispatch({ type: "authenticate", isAuthenticated: true })
        const user = await getUser()
        await dispatch({
          type: "set",
          data: { user },
        })
      }
    }
    checkLogin()
  }, [])

  const logout = async () => {
    await Auth.signOut()
  }

  useEffect(() => {
    Hub.listen("auth", async ({ payload: { event } }) => {
      switch (event) {
        case "signIn":
          dispatch({ type: "authenticate", isAuthenticated: true })
          const user = await getUser()
          dispatch({ type: "set", data: { user } })
          const users = await getUsers()
          dispatch({ type: "set", data: { users } })
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
      {state.isAuthenticated && (
        <Navbar className="nav justify-content-center">
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>{state?.user?.attributes?.email}</Navbar.Text>
            <Navbar.Text>
              <button className="btn btn-link" onClick={logout}>
                Logout
              </button>
            </Navbar.Text>
          </Navbar.Collapse>
        </Navbar>
      )}
      <Routes />
    </div>
  )
}

export { App }
export default hot(App)
