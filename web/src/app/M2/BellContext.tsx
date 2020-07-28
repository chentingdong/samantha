// Goals.tsx in Bells
import React, { useState } from "react"
import { Participants } from "./Participants"
import { Chat } from "./Chat"
import { Activities } from "./Activities"
import { Artifacts } from "./Artifacts"
import { Nav } from "rsuite"
import { useHistory } from "react-router-dom"
import { Bell } from "models/interface"
import styled from "styled-components"
import tw from "tailwind.macro"

interface BellContextProps {
  className?: string
  computedMatch?: { params?: { context?: string } }
  bell: Bell
}

const BellContextRaw: React.FC<BellContextProps> = ({ bell, ...props }) => {
  const history = useHistory()
  const [activeTab, setActiveTab] = useState("activities")

  const activateTab = (tab) => {
    setActiveTab(tab)
    history.push(`/bells/${bell.id}/${tab}`)
  }

  const styleActive = (tab) => {
    return tab === activeTab ? "rs-nav-item-active" : ""
  }

  return (
    <div className={props.className}>
      <Nav appearance="tabs">
        <Nav.Item
          className={styleActive("activities")}
          onClick={(e) => activateTab("activities")}
        >
          Activities
        </Nav.Item>
        <Nav.Item
          className={styleActive("participants")}
          onClick={(e) => activateTab("participants")}
        >
          Participants
        </Nav.Item>
        <Nav.Item
          className={styleActive("artifacts")}
          onClick={(e) => activateTab("artifacts")}
        >
          Content
        </Nav.Item>
      </Nav>
      <div className="tabs-content">
        {activeTab === "activities" && <Activities />}
        {activeTab === "participants" && (
          <div className="h-full">
            <Participants className="participants" />
            <Chat className="chat" />
          </div>
        )}
        {activeTab === "artifacts" && <Artifacts />}
      </div>
    </div>
  )
}

const BellContext: React.FC<BellContextProps> = styled(BellContextRaw)`
  .rs-nav-item-active {
    ${tw`bg-gray-100`}
    >.rs-nav-item-content {
      border-bottom-color: transparent !important;
    }
  }
  .tabs-content {
    ${tw`bg-gray-100 h-screen relative`}
    max-height: calc(100vh - 210px);
    .participants {
      ${tw`absolute top-0 mb-4 w-full p-4 border-b bg-gray-300`}
      max-height: 10em;
    }
    .chat {
      ${tw`h-full overflow-auto p-4`}
      overflow: auto;
    }
  }
`

export { BellContext }
