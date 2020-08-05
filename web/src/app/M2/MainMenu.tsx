import React from "react"
import { FlexboxGrid, Dropdown } from "rsuite"
import { getLogoByTheme, setActiveMenu } from "../../utils/styles"
import styled from "styled-components"
import { AUTH_USER } from "../../operations/queries/authUser"
import { Logout } from "components/Logout"
import { BellSearch } from "./BellhopSearch"
import { UserAvatar } from "components/UserAvatar"
import { Link, useLocation } from "react-router-dom"
import { useQuery } from "@apollo/client"
import tw from "tailwind.macro"

export interface MainMenuProps {
  active?: string
  className?: string
  onSelect?: (activeKey: string) => void
}

const MainMenuRaw: React.FC<MainMenuProps> = ({
  active,
  className,
  onSelect,
  ...props
}) => {
  const {
    data: { authUser },
  } = useQuery(AUTH_USER)

  const location = useLocation()

  return (
    <div className={`${className} z-30 show-grid mb-8`} {...props}>
      <FlexboxGrid justify="space-between">
        <img
          className={"logo bell m-3 h-8"}
          src={getLogoByTheme("bell")}
          alt="Bellhop"
        />
        <div className="m-4 bg-default">
          <Link
            className={`menu-item ${setActiveMenu(
              location.pathname,
              "/lobby"
            )}`}
            to="/lobby"
          >
            Lobby
          </Link>
          <Link
            className={`menu-item ${setActiveMenu(
              location.pathname,
              "/all-bellhops"
            )}`}
            to="/all-bellhops"
          >
            All Bellhops
          </Link>
          <Link
            className={`menu-item ${setActiveMenu(
              location.pathname,
              "/my-bellhops"
            )}`}
            to="/my-bellhops"
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
      <BellSearch />
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
