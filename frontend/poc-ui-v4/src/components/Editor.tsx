import React, { useState } from "react"
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
  Alert,
  Grid,
  Row,
  Col,
  Icon,
  IconButton,
  Tree,
  Notification,
} from "rsuite"
import { UI_STATE } from "../operations/queries/uiState"
import { useQuery } from "@apollo/client"
import { setUiState } from "../operations/mutations/setUiState"
import { Typename, MutationType } from "../models/enum"
import { GET_USERS } from "../operations/queries/getUsers"
import "ace-builds/src-noconflict/ace"
import "ace-builds/webpack-resolver"
import "ace-builds/src-noconflict/mode-json"
import "ace-builds/src-noconflict/theme-dracula"
import AceEditor from "react-ace"
import { BlockChildrenList } from "./BlockChildrenList"
import { BlockCatalogList } from "./BlockCatalogList"
import { BlockOrDef } from "../models/interface"
import { getIconClassByType } from "../utils/Styles"

const Editor = () => {
  const { data, loading, error } = useQuery(UI_STATE)
  const { data: usersResult } = useQuery(GET_USERS)
  const close = () => {
    setUiState({ showEditor: false })
  }
  const addSubBlock = (childBlock: BlockOrDef) => {
    // had to create a copy of children because it is not extensible
    setUiState({
      draftBlock: {
        ...data?.uiState?.draftBlock,
        children: [...data?.uiState?.draftBlock?.children, childBlock],
      },
    })
  }

  const deleteSubBlock = (childBlock: BlockOrDef) => {
    const index = data?.uiState?.draftBlock?.children.findIndex(
      (child) => child.id === childBlock.id
    )
    if (index < 0) return
    const updatedChild = {
      ...data?.uiState?.draftBlock?.children[index],
      __mutation_type__: MutationType.Delete,
    }
    const updatedChildren = [...data?.uiState?.draftBlock?.children]
    updatedChildren[index] = updatedChild
    setUiState({
      draftBlock: {
        ...data?.uiState?.draftBlock,
        children: updatedChildren,
      },
    })
  }

  const getTreeData = (draftBlock: BlockOrDef) => {
    return {
      id: draftBlock.id,
      name: draftBlock.name,
      icon: getIconClassByType(draftBlock.type),
      children: draftBlock.children.map((child) => getTreeData(child)),
    }
  }

  return (
    <>
      {data && data.uiState && (
        <Drawer
          full={true}
          size="lg"
          placement="right"
          show={data?.uiState?.showEditor}
          onHide={close}
        >
          <Drawer.Header>
            <Drawer.Title>Bell Editor</Drawer.Title>
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
              <FormGroup>
                <ControlLabel>Type</ControlLabel>
                <FormControl
                  name="type"
                  value={data?.uiState?.draftBlock?.type}
                  disabled
                />
              </FormGroup>
              {data?.uiState?.editingTypename === Typename.Block && (
                <>
                  <FormGroup>
                    <ControlLabel>State</ControlLabel>
                    <FormControl
                      name="state"
                      value={data?.uiState?.draftBlock?.state}
                      disabled
                    />
                  </FormGroup>
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
              <PanelGroup accordion bordered>
                <Panel header="Action View">
                  <Placeholder.Paragraph rows={10} />
                </Panel>
                <Panel header="Nested Set View" defaultExpanded>
                  <Row>
                    <Col xs={16}>
                      <BlockChildrenList
                        blocks={data?.uiState?.draftBlock?.children}
                        addSubBlock={addSubBlock}
                        onDelete={(childBlock) => deleteSubBlock(childBlock)}
                        type={data?.uiState?.draftBlock?.type}
                      />
                    </Col>
                    <Col xs={8}>
                      <BlockCatalogList />
                    </Col>
                  </Row>
                </Panel>
                <Panel header="Tree View" defaultExpanded>
                  <Tree
                    data={[getTreeData(data?.uiState?.draftBlock)]}
                    labelKey="name"
                    valueKey="id"
                    defaultExpandAll
                    size="lg"
                    renderTreeNode={(nodeData) => {
                      return (
                        <span>
                          <i className={nodeData.icon} /> {nodeData.name}
                        </span>
                      )
                    }}
                  />
                </Panel>
                <Panel header="Debug View">
                  <AceEditor
                    readOnly={true}
                    mode="json"
                    theme="dracula"
                    name="debug"
                    width="100%"
                    showGutter={true}
                    maxLines={Infinity}
                    editorProps={{ $blockScrolling: true }}
                    value={JSON.stringify(data?.uiState?.draftBlock, null, 2)}
                  />
                </Panel>
              </PanelGroup>
              <FormGroup>
                <ButtonToolbar>
                  <IconButton
                    onClick={close}
                    icon={<Icon icon="check" />}
                    appearance="primary"
                  >
                    Save
                  </IconButton>
                  <IconButton
                    onClick={close}
                    icon={<Icon icon="ban" />}
                    appearance="subtle"
                  >
                    Cancel
                  </IconButton>
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
