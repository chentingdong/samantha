import React, { useEffect, useCallback } from "react"
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
import { DraftControlledInput } from "./DraftControlledInput"
import Actions from "../actions"

const EditorRaw = () => {
  const { data, loading, error } = useQuery(UI_STATE)
  const { data: usersResult } = useQuery(GET_USERS)
  const [createFn, updateFn] = useBlockMutations(data?.uiState?.editingTypename)

  const escFunction = useCallback((event) => {
    if (event.keyCode === 27) {
      // Do whatever when esc is pressed
      close()
    }
  }, [])

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false)
    return () => {
      document.removeEventListener("keydown", escFunction, false)
    }
  }, [])

  useEffect(() => {
    if (data?.uiState?.editorMode === EditMode.Edit) {
      const draft = data?.uiState?.draftBlock
      const dataInput: any = {
        last_updated: new Date(),
      }
      if (data?.uiState?.editingTypename === "Block") {
        dataInput.block_requestors = {
          data: draft.block_requestors.map((user) => ({
            user_id: user.id,
            block_id: draft.id,
            user,
          })),
        }
        dataInput.block_responders = {
          data: draft.block_responders.map((user) => ({
            user_id: user.id,
            block_id: draft.id,
            user,
          })),
        }
      }
      updateFn({
        variables: {
          data: dataInput,
          id: draft.id,
        },
      })
    }
  }, [
    data?.uiState?.draftBlock?.block_requestors,
    data?.uiState?.draftBlock?.block_responders,
  ])

  const close = () => {
    setUiState({ showEditor: false })
  }

  const saveNewBlock = (_editorMode, block) => {
    if (_editorMode === EditMode.Create) {
      createFn({
        variables: {
          data: transformBlockInput(block),
        },
      })
    }
  }

  const getTreeData = (block: BlockOrDef) => {
    return {
      id: block.id,
      name: block.name,
      icon: getIconClassByType(block.type),
      children: Array.isArray(block.children)
        ? block.children.map?.((child) => getTreeData(child))
        : [],
    }
  }

  if (!data || !usersResult) return <></>
  const { showEditor, editorMode, editingTypename, draftBlock } = data.uiState
  const { users } = usersResult

  return (
    <div className="editor">
      <Drawer show={showEditor} close={close}>
        <h2>{`${editorMode} ${
          editingTypename === "Block" ? "Bell" : "Bell Definition"
        }`}</h2>
        <div>
          <Grid fluid>
            <Row className="my-4">
              <div>Name</div>
              <DraftControlledInput fieldName="name" className="input" />
            </Row>
            <Row className="my-4">
              <div>Description</div>
              <DraftControlledInput
                fieldName="description"
                className="textarea"
              />
            </Row>
            {editingTypename === Typename.Block && (
              <>
                <Row className="my-4">
                  <StateBar state={draftBlock.state} />
                </Row>
                <Row className="my-4">
                  <Col lg={6} className="requestors">
                    <div>Requestors: </div>
                    <TagPicker
                      data={users}
                      value={draftBlock.block_requestors.map(
                        (user) => user.user
                      )}
                      onChange={(value) => {
                        setUiState({
                          draftBlock: {
                            block_requestors: value.map((selectedUser) => ({
                              user: users.find(
                                (user) => user.id === selectedUser.id
                              ),
                            })),
                          },
                        })
                      }}
                    />
                  </Col>
                  <Col lg={6} lgOffset={6} className="responders">
                    <div>Responders: </div>
                    <TagPicker
                      data={users}
                      value={draftBlock.block_responders.map(
                        (user) => user.user
                      )}
                      onChange={(value) => {
                        setUiState({
                          draftBlock: {
                            block_responders: value.map((selectedUser) => ({
                              user: users.find(
                                (user) => user.id === selectedUser.id
                              ),
                            })),
                          },
                        })
                      }}
                    />
                  </Col>
                </Row>
              </>
            )}
          </Grid>

          <PanelGroup accordion bordered>
            <Panel header="Action View" defaultExpanded>
              <Actions tagName={draftBlock.action} />
            </Panel>
            <Panel header="Nested Set View">
              <Row>
                <Col xs={16}>
                  <BlockChildrenList
                    blocks={draftBlock.children}
                    parent={draftBlock}
                    type={draftBlock.type}
                  />
                </Col>
                <Col xs={8}>
                  <BlockCatalogList />
                </Col>
              </Row>
            </Panel>
            <Panel header="Tree View" defaultExpanded>
              <Tree
                data={[getTreeData(draftBlock)]}
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
                value={JSON.stringify(draftBlock, null, 2)}
              />
            </Panel>
          </PanelGroup>
          {editorMode === EditMode.Create && (
            <ButtonToolbar className="my-2">
              <IconButton
                onClick={() => {
                  saveNewBlock(editorMode, draftBlock)
                  close()
                }}
                icon={<Icon icon="check" />}
                appearance="primary"
                className="save-bell"
              >
                Save
              </IconButton>
              <IconButton
                onClick={close}
                icon={<Icon icon="ban" />}
                appearance="primary"
              >
                Cancel
              </IconButton>
            </ButtonToolbar>
          )}
        </div>
      </Drawer>
    </div>
  )
}

const Editor = styled(EditorRaw)``

export { Editor }
