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
      <div className="flex flex-col justify-between tabs-content">
        {activeTab === "activities" && <Activities />}
        {activeTab === "participants" && (
          <>
            <Participants className="mb-4 overflow-auto border-b participants" />
            <Chat />
          </>
        )}
        {activeTab === "artifacts" && <Artifacts />}
      </div>
    </div>
  )
}

const BellContext: React.FC<BellContextProps> = styled(BellContextRaw)`
  .rs-nav-item-active {
    ${tw`bg-gray-300`}
    >.rs-nav-item-content {
      border-bottom-color: transparent !important;
    }
  }
  .tabs-content {
    ${tw`bg-gray-300 overflow-hidden px-4 pt-4`}
    height: calc(100vh - 210px);
    .participants {
      max-height: 10em;
    }
  }
`

export { BellContext }
