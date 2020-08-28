import { AUTH_USER } from "operations/queries/authUser"
import { Loading } from "components/Misc"
import { Message } from "models/interface"
import React from "react"
import ReactHtmlParser from "react-html-parser"
import { UserAvatar } from "components/UserAvatar"
import { displayDate } from "utils/common"
import styled from "styled-components"
import tw from "tailwind.macro"
import { useQuery } from "@apollo/client"

interface MessageItemProps {
  message: Message
  className?: string
}

const MessageItemRaw: React.FC<MessageItemProps> = ({
  message,
  className,
  ...props
}) => {
  const { data, loading } = useQuery(AUTH_USER)
  if (loading) return <Loading />
  const messageClass = data.authUser === message.from_user_id ? "me" : "them"
  const content = ReactHtmlParser(message.content)
  return (
    <div {...props} className={`${className} flex`}>
      <UserAvatar
        user={message.user}
        className={`${messageClass} h-6 w-6 mr-4 flex-none`}
        avatar="picture"
      />
      <div className="flex-grow">
        <div className="text-sm">
          <span className="mr-4 font-bold">{message.user.name}</span>
          <span className="italic text-gray-500">
            {displayDate(message.created_at, "short")}
          </span>
        </div>
        <div className="my-2 text-gray-700">{content}</div>
      </div>
    </div>
  )
}

const MessageItem = styled(MessageItemRaw)`
  li {
    list-style-position: inside;
  }
  ol li {
    list-style-type: decimal;
  }
  ul li {
    list-style-type: circle;
  }
  pre.ql-syntax {
    ${tw`bg-gray-300 p-4 text-xs w-full`}
    line-height: 1rem;
    font-family: "Varela", "serif";
  }
  img {
    max-height: 200px;
    width: auto;
  }
`

export { MessageItem }
