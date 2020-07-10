import React, { useState, useEffect } from "react"
import { Notification } from "rsuite"
import { Modal } from "rsuite"
import { Auth } from "aws-amplify"
import { Button } from "./Button"
import { Confirm } from "./Confirm"

export interface LogoutProps {}

const Logout: React.SFC<LogoutProps> = () => {
  const [show, setShow] = useState(false)
  const logout = async () => {
    await Auth.signOut()
    notify("success")
  }

  const confirm = () => {
    setShow(true)
  }
  useEffect(() => {
    console.log(show)
  }, [show])

  const notify = (funcName) => {
    Notification[funcName]({
      title: "Info",
      description: "You are successfully logged out.",
    })
  }

  return (
    <div>
      <span onClick={confirm}>Logout</span>
      <Confirm show={show} setShow={setShow} onYes={logout} onNo={null}>
        Logout
      </Confirm>
    </div>
  )
}

export { Logout }
