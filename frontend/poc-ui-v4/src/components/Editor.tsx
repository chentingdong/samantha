import React from "react"
import { Drawer, Placeholder, Button } from "rsuite"
import { UI_STATE } from "../operations/queries/uiState"
import { useQuery } from "@apollo/client"
import { setUiState } from "../operations/mutations/setUiState"

const Editor = () => {
  const { data } = useQuery(UI_STATE)
  const close = () => {
    setUiState({ showEditor: false })
  }

  return (
    <Drawer
      full
      placement="right"
      show={data?.uiState?.showEditor}
      onHide={close}
    >
      <Drawer.Header>
        <Drawer.Title>Drawer Title</Drawer.Title>
      </Drawer.Header>
      <Drawer.Body>
        <Placeholder.Paragraph rows={8} />
      </Drawer.Body>
      <Drawer.Footer>
        <Button onClick={close} appearance="primary">
          Confirm
        </Button>
        <Button onClick={close} appearance="subtle">
          Cancel
        </Button>
      </Drawer.Footer>
    </Drawer>
  )
}

export { Editor }
