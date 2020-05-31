import React, { useState } from "react"
import { BlockDefItem } from "./BlockDefItem"
import { useQuery } from "@apollo/client"
import { REQUEST_CATALOG } from "../../operations/queries/requestCatalog"
import { useMutation } from "@apollo/client"
import { CREATE_ONE_BLOCK } from "../../operations/mutations/createOneBlock"
import { UPDATE_ONE_BLOCK } from "../../operations/mutations/updateOneBlock"
import { COMPLETE_ONE_BLOCK } from "../../operations/mutations/completeOneBlock"
import { BlockDef } from "../../models/interface"
import { Loading, Error } from "../Misc"
import { Drawer, Placeholder, Button } from "rsuite"

const BlockDefList = () => {
  const [show, setShow] = useState(false)
  const [createOneBlock] = useMutation(CREATE_ONE_BLOCK)
  const [updateOneBlock] = useMutation(UPDATE_ONE_BLOCK)
  const [completeOneBlock] = useMutation(COMPLETE_ONE_BLOCK)
  const { loading, error, data } = useQuery(REQUEST_CATALOG)

  if (loading) return <Loading />
  if (error) return <Error message={error.message} />

  const close = () => {
    setShow(false)
  }
  return (
    <>
      <Button onClick={() => setShow(true)}>Edit</Button>
      {data.blockDefs?.map((blockDef: BlockDef) => (
        <BlockDefItem
          block={blockDef}
          key={blockDef.id}
          actions={{ createOneBlock, updateOneBlock, completeOneBlock }}
        />
      ))}
      <Drawer full placement="right" show={show} onHide={close}>
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
    </>
  )
}

export { BlockDefList }
