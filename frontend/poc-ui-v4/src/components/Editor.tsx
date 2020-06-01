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
  PanelGroup,
  Panel,
  TagPicker,
} from "rsuite"
import { UI_STATE } from "../operations/queries/uiState"
import { useQuery } from "@apollo/client"
import { setUiState } from "../operations/mutations/setUiState"
import { Typename } from "../models/enum"
import { GET_USERS } from "../operations/queries/getUsers"

const Editor = () => {
  const { data } = useQuery(UI_STATE)
  const { data: usersResult } = useQuery(GET_USERS)
  const close = () => {
    setUiState({ showEditor: false })
  }

  return (
    <>
      {data && data.uiState && (
        <Drawer
          full={true}
          placement="right"
          show={data?.uiState?.showEditor}
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
                  value={data?.uiState?.draftBlock?.name}
                  onChange={(value) =>
                    setUiState({
                      draftBlock: { name: value },
                    })
                  }
                />
              </FormGroup>
              {data?.uiState?.editingTypename === Typename.Block && (
                <>
                  <FormGroup className="col-span-2">
                    <ControlLabel>Requestors: </ControlLabel>
                    <TagPicker
                      data={usersResult?.users}
                      valueKey="id"
                      labelKey="name"
                      value={data?.uiState?.draftBlock?.requestors?.map(
                        (user) => user.id
                      )}
                      onChange={(value) => {
                        setUiState({
                          draftBlock: {
                            requestors: value.map((id) =>
                              usersResult?.users.find((user) => user.id === id)
                            ),
                          },
                        })
                      }}
                    />
                  </FormGroup>
                  <FormGroup className="col-span-2">
                    <ControlLabel>Responders: </ControlLabel>
                    <TagPicker
                      data={usersResult?.users}
                      valueKey="id"
                      labelKey="name"
                      value={data?.uiState?.draftBlock?.responders?.map(
                        (user) => user.id
                      )}
                      onChange={(value) => {
                        setUiState({
                          draftBlock: {
                            responders: value.map((id) =>
                              usersResult?.users.find((user) => user.id === id)
                            ),
                          },
                        })
                      }}
                    />
                  </FormGroup>
                </>
              )}
              <FormGroup>
                <ControlLabel>Description</ControlLabel>
                <FormControl
                  rows={5}
                  name="description"
                  componentClass="textarea"
                  value={data?.uiState?.draftBlock?.description}
                  onChange={(value) =>
                    setUiState({
                      draftBlock: { description: value },
                    })
                  }
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Type</ControlLabel>
                <FormControl
                  name="type"
                  value={data?.uiState?.draftBlock?.type}
                  disabled
                />
              </FormGroup>
              <PanelGroup accordion defaultActiveKey={1} bordered>
                <Panel header="Action View" eventKey={1}>
                  <Placeholder.Paragraph rows={10} />
                </Panel>
                <Panel header="Tree View" eventKey={2}>
                  <Placeholder.Paragraph rows={10} />
                </Panel>
              </PanelGroup>
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
