import React, { useEffect, useState } from "react"
import Amplify, { Auth } from "aws-amplify"
import config from "../../configs/config.js"
import logo from "../assets/img/bellhop.png"
import { Button } from "../components/Button"
import { injectRsuiteStyle } from "../utils/styles"
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth/lib/types"

const Login = () => {
  const theme = "bell"
  Amplify.configure(config)

  useEffect(() => {
    injectRsuiteStyle(theme)
  }, [theme])

  return (
    <div className="grid grid-cols-6 h-screen">
      <div className="col-start-3 col-end-5 my-auto">
        <img src={logo} alt="" className="max-h-16" />
        <Button
          className="with-google btn px-4 py-2 mt-4 w-full text-2xl text-gray-500 hover:text-gray-300 bg-gray-900 hover:bg-gray-700"
          onClick={() =>
            Auth.federatedSignIn({
              provider: CognitoHostedUIIdentityProvider.Google,
            })
          }
        >
          Login with Google
        </Button>
        <Button
          className="hosted-ui btn px-4 py-2 mt-4 w-full text-2xl text-gray-500 hover:text-gray-300 bg-gray-900 hover:bg-gray-700"
          onClick={() => Auth.federatedSignIn()}
        >
          Open Hosted UI
        </Button>
      </div>
    </div>
  )
}

export default Login
