import React, { FC, useState, useEffect, Dispatch, SetStateAction } from "react"
import { Modal } from "rsuite"
import { Button } from "../components/Button"

type ConfirmTypes = {
  show: boolean
  setShow: Dispatch<SetStateAction<boolean>>
  onYes: () => void
  onNo: () => void
}

const Confirm: FC<ConfirmTypes> = ({
  show,
  setShow,
  onYes,
  onNo,
  ...props
}) => {
  const close = () => {
    setShow(false)
  }

  const handleYes = () => {
    onYes()
    close()
  }
  const handleNo = () => {
    close()
  }

  return (
    <Modal show={show} onHide={close} className="">
      <Modal.Header>
        <Modal.Title>Confirm</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-sm">
        <p>Please confirm you want to logout </p>
      </Modal.Body>
      <Modal.Footer className="flex absolute bottom-0 right-0">
        <Button className="" onClick={handleYes} color="primary">
          Ok
        </Button>
        <Button className="" onClick={handleNo} color="warning" fill={false}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export { Confirm }
