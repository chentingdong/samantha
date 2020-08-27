// Goals.tsx in Bells
import React, { useEffect, useRef, useState } from "react"
import { buildRouterUrl, getRouteParams } from "utils/router"
import { useHistory, useLocation } from "react-router-dom"

import { Activities } from "./Activities"
import { Artifacts } from "./Artifacts"
import { Bell } from "models/interface"
import { Chat } from "app/chat/Chat"
import { Nav } from "rsuite"
import { Participants } from "./Participants"
import styled from "styled-components"
import tw from "tailwind.macro"

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
  const params = getRouteParams(location.pathname)
  const [activeTab, setActiveTab] = useState(params.context)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    setActiveTab(params.context)
  }, [params])

  const activateTab = (tab) => {
    setActiveTab(tab)
    params.context = tab
    const goalId = tab.parent?.id || params.goalId
    const path = buildRouterUrl({ ...params, context: tab, goalId: goalId })
    history.push(path)
  }

  useEffect(() => {
    messagesEndRef?.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    })
  })

  return (
    <div className={`${className} flex flex-col h-full justify-between`}>
      <Nav
        className="flex-none w-full bg-white tabs-header"
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
              className="flex-none w-full bg-gray-200 participants"
              bell={bell}
            />
            <Chat bell={bell} className="flex-grow chat" />
          </div>
        )}
        {activeTab === "artifacts" && (
          <Artifacts
            artifacts={bell?.context["artifacts"]}
            bell={bell}
            className="artifacts"
          />
        )}
      </div>
      <div ref={messagesEndRef} />
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

export { BellContext }
