import * as React from 'react'
import Amplify, { Auth } from 'aws-amplify'
import config from '../../../configs/config.js'
import logo from '../../assets/img/bellhop.png'

function Login() {
  Amplify.configure(config)
  async function handleFederatedLogin() {
    Auth.federatedSignIn()
  }
  return (
    <div className="m-auto col-4">
      <div className="text-center mb-4">
        <img src={logo} alt="" style={{ height: '5em' }} />
      </div>
      <button
        className="btn btn-primary form-control"
        onClick={handleFederatedLogin}
      >
        Login with social accounts
      </button>
    </div>
  )
}

export default Login
