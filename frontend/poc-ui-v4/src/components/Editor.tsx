import React from "react"
import {
  Drawer,
  Button,
  Form,
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock,
  ButtonToolbar,
} from "rsuite"
import { UI_STATE } from "../operations/queries/uiState"
import { useQuery } from "@apollo/client"
import { setUiState } from "../operations/mutations/setUiState"

const Editor = () => {
  const { data } = useQuery(UI_STATE)
  const close = () => {
    setUiState({ showEditor: false })
  }

  return (
    <>
      {data && data.uiState && (
        <Drawer
          size="lg"
          placement="right"
          show={data.uiState?.showEditor}
          onHide={close}
        >
          <Drawer.Header>
            <Drawer.Title>Request Editor</Drawer.Title>
          </Drawer.Header>
          <Drawer.Body>
            <Form>
              <FormGroup>
                <ControlLabel>Name</ControlLabel>
                <FormControl
                  name="name"
                  value={data.uiState?.draftBlock?.name}
                />
                <HelpBlock tooltip>Required</HelpBlock>
              </FormGroup>
              <FormGroup>
                <ControlLabel>Description</ControlLabel>
                <FormControl
                  rows={5}
                  name="description"
                  componentClass="textarea"
                  value={data.uiState?.draftBlock?.description}
                />
                <HelpBlock tooltip>Required</HelpBlock>
              </FormGroup>
              <FormGroup>
                <ButtonToolbar>
                  <Button onClick={close} appearance="primary">
                    Save
                  </Button>
                  <Button onClick={close} appearance="subtle">
                    Cancel
                  </Button>
                </ButtonToolbar>
              </FormGroup>
            </Form>
          </Drawer.Body>
        </Drawer>
      )}
    </>
  )
}

export { Editor }
