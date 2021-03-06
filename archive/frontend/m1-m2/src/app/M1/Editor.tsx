import React, { useEffect, useCallback } from "react"
import { nanoid } from "nanoid"
import {
  ButtonToolbar,
  PanelGroup,
  Panel,
  Grid,
  Row,
  Col,
  Icon,
  IconButton,
} from "rsuite"
import { Drawer } from "../../components/Drawer"
import { TagPicker } from "../../components/TagPicker"
import { UI_STATE } from "../../operations/queries/uiState"
import { useQuery, useMutation, useSubscription } from "@apollo/client"
import { setUiState } from "../../operations/mutations/setUiState"
import { Typename, EditMode } from "../../models/enum"
import { GET_USERS } from "../../operations/queries/getUsers"
import "ace-builds/src-noconflict/ace"
import "ace-builds/webpack-resolver"
import "ace-builds/src-noconflict/mode-json"
import "ace-builds/src-noconflict/theme-dracula"
import AceEditor from "react-ace"
import { BlockChildrenList } from "./BlockChildrenList"
import { BlockCatalogList } from "./BlockCatalogList"
import { StateBar } from "../../components/StateBar"
import { transformBlockInput } from "../../operations/transform"
import { useBlockMutations } from "../../operations/mutations"
import styled from "styled-components"
import { DraftControlledInput } from "./DraftControlledInput"
import { Control } from "../../controls/Control"
import { BlockTree } from "./BlockTree"
import { CREATE_ONE_BELL } from "../../operations/mutations/createOneBell"
import { DELETE_ONE_BELL } from "../../operations/mutations/deleteOneBell"
import { INSERT_BLOCK_REQUESTOR } from "../../operations/mutations/insertBlockRequestor"
import { DELETE_BLOCK_REQUESTOR } from "../../operations/mutations/deleteBlockRequestor"
import { INSERT_BLOCK_RESPONDER } from "../../operations/mutations/insertBlockResponder"
import { DELETE_BLOCK_RESPONDER } from "../../operations/mutations/deleteBlockResponder"
import { GET_BLOCK_M1 } from "../../operations/subscriptions/getBlock"
import { deleteOneBlock } from "../../operations/blockOperations"

