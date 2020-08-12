// Goals.tsx in Bells
import React, {useState, useEffect} from "react"
import {Participants} from "./Participants"
import {Chat} from "./Chat"
import {Activities} from "./Activities"
import {Artifacts} from "./Artifacts"
import {Nav} from "rsuite"
import {useHistory, useLocation} from "react-router-dom"
import {Bell} from "models/interface"
import styled from "styled-components"
import tw from "tailwind.macro"
import {getRouteParams, buildRouterUrl} from "utils/router"

interface BellContextProps {
  className?: string
  bell: Bell
}

const BellContextRaw: React.FC<BellContextProps> = ({
  bell,
  className,
  ...props
}) => {
  const history = useHistory()
  const location = useLocation()
  const params = getRouteParams(location)
  const [activeTab, setActiveTab] = useState(params.context)

  useEffect(() => {
    setActiveTab(params.context)
  }, [params])

  const activateTab = (tab) => {
    setActiveTab(tab)
    params.context = tab
    const goalId = tab.parent?.id || params.goalId
    const path = buildRouterUrl({...params, context: tab, goalId: goalId})
    history.push(path)
  }

  return (
    <div className={`${className} flex flex-col justify-between`}>
      <Nav
        className="flex-none tabs-header"
        appearance="tabs"
        activeKey={activeTab}
        onSelect={(activeKey) => activateTab(activeKey)}
      >
        <Nav.Item eventKey="activities">Activities</Nav.Item>
        <Nav.Item eventKey="participants">Participants</Nav.Item>
        <Nav.Item eventKey="artifacts">Content</Nav.Item>
      </Nav>
      <div className="flex-grow tabs-content">
        {activeTab === "activities" && (
          <Activities bell={bell} className="activities" />
        )}
        {activeTab === "participants" && (
          <div className="flex flex-col justify-between h-full">
            <Participants
              bell={bell}
              className="flex-none bg-gray-200 participants"
            />
            <Chat className="flex-grow chat" />
          </div>
        )}
        {activeTab === "artifacts" && (
          <Artifacts
            artifacts={bell?.context?.artifacts}
            bell={bell}
            className="artifacts"
          />
        )}
      </div>
    </div>
  )
}

const BellContext: React.FC<BellContextProps> = styled(BellContextRaw)`
  .tabs-header {
    .rs-nav-item {
      ${tw`mx-1 border border-b-0 rounded-t-md`}
    }
    .rs-nav-item-active {
      ${tw`bg-gray-200`}
      >.rs-nav-item-content {
        border-bottom-color: transparent !important;
      }
    }
  }
  .tabs-content {
    ${tw`bg-gray-200`}
    .activities,
    .participants,
    .artifacts {
      ${tw`p-4`}
    }
    .participants {
      ${tw`border-b border-gray-500`}
    }
    .chat {
      ${tw`p-4`}
    }
  }
`

export {BellContext}
