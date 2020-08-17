import React from "react"
import { User } from "models/interface"
import { userInitials } from "utils/user"
import styled from "styled-components"
import tw from "tailwind.macro"
import { CircleImage } from "components/Circle"

interface UserAvatarProps {
  user?: User
  avatar?: "picture" | "initials" | "none"
  className?: string
}

const UserAvatarRaw: React.FC<UserAvatarProps> = ({
  user,
  avatar = "initials",
  ...props
}) => {
  return (
    <div className={`${props.className} bg-primary`}>
      {avatar === "picture" && user?.picture && (
        <CircleImage className="h-full" src={user.picture} alt="" />
      )}
      {avatar === "initials" && (
        <div className="text-sm font-bold">{userInitials(user)}</div>
      )}
    </div>
  )
}

const UserAvatar = styled(UserAvatarRaw)`
  ${tw`flex self-start mx-auto items-center justify-center rounded-full`}
  ${tw`m-0 p-0 h-10 w-10 font-bold text-white`}
  min-width: 0;
  overflow: hidden;
  object-fit: cover;
`

export { UserAvatar }
