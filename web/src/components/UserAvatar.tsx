import React from "react"
import { User } from "models/interface"
import { userInitials } from "utils/user"
import styled from "styled-components"
import tw from "tailwind.macro"
import { CircleImage } from "components/Circle"

interface UserAvatarProps {
  user: User
  className?: string
}

const UserAvatarRaw: React.FC<UserAvatarProps> = ({ user, ...props }) => {
  return (
    <div {...props}>
      {user?.picture && (
        <CircleImage className="h-full" src={user.picture} alt="" />
      )}
      {!user?.picture && (
        <div className="text-sm font-bold">{userInitials(user)}</div>
      )}
    </div>
  )
}

const UserAvatar = styled(UserAvatarRaw)`
  ${tw`flex self-start mx-auto items-center justify-center text-white`}
  ${tw`m-0 p-0 h-10 w-10 bg-purple-800`}
  border-radius: 50%;
  min-width: 0;
  overflow: hidden;
  object-fit: cover;
`

export { UserAvatar }
