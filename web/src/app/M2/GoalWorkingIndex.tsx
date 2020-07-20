// GoalWorkingIndex.tsx
// Goal working view secondary menu and navigate through 3 views
import React, { useState } from "react"
import { goalData } from "../../../data/initialGoal"
import { Nav, Navbar, FlexboxGrid, Dropdown } from "rsuite"

interface GoalWorkingIndexProps {}

export const GoalWorkingIndex: React.FC<GoalWorkingIndexProps> = (props) => {
  const [active, setActive] = useState("requests-active")
  return (
    <div>
      <div className="goalConversation">
        <h4>{goalData.name}</h4>
        <Navbar className="bg-default">
          <Nav
            className="bg-default"
            activeKey={active}
            onSelect={(activeKey) => setActive(activeKey)}
          >
            <Nav.Item eventKey="bellhop">Bellhop</Nav.Item>
            <Nav.Item eventKey="taskFlow">Task Flow</Nav.Item>
            <Nav.Item eventKey="participants">
              Participants ({goalData.owner.bellhops})
            </Nav.Item>
          </Nav>
        </Navbar>
      </div>
    </div>
  )
}
