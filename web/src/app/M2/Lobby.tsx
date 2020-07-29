import React from "react"
import { useQuery, useSubscription } from "@apollo/client"
import { AUTH_USER } from "operations/queries/authUser"
import { REQUESTS_RECEIVED } from "operations/subscriptions/requestsReceived"
import { PanelGroup, Panel } from "rsuite"
import { Loading, Error } from "components/Misc"
import styled from "styled-components"
import tw from "tailwind.macro"
import { BellListCard } from "./BellList"
import { MainMenu } from "./MainMenu"

export interface LobbyProps {}

const LobbyRaw: React.FC<LobbyProps> = (props) => {
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

  return (
    <div {...props}>
      <MainMenu className="md-8" />
      <div className="container mx-auto">
        {loadingMine && <Loading />}
        {errorMine && <Error message={errorMine.message} />}
        {bellsMine && (
          <PanelGroup accordion>
            <Panel
              header={<h4 className="border-b">Needs Your Attention</h4>}
              defaultExpanded
            >
              <BellListCard bells={bellsMine.blocks} whose="mine" />
            </Panel>
          </PanelGroup>
        )}
        {loadingOthers && <Loading />}
        {errorOthers && <Error message={errorOthers.message} />}
        {bellsOthers && (
          <PanelGroup accordion>
            <Panel
              header={<h4 className="border-b">Your Other Active Bells</h4>}
              defaultExpanded
            >
              <BellListCard bells={bellsOthers?.blocks} whose="company" />
            </Panel>
          </PanelGroup>
        )}
      </div>
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
