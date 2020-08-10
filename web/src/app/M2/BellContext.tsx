// Goals.tsx in Bells
import React, { useState, useEffect } from "react"
import { Participants } from "./Participants"
import { Chat } from "./Chat"
import { Activities } from "./Activities"
import { Artifacts } from "./Artifacts"
import { Nav } from "rsuite"
import { useHistory, useLocation } from "react-router-dom"
import { Bell } from "models/interface"
import styled from "styled-components"
import tw from "tailwind.macro"
import { getRouteParams, buildRouterUrl } from "utils/router"

interface BellContextProps {
  className?: string
  bell: Bell
}

const BellContextRaw: React.FC<BellContextProps> = ({ bell, ...props }) => {
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
    const path = buildRouterUrl(params)
    console.log(params.context, tab)
    history.push(path)
  }

  return (
    <div className={props.className}>
      <Nav
        appearance="tabs"
        activeKey={activeTab}
        onSelect={(activeKey) => activateTab(activeKey)}
      >
        <Nav.Item eventKey="activities">Activities</Nav.Item>
        <Nav.Item eventKey="participants">Participants</Nav.Item>
        <Nav.Item eventKey="artifacts">Content</Nav.Item>
      </Nav>
      <div className="overflow-y-auto tabs-content">
        {activeTab === "activities" && (
          <Activities bell={bell} className="activities" />
        )}
        {activeTab === "participants" && (
          <div className="h-full">
            <Participants bell={bell} className="participants" />
            <Chat className="chat" />
          </div>
        )}
        {activeTab === "artifacts" && (
          <Artifacts
            artifacts={bell.context?.artifacts}
            className="artifacts"
          />
        )}
      </div>
    </div>
  )
}

const BellContext: React.FC<BellContextProps> = styled(BellContextRaw)`
  .rs-nav-tabs ul {
    /* ${tw`flex justify-between`} */
  }
  .rs-nav-item {
    ${tw`mx-1 border border-b-0 rounded-t-md`}
  }
  .rs-nav-item-active {
    ${tw`bg-gray-200`}
    >.rs-nav-item-content {
      border-bottom-color: transparent !important;
    }
  }
  .tabs-content {
    ${tw`bg-gray-200 h-screen relative`}
    height: calc(100% - 37px);
    .activities,
    .participants,
    .artifacts {
      ${tw`p-4`}
    }
    .participants {
      ${tw`absolute top-0 mb-4 w-full border-b border-gray-500`}
      max-height: 10em;
    }
    .chat {
      ${tw`h-full overflow-auto p-4`}
      overflow: auto;
    }
  }
`

export { BellContext }
