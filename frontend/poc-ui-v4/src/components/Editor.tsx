import React from "react"
import {
  Drawer,
  ButtonToolbar,
  Placeholder,
  PanelGroup,
  Panel,
  TagPicker,
  Grid,
  Row as RowRaw,
  Col,
  Icon,
  IconButton,
  Tree,
  Divider,
  Input,
  Notification,
} from "rsuite"
import { UI_STATE } from "../operations/queries/uiState"
import { useQuery, useMutation } from "@apollo/client"
import { setUiState } from "../operations/mutations/setUiState"
import { Typename, MutationType, EditMode } from "../models/enum"
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
import { UPDATE_ONE_BLOCK } from "../operations/mutations/updateOneBlock"
import { UPDATE_ONE_BLOCK_DEF } from "../operations/mutations/updateOneBlockDef"
import { REQUEST_CATALOG } from "../operations/queries/requestCatalog"
import { REQUESTS_MADE } from "../operations/queries/requestsMade"
import { REQUESTS_RECEIVED } from "../operations/queries/requestsReceived"
import styled from "styled-components"
import tw from "tailwind.macro"

const EditorRaw = () => {
  const { data, loading, error } = useQuery(UI_STATE)
  const { data: usersResult } = useQuery(GET_USERS)
  const [createOneBlock] = useMutation(CREATE_ONE_BLOCK, {
    refetchQueries: [{ query: REQUESTS_MADE }, { query: REQUESTS_RECEIVED }],
  })
  const [createOneBlockDef] = useMutation(CREATE_ONE_BLOCK_DEF, {
    refetchQueries: [{ query: REQUEST_CATALOG }],
  })
  const createFn =
    data?.uiState?.editingTypename === "Block"
      ? createOneBlock
      : createOneBlockDef

  const [updateOneBlock] = useMutation(UPDATE_ONE_BLOCK)
  const [updateOneBlockDef] = useMutation(UPDATE_ONE_BLOCK_DEF)
  const updateFn =
    data?.uiState?.editingTypename === "Block"
      ? updateOneBlock
      : updateOneBlockDef

  const saveExistingBlock = () => {
    if (data?.uiState?.editorMode === EditMode.Edit) {
      const draftBlock = data?.uiState?.draftBlock
      const dataInput: any = {
        name: draftBlock.name,
        description: draftBlock.description,
        last_updated: new Date(),
      }
      if (data?.uiState?.editingTypename === "Block") {
        dataInput.requestors = {
          connect: draftBlock.requestors.map((user) => ({ id: user.id })),
        }
        dataInput.responders = {
          connect: draftBlock.responders.map((user) => ({ id: user.id })),
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
  }

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
            <Grid fluid>
              <Row>
                <div>Name</div>
                <Input
                  name="name"
                  value={data?.uiState?.draftBlock?.name}
                  onChange={(value) =>
                    setUiState({
                      draftBlock: { name: value },
                    })
                  }
                  onBlur={saveExistingBlock}
                />
              </Row>
              <Row>
                <div>Description</div>
                <Input
                  rows={5}
                  name="description"
                  componentClass="textarea"
                  value={data?.uiState?.draftBlock?.description}
                  onChange={(value) =>
                    setUiState({
                      draftBlock: { description: value },
                    })
                  }
                  onBlur={saveExistingBlock}
                />
              </Row>
              {data?.uiState?.editingTypename === Typename.Block && (
                <>
                  <Row>
                    <StateBar state={data?.uiState?.draftBlock?.state} />
                  </Row>
                  <Row>
                    <Col lg={6}>
                      <div>Requestors: </div>
                      <TagPicker
                        data={usersResult?.users}
                        valueKey="id"
                        labelKey="name"
                        value={
                          Array.isArray(data?.uiState?.draftBlock?.requestors)
                            ? data?.uiState?.draftBlock?.requestors.map(
                                (user) => user.id
                              )
                            : []
                        }
                        onChange={(value) => {
                          setUiState({
                            draftBlock: {
                              requestors: value.map((id) =>
                                usersResult?.users.find(
                                  (user) => user.id === id
                                )
                              ),
                            },
                          })
                        }}
                        onBlur={saveExistingBlock}
                      />
                    </Col>
                    <Col lg={6} lgOffset={6}>
                      <div>Responders: </div>
                      <TagPicker
                        data={usersResult?.users}
                        valueKey="id"
                        labelKey="name"
                        value={
                          Array.isArray(data?.uiState?.draftBlock?.responders)
                            ? data?.uiState?.draftBlock?.responders.map(
                                (user) => user.id
                              )
                            : []
                        }
                        onChange={(value) => {
                          setUiState({
                            draftBlock: {
                              responders: value.map((id) =>
                                usersResult?.users.find(
                                  (user) => user.id === id
                                )
                              ),
                            },
                          })
                        }}
                        onBlur={saveExistingBlock}
                      />
                    </Col>
                  </Row>
                </>
              )}

              <Row>
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
              </Row>
              {data?.uiState?.editorMode === EditMode.Create && (
                <Row>
                  <ButtonToolbar>
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
                </Row>
              )}
            </Grid>
          </Drawer.Body>
        </Drawer>
      )}
    </>
  )
}

const Editor = styled(EditorRaw)``

const Row = styled(RowRaw)`
  margin-bottom: 20px;
`

export { Editor }
