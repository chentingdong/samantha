import { Nav, Navbar, FlexboxGrid } from "rsuite"
import React from "react"
import { getLogoByTheme } from "../../utils/styles"
import { Button } from "components/Button"

export interface MainMenuProps {
  active: string
  onSelect: (activeKey: string) => void
}

export const MainMenu: React.FC<MainMenuProps> = ({
  active,
  onSelect,
  ...props
}) => {
  return (
    <div className="show-grid" {...props}>
      <FlexboxGrid justify="space-between">
        <img
          className={"logo bell m-3 h-8"}
          src={getLogoByTheme("bell")}
          alt="Bellhop"
        />
        <Navbar>
          <Nav className="bg-default" activeKey={active} onSelect={onSelect}>
            <Nav.Item eventKey="lobby">Lobby</Nav.Item>
            <Nav.Item eventKey="companyBellDesk">Company Bell Desk</Nav.Item>
            <Nav.Item eventKey="myBellDesk">My Bell Desk</Nav.Item>
          </Nav>
        </Navbar>
        <Navbar>
          <Nav className="bg-default">
            <Nav.Item eventKey={null}>Account</Nav.Item>
            <Button color="bg-primary" fill={true} className="p-2">
              Sign Out
            </Button>
          </Nav>
        </Navbar>
      </FlexboxGrid>
    </div>
  )
}
