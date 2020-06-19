import React, { useState } from "react"
import "ace-builds/src-noconflict/ace"
import "ace-builds/webpack-resolver"
import "ace-builds/src-noconflict/mode-json"
import "ace-builds/src-noconflict/theme-dracula"
import AceEditor from "react-ace"
import { useQuery } from "@apollo/client"
import { BLOCK_CATALOG } from "../operations/queries/blockCatalog"
import { REQUEST_CATALOG } from "../operations/queries/requestCatalog"
import { REQUESTS_MADE } from "../operations/queries/requestsMade"
import { REQUESTS_RECEIVED } from "../operations/queries/requestsReceived"
import { GET_USERS } from "../operations/queries/getUsers"
import { AUTH_USER } from "../operations/queries/authUser"
import { UI_STATE } from "../operations/queries/uiState"
import { Button, Tree } from "rsuite"

const ContextViewCodes = () => {
  const { data: authUserResult } = useQuery(AUTH_USER)
  const { data: usersResult } = useQuery(GET_USERS)
  const { data: uiStateResult } = useQuery(UI_STATE)
  const { data: blockCatalog } = useQuery(BLOCK_CATALOG)
  const { data: requestCatalog } = useQuery(REQUEST_CATALOG)
  const { data: requestsMade } = useQuery(REQUESTS_MADE)
  const { data: requestsReceived } = useQuery(REQUESTS_RECEIVED)

  if (!authUserResult || !uiStateResult || !usersResult) return <></>

  const data = {
    authUser: authUserResult.authUser,
    uiState: uiStateResult.uiState,
    users: usersResult.users,
    blockCatalog,
    requestCatalog,
    requestsMade,
    requestsReceived,
  }

  return (
    <div>
      <h3>Remote States from Apollo Queries</h3>
      <AceEditor
        readOnly={true}
        mode="json"
        theme="dracula"
        name="debug"
        width="100%"
        showGutter={true}
        maxLines={Infinity}
        editorProps={{ $blockScrolling: true }}
        value={JSON.stringify(data, null, 2)}
      />
    </div>
  )
}

export { ContextViewCodes }
