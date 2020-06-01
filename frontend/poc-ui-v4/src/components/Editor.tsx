import React from "react"
import {
  Drawer,
  Button,
  Form,
  FormGroup,
  ControlLabel,
  FormControl,
  ButtonToolbar,
  Placeholder,
  Divider,
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
          full={true}
          size="lg"
          placement="right"
          show={data.uiState?.showEditor}
          onHide={close}
        >
          <Drawer.Header>
            <Drawer.Title>Request Editor</Drawer.Title>
          </Drawer.Header>
          <Drawer.Body>
            <Form fluid>
              <FormGroup>
                <ControlLabel>Name</ControlLabel>
                <FormControl
                  name="name"
                  value={data.uiState?.draftBlock?.name}
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Description</ControlLabel>
                <FormControl
                  rows={5}
                  name="description"
                  componentClass="textarea"
                  value={data.uiState?.draftBlock?.description}
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Type</ControlLabel>
                <FormControl
                  name="type"
                  value={data.uiState?.draftBlock?.type}
                />
              </FormGroup>
              <Divider>Action View</Divider>
              <FormGroup>
                <ControlLabel>Action View</ControlLabel>
                <Placeholder.Paragraph rows={10} />
              </FormGroup>
              <Divider>View View</Divider>
              <FormGroup>
                <ControlLabel>Tree View</ControlLabel>
                <Placeholder.Paragraph rows={10} />
              </FormGroup>
              <Divider />
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
