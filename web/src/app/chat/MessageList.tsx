import React, { useEffect, useRef } from "react"

import { Loading } from "components/Misc"
import { MessageItem } from "./MessageItem"
import { ROOM_MESSAGES } from "operations/subscriptions/message"
import { useSubscription } from "@apollo/client"

interface MessageListProps {
  roomId: string
}

export const MessageList: React.FC<MessageListProps> = ({
  roomId,
  ...props
}) => {
  const { data, loading } = useSubscription(ROOM_MESSAGES, {
    variables: { roomId: roomId },
  })

  const messagesEndRef = useRef(null)
  useEffect(() => {
    messagesEndRef?.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    })
  })

  if (loading) return <Loading />
  const messages = data.chat_messages

  return (
    <div ref={messagesEndRef} {...props}>
      {messages?.map((message) => (
        <MessageItem className="my-4" key={message.id} message={message} />
      ))}
    </div>
  )
}
