import React, { useState, useEffect } from "react"
import { Notification, Modal } from "rsuite"
import { Auth } from "aws-amplify"
import { Button } from "./Button"

export interface LogoutProps {}

const Logout: React.SFC<LogoutProps> = (props) => {
  const [showConfirm, setShowConfirm] = useState(false)

  const confirm = () => {
    setShowConfirm(true)
  }

  const logout = async () => {
    await Auth.signOuts()
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
      <span onClick={confirm}>Logout</span>
      <Modal show={showConfirm} onHide={close}>
        <Modal.Header>
          <Modal.Title>Confirm</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-sm">
          <p>Please confirm you want to logout </p>
        </Modal.Body>
        <Modal.Footer className="flex absolute bottom-0 right-0">
          <Button className="fill" onClick={logout} color="primary">
            Logout
          </Button>
          <Button className="" onClick={cancel} color="warning" fill={false}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export { Logout }
