import { Nav, Icon, Navbar, FlexboxGrid } from "rsuite"
import React from "react"
import { getLogoByTheme } from "../../utils/Styles"
import styled from "styled-components"
import { Button } from "components/Button"

export interface MainMenuProps {
  active: string
  onSelect: (activeKey: string) => void
}

const MainMenuRaw: React.SFC<MainMenuProps> = ({
  active,
  onSelect,
  ...props
}) => {
  return (
    <div className="show-grid" {...props}>
      <FlexboxGrid justify="space-between">
        <img
          src={getLogoByTheme("bell")}
          alt="Bellhop"
          className={`logo bell m-3 h-8`}
        />
        <Navbar>
          <Nav className="bg-default">
            <Nav.Item eventKey="news">Lobby</Nav.Item>
            <Nav.Item eventKey="solutions">Bell Desk</Nav.Item>
            <Nav.Item eventKey="products">My Bellhops</Nav.Item>
          </Nav>
        </Navbar>
        <Navbar>
          <Nav className="bg-default">
            <Nav.Item eventKey="account">Account</Nav.Item>
            <Button fill={false} color="primary" className="p-2">
              Sign Out
            </Button>
          </Nav>
        </Navbar>
      </FlexboxGrid>
    </div>
  )
}

const MainMenu = styled(MainMenuRaw)``
export default MainMenu