const EditorRaw = () => {
  const { data } = useQuery(UI_STATE)
  const { data: usersResult } = useQuery(GET_USERS)
  const [createFn, updateFn, deleteFn] = useBlockMutations(
    data?.uiState?.editingTypename
  )
  const [createOneBell] = useMutation(CREATE_ONE_BELL)
  const [deleteOneBell] = useMutation(DELETE_ONE_BELL)
  const [insertBlockRequestor] = useMutation(INSERT_BLOCK_REQUESTOR)
  const [deleteBlockRequestor] = useMutation(DELETE_BLOCK_REQUESTOR)
  const [insertBlockResponder] = useMutation(INSERT_BLOCK_RESPONDER)
  const [deleteBlockResponder] = useMutation(DELETE_BLOCK_RESPONDER)
  const { data: blockResult } = useSubscription(GET_BLOCK_M1, {
    variables: { id: data?.uiState?.draftBlock?.id },
  })

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
      if (data?.uiState?.editingTypename === Typename.blocks) {
        dataInput.requestors = {
          data: draft.requestors?.map((user) => ({
            user_id: user.id,
            block_id: draft.id,
            user,
          })),
        }
        dataInput.responders = {
          data: draft.responders?.map((user) => ({
            user_id: user.id,
            block_id: draft.id,
            user,
          })),
        }
      }
    }
  }, [
    data?.uiState?.draftBlock?.requestors,
    data?.uiState?.draftBlock?.responders,
  ])

  const close = () => {
    setUiState({ showEditor: false })
  }

  const setRootId = async (_block, root_id) => {
    updateFn({ variables: { data: { root_id }, id: _block.id } })
    if (Array.isArray(_block?.children)) {
      _block?.children?.map(({ child }) => setRootId(child, root_id))
    }
  }

  const createBell = async (block) => {
    const bell = {
      id: nanoid(),
      root_block_id: block.id,
      name: block.name,
      description: block.description,
      state: "Created",
      context: {},
    }
    await createOneBell({ variables: { data: bell } })
    return bell.id
  }

  const deleteBell = async (bellId) => {
    deleteOneBell({
      variables: {
        data: { id: bellId },
      },
    })
  }

  const deleteBLock = (block) => {
    const syncRemote = editorMode === EditMode.Edit
    deleteOneBlock(draftBlock, block, parent, syncRemote, deleteFn)
  }

  const saveNewBlock = async (_editorMode, _editingTypename, block) => {
    if (_editorMode === EditMode.Create) {
      let bellId = ""
      try {
        await createFn({
          variables: {
            data: transformBlockInput(block),
          },
        })
        // set root recursively
        await setRootId(block, block.id)

        // create a bell based on root block
        bellId = await createBell(block)

        if (_editingTypename === "blocks") {
          updateFn({ variables: { data: { state: "Running" }, id: block.id } })
        }
      } catch (error) {
        deleteBLock(block)
        deleteBell(bellId)
      }
    }
    close()
  }

  const chooseRequestors = (value) => {
    setUiState({
      draftBlock: {
        requestors: value.map((selectedUser) => ({
          user: users.find((user) => user.id === selectedUser.id),
        })),
      },
    })
  }

  const chooseResponders = (value) => {
    setUiState({
      draftBlock: {
        responders: value.map((selectedUser) => ({
          user: users.find((user) => user.id === selectedUser.id),
        })),
      },
    })
  }

  const insertRequestor = (value) => {
    if (data?.uiState?.editorMode === EditMode.Edit) {
      insertBlockRequestor({
        variables: {
          object: {
            block_id: draftBlock.id,
            user_id: value.id,
          },
        },
      })
    }
  }

  const deleteRequestor = (value) => {
    if (data?.uiState?.editorMode === EditMode.Edit) {
      deleteBlockRequestor({
        variables: {
          block_id: draftBlock.id,
          user_id: value.id,
        },
      })
    }
  }

  const insertResponder = (value) => {
    if (data?.uiState?.editorMode === EditMode.Edit) {
      insertBlockResponder({
        variables: {
          object: {
            block_id: draftBlock.id,
            user_id: value.id,
          },
        },
      })
    }
  }

  const deleteResponder = (value) => {
    if (data?.uiState?.editorMode === EditMode.Edit) {
      deleteBlockResponder({
        variables: {
          block_id: draftBlock.id,
          user_id: value.id,
        },
      })
    }
  }

  if (!data || !usersResult) return <></>
  const { showEditor, editorMode, editingTypename, draftBlock } = data.uiState
  const { users } = usersResult

  return (
    <div className="editor">
      <Drawer show={showEditor} close={close}>
        <h2>{`${editorMode} ${
          editingTypename === "blocks" ? "Bell" : "Bell Definition"
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
            {editingTypename === Typename.blocks && (
              <>
                <Row className="my-4">
                  <StateBar state={draftBlock.state} />
                </Row>
                <Row className="my-4">
                  <Col xs={12} className="requestors">
                    <div>Requestors: </div>
                    <TagPicker
                      data={users}
                      value={
                        Array.isArray(draftBlock?.requestors)
                          ? draftBlock?.requestors?.map((user) => user.user)
                          : []
                      }
                      onChange={(value) => chooseRequestors(value)}
                      onInsertTag={(value) => insertRequestor(value)}
                      onDeleteTag={(value) => deleteRequestor(value)}
                    />
                  </Col>
                  <Col xs={12} className="responders">
                    <div>Responders: </div>
                    <TagPicker
                      data={users}
                      value={
                        Array.isArray(draftBlock?.responders)
                          ? draftBlock?.responders?.map((user) => user.user)
                          : []
                      }
                      onChange={(value) => chooseResponders(value)}
                      onInsertTag={(value) => insertResponder(value)}
                      onDeleteTag={(value) => deleteResponder(value)}
                    />
                  </Col>
                </Row>
              </>
            )}
          </Grid>

          <PanelGroup accordion bordered>
            {draftBlock.blockType?.category === "Action" && (
              <Panel header="Action View" defaultExpanded>
                <Control />
              </Panel>
            )}
            {draftBlock.blockType?.category === "Control" && (
              <Panel header="Nested Set View">
                <Row>
                  <Col xs={16}>
                    <BlockChildrenList
                      blocks={draftBlock?.children?.map(({ child }) => child)}
                      parent={draftBlock}
                      type={draftBlock.blockType}
                    />
                  </Col>
                  <Col xs={8}>
                    <BlockCatalogList />
                  </Col>
                </Row>
              </Panel>
            )}
            {draftBlock.blockType?.category === "Control" &&
              (editorMode === EditMode.Create ||
                editingTypename === Typename.blockDefs) && (
                <Panel header="Tree View" defaultExpanded>
                  <BlockTree data={draftBlock} />
                </Panel>
              )}
            {draftBlock.blockType?.category === "Control" &&
              editorMode === EditMode.Edit &&
              editingTypename === Typename.blocks &&
              blockResult && (
                <Panel header="Tree View" defaultExpanded>
                  <BlockTree data={blockResult?.blocks_by_pk} />
                </Panel>
              )}
            {/* {editorMode === EditMode.Edit &&
              editingTypename === Typename.blocks &&
              data.uiState.showBellEditor && (
                <Panel header="Edit Block" defaultExpanded>
                  <EditBlock blockId={data.uiState.currentBlockId} />
                </Panel>
              )} */}
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
                  saveNewBlock(editorMode, editingTypename, draftBlock)
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
