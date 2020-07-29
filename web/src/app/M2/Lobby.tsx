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

export interface LobbyProps {}

const LobbyRaw: React.FC<LobbyProps> = (props) => {
  const { data: authUserResult } = useQuery(AUTH_USER)

  const { data: bellsResult, loading, error } = useSubscription(BELL_LIST)

  const bellsMine = bellsResult?.m2_bells
  const bellsOthers = bellsResult?.m2_bells

  console.log(bellsResult?.m2_bells)
  // const {
  //   data: bellsMine,
  //   loading: loadingMine,
  //   error: errorMine,
  // } = useSubscription(BELL_LIST, {
  //   variables: { userId: authUserResult?.authUser?.id },
  // })

  // const {
  //   data: bellsOthers,
  //   loading: loadingOthers,
  //   error: errorOthers,
  // } = useSubscription(BELL_LIST, {
  //   variables: { userId: authUserResult?.authUser?.id },
  // })

  return (
    <div>
      <MainMenu className="md-8" />
      <div className="container mx-auto">
        {loading && <Loading />}
        {error && <Error message={error.message} />}
        {bellsMine && (
          <PanelGroup accordion>
            <Panel
              header={<h4 className="border-b">Needs Your Attention</h4>}
              defaultExpanded
            >
              <BellListCard bells={bellsMine} whose="mine" />
            </Panel>
          </PanelGroup>
        )}
        {bellsOthers && (
          <PanelGroup accordion>
            <Panel
              header={<h4 className="border-b">Your Other Active Bells</h4>}
              defaultExpanded
            >
              <BellListCard bells={bellsOthers} whose="company" />
            </Panel>
          </PanelGroup>
        )}
      </div>
    </div>
  )
}

const Lobby: React.FC<LobbyProps> = styled(LobbyRaw)``
export { Lobby }
