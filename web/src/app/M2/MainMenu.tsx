import { Nav, Navbar, FlexboxGrid, Dropdown, Icon } from "rsuite"
import React from "react"
import { getLogoByTheme } from "../../utils/styles"
import styled from "styled-components"
import tw from "tailwind.macro"
import { Button } from "components/Button"
import { useQuery } from "@apollo/client"
import { AUTH_USER } from "../../operations/queries/authUser"
import { Logout } from "components/Logout"
import { userInitials } from "utils/user"

export interface MainMenuProps {
  active: string
  onSelect: (activeKey: string) => void
}

const MainMenuRaw: React.FC<MainMenuProps> = ({
  active,
  onSelect,
  ...props
}) => {
  const {
    data: { authUser },
  } = useQuery(AUTH_USER)

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
        <Navbar className="bg-default">
          <Logout className="p-2 px-3 cursor-pointer inline-block" />
          <Dropdown
            className="account p-0 "
            noCaret
            placement="bottomEnd"
            title={
              <Button color="primary" className="fill circle">
                {authUser.picture && <img src={authUser.picture} alt="" />}
                {!authUser.picture && (
                  <span className="font-bold">{userInitials(authUser)}</span>
                )}
              </Button>
            }
            {...props}
          >
            <Dropdown.Item>
              <div>Admin Console</div>
            </Dropdown.Item>
            <Dropdown.Item>
              <div>Profile Setting</div>
            </Dropdown.Item>
          </Dropdown>
        </Navbar>
      </FlexboxGrid>
    </div>
  )
}

const MainMenu = styled(MainMenuRaw)``

export { MainMenu }
