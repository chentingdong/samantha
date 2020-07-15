import * as React from "react"
import { useQuery, useSubscription } from "@apollo/client"
import { AUTH_USER } from "operations/queries/authUser"
import { REQUESTS_RECEIVED } from "operations/subscriptions/requestsReceived"
import { Loader, PanelGroup, Panel } from "rsuite"
import { Error } from "components/Misc"
import { BlockDef } from "models/interface"
import { BellSearch } from "./BellSearch"
import { LobbyBell } from "./LobbyBell"
import styled from "styled-components"
import tw from "tailwind.macro"

export interface LobbyProps {
  className?: string
}

const LobbyRaw: React.FC<LobbyProps> = ({ className = "", ...props }) => {
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
    return <Loader speed="fast" content="Loading..." />

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
    <div className={className}>
      <BellSearch />
      <PanelGroup accordion>
        <Panel header="Needs Your Attention" defaultExpanded>
          <div
            className={
              "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-12 px-18 py-10"
            }
          >
            {bellsMine.blocks.map((block: BlockDef, index: number) => (
              <LobbyBell key={block.id} block={block} />
            ))}
          </div>
        </Panel>
        <Panel header="Your Other Active Bells" defaultExpanded>
          <div
            className={
              "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-12 p-18 py-10"
            }
          >
            {bellsOthers.blocks.map((block: BlockDef, index: number) => (
              <LobbyBell key={block.id} block={block} />
            ))}
          </div>
        </Panel>
      </PanelGroup>
    </div>
  )
}

const Lobby = styled(LobbyRaw)`
  .rs-panel-collapsible > .rs-panel-heading {
    ${tw`border-b border-gray-300 px-0`}
  }
  .rs-panel-group .rs-panel {
    ${tw`border-b-none`}
  }
  .rs-panel-group .rs-panel + .rs-panel::before {
    border-top: none;
  }
`
export { Lobby }
