import * as React from "react"

import { AUTH_USER } from "operations/queries/authUser"
import { Loading } from "components/Misc"
import { Message } from "models/interface"
import { UserAvatar } from "components/UserAvatar"
import { displayDate } from "utils/common"
import { useQuery } from "@apollo/client"

interface MessageItemProps {
  message: Message
  className?: string
}

export const MessageItem: React.FC<MessageItemProps> = ({
  message,
  className,
  ...props
}) => {
  const { data: authUserResult, loading: loadingMe } = useQuery(AUTH_USER)
  if (loadingMe) return <Loading />
  const messageClass =
    authUserResult.authUser === message.from_user_id ? "me" : "them"

  return (
    <div {...props} className={`${className} flex`}>
      <UserAvatar
        user={message.user}
        className={`${messageClass} h-6 w-6 mr-4`}
        avatar="picture"
      />
      <div>
        <div className="text-sm">
          <span className="mr-4 font-bold">{message.user.name}</span>
          <span className="text-gray-500 italic">
            {displayDate(message.created_at, "short")}
          </span>
        </div>
        <div className="text-gray-700 my-2">{message.content}</div>
      </div>
    </div>
  )
}
