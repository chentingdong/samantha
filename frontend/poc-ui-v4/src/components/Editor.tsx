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
  Divider,
} from "rsuite"
import { UI_STATE } from "../operations/queries/uiState"
import { useQuery, useMutation } from "@apollo/client"
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
import { StateBar } from "./StateBar"
import { transformBlockInput } from "../operations/transform"
import { CREATE_ONE_BLOCK } from "../operations/mutations/createOneBlock"
import { CREATE_ONE_BLOCK_DEF } from "../operations/mutations/createOneBlockDef"

const Editor = () => {
  const { data, loading, error } = useQuery(UI_STATE)
  const { data: usersResult } = useQuery(GET_USERS)
  const [createOneBlock] = useMutation(CREATE_ONE_BLOCK)
  const [createOneBlockDef] = useMutation(CREATE_ONE_BLOCK_DEF)
  const close = () => {
    setUiState({ showEditor: false })
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
          full={false}
          size="lg"
          placement="right"
          show={data?.uiState?.showEditor}
          onHide={close}
        >
          <Drawer.Header>
            <Drawer.Title>{`${data?.uiState?.editorMode} a ${
              data?.uiState?.editingTypename === "Block"
                ? "Bell"
                : "Bell Definition"
            }`}</Drawer.Title>
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
                  <StateBar state={data?.uiState?.draftBlock?.state} />
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
                        parent={data?.uiState?.draftBlock}
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
              <Divider />
              <FormGroup>
                <ButtonToolbar>
                  <IconButton
                    onClick={() => {
                      const createFn =
                        data?.uiState?.editingTypename === "Block"
                          ? createOneBlock
                          : createOneBlockDef
                      createFn({
                        variables: {
                          data: transformBlockInput(data?.uiState?.draftBlock),
                        },
                      })
                      close()
                    }}
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
