import React from "react"
import { useQuery, useSubscription } from "@apollo/client"
import { AUTH_USER } from "operations/queries/authUser"
import { BELL_LIST } from "operations/subscriptions/bellList"
import { PanelGroup, Panel } from "rsuite"
import { Loading, Error } from "components/Misc"
import styled from "styled-components"
import tw from "tailwind.macro"
import { BellListCard } from "./BellList"
import { MainMenu } from "./MainMenu"
import { iPlayRoles } from "utils/user"

export interface LobbyProps {
  className?: string
}

const LobbyRaw: React.FC<LobbyProps> = ({ className, ...props }) => {
  const { data: authUserResult, loading: loadingUser } = useQuery(AUTH_USER)
  const { data: bellsResult, loading: loadingBell } = useSubscription(BELL_LIST)
  if (loadingUser || loadingBell) return <Loading />

  const authUser = authUserResult.authUser
  const bells = bellsResult?.m2_bells
  const bellsIntiated = bells?.filter((bell) =>
    iPlayRoles(authUser, bell.user_participations, ["bell_initiator"])
  )

  const bellsParticipated = bells?.filter((bell) =>
    iPlayRoles(authUser, bell.user_participations, [
      "bell_participant",
      "bell_follower",
    ])
  )

  return (
    <div>
      <div className={`${className} container mx-auto`}>
        {bellsIntiated && (
          <PanelGroup accordion>
            <Panel
              header={<h4 className="border-b">Needs Your Attention</h4>}
              defaultExpanded
            >
              <BellListCard bells={bellsIntiated} whose="mine" />
            </Panel>
          </PanelGroup>
        )}
        {bellsParticipated && (
          <PanelGroup accordion>
            <Panel
              header={<h4 className="border-b">Your Other Active Bells</h4>}
              defaultExpanded
            >
              <BellListCard bells={bellsParticipated} whose="all" />
            </Panel>
          </PanelGroup>
        )}
      </div>
    </div>
  )
}

const Lobby: React.FC<LobbyProps> = styled(LobbyRaw)``
export { Lobby }
