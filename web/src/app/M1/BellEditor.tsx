import React, { useState, useEffect } from "react"
import { Drawer } from "../../components/Drawer"
import { UI_STATE } from "../../operations/queries/uiState"
import { useQuery, useSubscription } from "@apollo/client"
import { setUiState } from "../../operations/mutations/setUiState"
import { GET_BELL } from "../../operations/subscriptions/getBell"
import { BellTree } from "./BellTree"
import { EditBlock } from "./EditBlock"
import { initialBell } from "../../../data/bell.m1"

const BellEditor = (props) => {
  const [bell, setBell] = useState(initialBell)
  const { data, loading } = useQuery(UI_STATE)
  const { data: bellResult, loading: loadingBell } = useSubscription(GET_BELL, {
    variables: { id: data?.uiState.currentBellId },
  })

  useEffect(() => {
    if (bellResult?.bells_by_pk) setBell(bellResult.bells_by_pk)
  }, [bellResult])

  if (loading) return <>Loading...</>
  if (loadingBell) return <>Loading Bell</>

  const close = () => {
    setUiState({ showBellEditor: false })
  }

  return (
    <div className="editor">
      <Drawer show={data?.uiState?.showBellEditor} close={close}>
        {data?.uiState.currentBellId && (
          <>
            <div className="container mx-auto">
              <h2>Editing Bell</h2>
              <div className="m-2">
                <label>Name</label>
                <div>{bell.name}</div>
              </div>
              <div className="m-2">
                <label>Description</label>
                <div>{bell.description}</div>
              </div>
              <div className="m-2">
                <label>Started at</label>
                {/* <div>{bell.started_at}</div> */}
              </div>
              <div className="m-2">
                <label>State</label>
                <div>{bell.state}</div>
              </div>
            </div>
            <BellTree bell={bell} />
          </>
        )}
        <div className="container mx-auto">
          <EditBlock blockId={data?.uiState?.currentBlockId} />
        </div>
      </Drawer>
    </div>
  )
}

export { BellEditor }
