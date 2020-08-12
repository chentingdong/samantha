import React, { FC, useState, useEffect, Dispatch, SetStateAction } from "react"
import { Modal } from "rsuite"
import { Button } from "../components/Button"

type ConfirmTypes = {
  show: boolean
  setShow: Dispatch<SetStateAction<boolean>>
  onYes: () => void
  onNo: () => void
  style?: "lightbox" | "inline"
  yesText?: string
  noText?: string
}

const Confirm: FC<ConfirmTypes> = ({
  show,
  setShow,
  onYes,
  onNo,
  style = "lightbox",
  yesText = "Ok",
  noText = "Cancel",
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
    onNo()
    close()
  }

  const DisplayInModal = (props) => (
    <Modal show={show} onHide={close} {...props}>
      <Modal.Header>
        <Modal.Title>Confirm</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-sm">
        <p>Please confirm</p>
      </Modal.Body>
      <Modal.Footer className="absolute bottom-0 right-0 flex">
        <Button className="fill" onClick={handleYes} color="primary">
          {yesText}
        </Button>
        <Button className="" onClick={handleNo} color="warning">
          {noText}
        </Button>
      </Modal.Footer>
    </Modal>
  )

  const DisplayInline = (props) => (
    <div {...props}>
      {show && (
        <>
          <Button className="fill" onClick={handleYes} color="secondary">
            {yesText}
          </Button>
          <Button className="" onClick={handleNo} color="warning">
            {noText}
          </Button>
        </>
      )}
    </div>
  )

  return (
    <div {...props}>
      {style === "lightbox" && <DisplayInModal {...props} />}
      {style === "inline" && <DisplayInline {...props} />}
    </div>
  )
}

export { Confirm }
