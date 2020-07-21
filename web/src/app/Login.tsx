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
    <div className="h-screen grid grid-cols-6">
      <div className="my-auto col-start-3 col-end-5">
        <img src={logo} alt="" className="max-h-16" />
        <Button
          className="w-full px-4 py-2 mt-4 text-2xl text-gray-500 bg-gray-900 with-google btn hover:text-gray-300 hover:bg-gray-700"
          onClick={() =>
            Auth.federatedSignIn({
              provider: CognitoHostedUIIdentityProvider.Google,
            })
          }
        >
          Login with Google
        </Button>
        <Button
          className="w-full px-4 py-2 mt-4 text-2xl text-gray-500 bg-gray-900 hosted-ui btn hover:text-gray-300 hover:bg-gray-700"
          onClick={() => Auth.federatedSignIn()}
        >
          Open Hosted UI
        </Button>
      </div>
    </div>
  )
}

export default Login
