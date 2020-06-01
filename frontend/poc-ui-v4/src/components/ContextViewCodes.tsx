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
import { UI_STATE } from "../operations/queries/uiState"
import { Button } from "rsuite"
import { setUiState } from "../operations/mutations/setUiState"
import { setAuthUser } from "../operations/mutations/setAuthUser"
const ContextViewCodes = () => {
  const { data: authUser } = useQuery(AUTH_USER)
  const { data: users } = useQuery(GET_USERS)
  const { data: uiState } = useQuery(UI_STATE)
  const { data: blockCatalog } = useQuery(BLOCK_CATALOG)
  const { data: requestCatalog } = useQuery(REQUEST_CATALOG)
  const { data: requestsMade } = useQuery(REQUESTS_MADE)
  const { data: requestsReceived } = useQuery(REQUESTS_RECEIVED)
  const data = {
    authUser: authUser?.authUser,
    uiState: uiState?.uiState,
    users: users?.users,
    blockCatalog,
    requestCatalog,
    requestsMade,
    requestsReceived,
  }

  return (
    <div>
      <Button
        onClick={(e) => {
          setAuthUser({
            id: "Google_111918078641246610063",
            name: "Baiji He",
          })
        }}
      >
        change auth user
      </Button>
      <Button
        onClick={(e) => {
          setUiState({
            draftBlock: {
              requestors: [
                {
                  id: "Google_111918078641246610063",
                  name: "Baiji He",
                  email: "he.baiji@gmail.com",
                },
              ],
            },
          })
        }}
      >
        change requestors
      </Button>
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
