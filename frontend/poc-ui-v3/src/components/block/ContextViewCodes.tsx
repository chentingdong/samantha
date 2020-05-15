import React, { useContext } from "react"
import AceEditor from "react-ace"
import "ace-builds/src-noconflict/mode-json"
import "ace-builds/src-noconflict/theme-github"
import { Context } from "../context/store"
import { useQuery } from "@apollo/client"
import { BLOCK_CATALOG } from "../../operations/queries/blockCatalog"
import { REQUEST_CATALOG } from "../../operations/queries/requestCatalog"
import { REQUESTS_MADE } from "../../operations/queries/requestsMade"
import { REQUESTS_RECEIVED } from "../../operations/queries/requestsReceived"

const ContextViewCodes = () => {
  const { state, dispatch } = useContext(Context)
  let { data: blockCatalog } = useQuery(BLOCK_CATALOG)
  let { data: requestCatalog } = useQuery(REQUEST_CATALOG)
  let { data: requestsMade } = useQuery(REQUESTS_MADE)
  let { data: requestsReceived } = useQuery(REQUESTS_RECEIVED)
  let data = {
    user: state.user,
    users: state.users,
    blockCatalog: blockCatalog,
    requestCatalog: requestCatalog,
    requestsMade: requestsMade,
    requestsReceived: requestsReceived,
  }

  return (
    <div>
      <h5>Apollo Cache</h5>
      <AceEditor
        mode="json"
        theme="github"
        name="context"
        width="100%"
        maxLines={Infinity}
        editorProps={{ $blockScrolling: true }}
        value={JSON.stringify(data, null, 2)}
      />
    </div>
  )
}

export { ContextViewCodes }
