import React, { useEffect } from "react"
import {
  ButtonToolbar,
  Placeholder,
  PanelGroup,
  Panel,
  Grid,
  Row,
  Col,
  Icon,
  IconButton,
  Tree,
  Input,
  Notification,
} from "rsuite"
import { Drawer } from "../components/Drawer"
import { TagPicker } from "../components/TagPicker"
import { UI_STATE } from "../operations/queries/uiState"
import { useQuery } from "@apollo/client"
import { setUiState } from "../operations/mutations/setUiState"
import { Typename, EditMode } from "../models/enum"
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
import { StateBar } from "../components/StateBar"
import { transformBlockInput } from "../operations/transform"
import { useBlockMutations } from "../operations/mutations"
import styled from "styled-components"

const EditorRaw = () => {
  const { data, loading, error } = useQuery(UI_STATE)
  const { data: usersResult } = useQuery(GET_USERS)
  const [createFn, updateFn] = useBlockMutations(data?.uiState?.editingTypename)

  useEffect(() => {
    if (data?.uiState?.editorMode === EditMode.Edit) {
      const draftBlock = data?.uiState?.draftBlock
      const dataInput: any = {
        name: draftBlock.name,
        description: draftBlock.description,
        last_updated: new Date(),
      }
      if (data?.uiState?.editingTypename === "Block") {
        dataInput.requestors = {
          set: draftBlock.requestors.map((user) => ({ id: user.id })),
        }
        dataInput.responders = {
          set: draftBlock.responders.map((user) => ({ id: user.id })),
        }
      }
      updateFn({
        variables: {
          data: dataInput,
          where: {
            id: draftBlock.id,
          },
        },
      })
    }
  }, [
    data?.uiState?.draftBlock?.name,
    data?.uiState?.draftBlock?.description,
    data?.uiState?.draftBlock?.requestors,
    data?.uiState?.draftBlock?.responders,
  ])

  const close = () => {
    setUiState({ showEditor: false })
  }

  const saveNewBlock = () => {
    if (data?.uiState?.editorMode === EditMode.Create) {
      createFn({
        variables: {
          data: transformBlockInput(data?.uiState?.draftBlock),
        },
      })
    }
  }

  const getTreeData = (draftBlock: BlockOrDef) => {
    return {
      id: draftBlock.id,
      name: draftBlock.name,
      icon: getIconClassByType(draftBlock.type),
      children: Array.isArray(draftBlock?.children)
        ? draftBlock?.children.map((child) => getTreeData(child))
        : [],
    }
  }

  return (
    <div>
      {data && data.uiState && (
        <Drawer show={data?.uiState?.showEditor} close={close}>
          <h2>{`${data?.uiState?.editorMode} ${
            data?.uiState?.editingTypename === "Block"
              ? "Bell"
              : "Bell Definition"
          }`}</h2>
          <div>
            <Grid fluid>
              <Row className="my-4">
                <div>Name</div>
                <Input
                  name="name"
                  defaultValue={data?.uiState?.draftBlock?.name}
                  onChange={(value) =>
                    setUiState({
                      draftBlock: { name: value },
                    })
                  }
                />
              </Row>
              <Row className="my-4">
                <div>Description</div>
                <Input
                  rows={5}
                  name="description"
                  componentClass="textarea"
                  defaultValue={data?.uiState?.draftBlock?.description}
                  onChange={(value) =>
                    setUiState({
                      draftBlock: { description: value },
                    })
                  }
                />
              </Row>
              {data?.uiState?.editingTypename === Typename.Block && (
                <>
                  <Row className="my-4">
                    <StateBar state={data?.uiState?.draftBlock?.state} />
                  </Row>
                  <Row className="my-4">
                    <Col lg={6}>
                      <div>Requestors: </div>
                      <TagPicker
                        data={usersResult?.users}
                        value={
                          Array.isArray(data?.uiState?.draftBlock?.requestors)
                            ? data?.uiState?.draftBlock?.requestors?.map(
                                (user) => user
                              )
                            : []
                        }
                        onChange={(value) => {
                          setUiState({
                            draftBlock: {
                              requestors: value.map((selectedUser) =>
                                usersResult?.users.find(
                                  (user) => user.id === selectedUser.id
                                )
                              ),
                            },
                          })
                        }}
                      />
                    </Col>
                    <Col lg={6} lgOffset={6}>
                      <div>Responders: </div>
                      <TagPicker
                        data={usersResult?.users}
                        value={
                          Array.isArray(data?.uiState?.draftBlock?.responders)
                            ? data?.uiState?.draftBlock?.responders?.map(
                                (user) => user
                              )
                            : []
                        }
                        onChange={(value) => {
                          setUiState({
                            draftBlock: {
                              responders: value.map((selectedUser) =>
                                usersResult?.users.find(
                                  (user) => user.id === selectedUser.id
                                )
                              ),
                            },
                          })
                        }}
                      />
                    </Col>
                  </Row>
                </>
              )}
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
              {data?.uiState?.editorMode === EditMode.Create && (
                <ButtonToolbar className="my-2">
                  <IconButton
                    onClick={() => {
                      saveNewBlock()
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
              )}
            </Grid>
          </div>
        </Drawer>
      )}
    </div>
  )
}

const Editor = styled(EditorRaw)``

export { Editor }
