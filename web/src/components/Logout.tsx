import React, { useState, useEffect } from "react"
import { Notification, Modal } from "rsuite"
import { Auth } from "aws-amplify"
import { Confirm } from "./Confirm"

export interface LogoutProps {}

const Logout: React.SFC<LogoutProps> = (props) => {
  const [showConfirm, setShowConfirm] = useState(false)

  const confirm = () => {
    setShowConfirm(true)
  }

  const logout = async () => {
    await Auth.signOut()
    notify("success")
  }

  const cancel = () => {
    setShowConfirm(false)
  }

  const notify = (funcName) => {
    Notification[funcName]({
      title: "Info",
      description: "You are successfully logged out.",
      duration: 0,
    })
  }

  return (
    <div {...props}>
      <span onClick={confirm}>Sign Out</span>
      <Confirm
        show={showConfirm}
        setShow={setShowConfirm}
        onYes={logout}
        onNo={cancel}
      />
    </div>
  )
}

export { Logout }
