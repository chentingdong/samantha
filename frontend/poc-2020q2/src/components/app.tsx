import * as React from 'react'
import Amplify, { Auth, Hub } from 'aws-amplify'
import { useEffect, useContext } from 'react'
import { hot } from 'react-hot-loader/root'
import Routes from './routes/routes'
import './../assets/scss/app.scss'
import { Context } from './context/store'
import config from '../../configs/config'
import { getUser, getUsers } from './user'

export const App = () => {
  const { state, dispatch } = useContext(Context)

  Amplify.configure(config)

  useEffect(() => {
    async function checkLogin() {
      const userInfo = await Auth.currentUserPoolUser()
      if (userInfo) {
        dispatch({ type: 'authenticate', isAuthenticated: true })
        console.log(`user logged in. ${JSON.stringify(userInfo)}`)
      } else {
        console.log('not logged in')
      }
    }
    checkLogin()
  }, [])

  const logout = async () => {
    await Auth.signOut()
  }

  useEffect(() => {
    Hub.listen('auth', async ({ payload: { event } }) => {
      switch (event) {
        case 'signIn':
          dispatch({ type: 'authenticate', isAuthenticated: true })
          const user = await getUser()
          dispatch({ type: 'setUser', user: user })
          const users = await getUsers()
          dispatch({ type: 'setUsers', users: users })
          break
        case 'signOut':
          dispatch({ type: 'authenticate', isAuthenticated: false })
          dispatch({ type: 'setUser', user: {} })
          dispatch({ type: 'setUsers', users: [] })
          break
        case 'signIn_failure':
          console.error('user sign in failed')
          break
        default:
          break
      }
    })
  }, [])

  return (
    <div className="app wrapper vh-100">
      {state.isAuthenticated && (
        <div className="btn btn-light float-right" onClick={logout}>
          logout
        </div>
      )}
      <Routes />
    </div>
  )
}

export default hot(App)
