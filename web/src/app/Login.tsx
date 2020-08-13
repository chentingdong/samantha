import Amplify, {Auth} from "aws-amplify"
import React, {useEffect, useState} from "react"
import {getLogoByTheme, injectRsuiteStyle} from "../utils/styles"

import {Button} from "../components/Button"
import {CognitoHostedUIIdentityProvider} from "@aws-amplify/auth/lib/types"
import {Icon} from "rsuite"
import config from "../../configs/config.js"

const Login = () => {
  const theme = "bell"

  Amplify.configure(config)

  useEffect(() => {
    injectRsuiteStyle(theme)
  }, [theme])

  return (
    <div className="h-screen">
      <img
        className={"logo bell m-3 h-8"}
        src={getLogoByTheme("bell")}
        alt="Bellhop"
      />
      <div className="text-center">
        <div className="m-auto my-64 w-64">
          <Button
            className="w-full h-10 p-0 rounded-full block"
            onClick={() =>
              Auth.federatedSignIn({
                provider: CognitoHostedUIIdentityProvider.Google,
              })
            }
          >
            <Icon
              icon="google"
              className="float-left px-4 py-3 text-lg text-white bg-orange-500"
            />
            <div className="p-3 text-lg text-white bg-yellow-500">
              Sign in with Google
            </div>
          </Button>
          <Button
            className="w-full h-10 p-0 rounded-full block"
            onClick={() => Auth.federatedSignIn()}
          >
            <Icon
              icon="google"
              className="float-left px-4 py-3 text-lg text-white bg-orange-500"
            />
            <div className="p-3 text-lg text-white bg-yellow-500">
              Open Hosted UI
            </div>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Login
