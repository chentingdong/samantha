import * as React from "react"
import { useQuery, useSubscription } from "@apollo/client"
import { AUTH_USER } from "operations/queries/authUser"
import { REQUESTS_RECEIVED } from "operations/subscriptions/requestsReceived"
import { Loader, PanelGroup, Panel } from "rsuite"
import { Error } from "components/Misc"
import styled from "styled-components"
import tw from "tailwind.macro"
import { BellListCard } from "./BellList"
export interface LobbyProps {}

const LobbyRaw: React.FC<LobbyProps> = () => {
  const { data: authUserResult } = useQuery(AUTH_USER)

  const {
    data: bellsMine,
    loading: loadingMine,
    error: errorMine,
  } = useSubscription(REQUESTS_RECEIVED, {
    variables: { userId: authUserResult?.authUser?.id },
  })

  const {
    data: bellsOthers,
    loading: loadingOthers,
    error: errorOthers,
  } = useSubscription(REQUESTS_RECEIVED, {
    variables: { userId: authUserResult?.authUser?.id },
  })

  if (loadingMine || loadingOthers)
    return <Loader className="container" speed="fast" content="Loading..." />

  if (errorMine || errorOthers)
    return (
      <Error
        message={`
        my bells error: ${errorMine.message},
        other beels error: ${errorOthers.message}
        `}
      />
    )

  if (!bellsMine || !bellsOthers || !authUserResult) return <></>

  return (
    <div className="container m-auto">
      <PanelGroup accordion>
        <Panel
          header={<h4 className="border-b">Needs Your Attention</h4>}
          defaultExpanded
        >
          <BellListCard bells={bellsMine.blocks} whose="mine" />
        </Panel>
      </PanelGroup>
      <PanelGroup accordion>
        <Panel
          header={<h4 className="border-b">Your Other Active Bells</h4>}
          defaultExpanded
        >
          <BellListCard bells={bellsOthers.blocks} whose="company" />
        </Panel>
      </PanelGroup>
    </div>
  )
}

const Lobby = styled(LobbyRaw)`
  .rs-panel-collapsible > .rs-panel-heading {
    ${tw`border-b border-gray-300 px-0`}
  }
  .rs-panel-group .rs-panel::before,
    border: none !important
  }
`
export { Lobby }
