import React from "react"
import Amplify, { Auth } from "aws-amplify"
import config from "../../configs/config.js"
import logo from "../assets/img/bellhop.png"
import { Button } from "rsuite"

function Login() {
  Amplify.configure(config)

  function handleFederatedLogin() {
    Auth.federatedSignIn()
  }

  return (
    <div className="grid grid-cols-6 h-screen">
      <div className="col-start-3 col-end-5 my-auto">
        <img src={logo} alt="" className="max-h-16" />
        <Button
          className="btn px-4 py-2 mt-4 w-full text-2xl text-gray-50 hover:text-gray-50 bg-gray-400 hover:bg-gray-500"
          onClick={handleFederatedLogin}
        >
          Login with social accounts
        </Button>
      </div>
    </div>
  )
}

export default Login
