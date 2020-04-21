import * as React from 'react'
import Amplify, { Auth } from 'aws-amplify'
import config from '../../../configs/config.js'
import logo from '../../assets/img/bellhop.png'

function Login() {
  Amplify.configure(config)
  function handleFederatedLogin() {
    Auth.federatedSignIn()
  }
  return (
    <div className="row vh-100">
      <div className="m-auto my-auto">
        <div className="text-center mb-4">
          <img src={logo} alt="" style={{ height: '5em', maxWidth: '100%' }} />
        </div>
        <button
          className="btn btn-primary form-control"
          onClick={handleFederatedLogin}
        >
          Login with social accounts
        </button>
      </div>
    </div>
  )
}

export default Login
