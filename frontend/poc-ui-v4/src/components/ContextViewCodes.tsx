import React from "react"
import "ace-builds/src-noconflict/ace"
import "ace-builds/webpack-resolver"
import "ace-builds/src-noconflict/mode-json"
import "ace-builds/src-noconflict/theme-github"
import AceEditor from "react-ace"
import { useQuery } from "@apollo/client"
import { BLOCK_CATALOG } from "../operations/queries/blockCatalog"
import { REQUEST_CATALOG } from "../operations/queries/requestCatalog"
import { REQUESTS_MADE } from "../operations/queries/requestsMade"
import { REQUESTS_RECEIVED } from "../operations/queries/requestsReceived"
import { GET_USERS } from "../operations/queries/getUsers"
import { AUTH_USER } from "../operations/queries/authUser"

const ContextViewCodes = () => {
  const { data: authUser } = useQuery(AUTH_USER)
  const { data: users } = useQuery(GET_USERS)
  const { data: blockCatalog } = useQuery(BLOCK_CATALOG)
  const { data: requestCatalog } = useQuery(REQUEST_CATALOG)
  const { data: requestsMade } = useQuery(REQUESTS_MADE)
  const { data: requestsReceived } = useQuery(REQUESTS_RECEIVED)
  const data = {
    authUser: authUser?.authUser,
    users: users?.users,
    blockCatalog,
    requestCatalog,
    requestsMade,
    requestsReceived,
  }

  return (
    <div>
      <h5>Remote States from Apollo Queries</h5>
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
