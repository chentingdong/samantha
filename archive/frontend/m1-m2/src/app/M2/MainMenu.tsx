import { Dropdown, FlexboxGrid } from "rsuite"
import { Link, useLocation } from "react-router-dom"

import { AUTH_USER } from "../../operations/queries/authUser"
import { Logout } from "components/Logout"
import { QuickStartSearchh } from "./QuickStartSearch"
import React from "react"
import { UserAvatar } from "components/UserAvatar"
import { getLogoByTheme } from "../../utils/styles"
import { getRouteParams } from "utils/router"
import styled from "styled-components"
import tw from "tailwind.macro"
import { useQuery } from "@apollo/client"

export interface MainMenuProps {
  active?: string
  className?: string
  onSelect?: (activeKey: string) => void
}

const MainMenuRaw: React.FC<MainMenuProps> = ({
  active = "/lobby",
  className,
  onSelect,
  ...props
}) => {
  const {
    data: { authUser },
  } = useQuery(AUTH_USER)

  const location = useLocation()
  const params = getRouteParams(location.pathname)

  const setActiveMenu = (menu: string, desk?: string): string => {
    return params.menu === menu && params.desk === desk ? "active" : ""
  }

  return (
    <div className={`${className} z-30 show-grid`} {...props}>
      <FlexboxGrid justify="space-between">
        <img
          className={"logo bell m-3 h-8"}
          src={getLogoByTheme("bell")}
          alt="Bellhop"
        />
        <div className="m-4 bg-default">
          <Link className={`menu-item ${setActiveMenu("lobby")}`} to="/lobby">
            Lobby
          </Link>
          <Link
            className={`menu-item ${setActiveMenu("bellhops", "all")}`}
            to="/bellhops/all"
          >
            All Bellhops
          </Link>
          <Link
            className={`menu-item ${setActiveMenu("bellhops", "mine")}`}
            to="/bellhops/mine"
          >
            My Bellhops
          </Link>
        </div>
        <div>
          <Logout className="inline-block p-2 px-3 cursor-pointer" />
          <Dropdown
            className="p-0 account"
            noCaret
            placement="bottomEnd"
            title={<UserAvatar user={authUser} />}
            {...props}
          >
            <Dropdown.Item>
              <div>Admin Console</div>
            </Dropdown.Item>
            <Dropdown.Item>
              <div>Profile Settings</div>
            </Dropdown.Item>
          </Dropdown>
        </div>
      </FlexboxGrid>
      <QuickStartSearchh />
    </div>
  )
}

const MainMenu = styled(MainMenuRaw)`
  .menu-item {
    ${tw`mx-2 no-underline text-gray-700`}
  }
  .active {
    ${tw`text-black font-bold`}
  }
  .rs-dropdown-menu {
    z-index: 100;
  }
`

export { MainMenu }
