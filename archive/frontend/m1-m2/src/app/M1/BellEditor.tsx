import React, { useState, useEffect } from "react"
import { Drawer } from "../../components/Drawer"
import { UI_STATE } from "../../operations/queries/uiState"
import { useQuery } from "@apollo/client"
import { setUiState } from "../../operations/mutations/setUiState"
import { BELLS_BY_PK } from "../../operations/queries/bellByPk"
import { BellTree } from "./BellTree"
import { EditBlock } from "./EditBlock"
import { initialBell } from "../../../data/bell.m1"

const BellEditor = (props) => {
  const [bell, setBell] = useState(initialBell)
  const { data, loading } = useQuery(UI_STATE)
  const { data: bellResult, loading: loadingBell } = useQuery(BELLS_BY_PK, {
    variables: { id: data?.uiState.runningBellId },
  })

  useEffect(() => {
    if (bellResult?.bells) setBell(bellResult.bells)
    setUiState({ runningBellId: bellResult?.bells[0].id })
    setBell(bellResult?.bells[0])
  }, [bellResult])

  if (loading) return <>Loading...</>
  if (loadingBell) return <>Loading Bell</>

  const close = () => {
    setUiState({ showBellEditor: false })
  }

  return (
    <div className="editor">
      <Drawer show={data?.uiState?.showBellEditor} close={close}>
        {data?.uiState.runningBellId && (
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
