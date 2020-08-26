import React, { useEffect, useRef, useState } from "react"
import { useMutation, useQuery, useSubscription } from "@apollo/client"

import { AUTH_USER } from "operations/queries/authUser"
import { BOOK_A_ROOM } from "operations/mutations/room"
import { Bell } from "models/interface"
import { Loading } from "components/Misc"
import { MessageEditor } from "./MessageEditor"
import { MessageList } from "./MessageList"
import { ROOMS_BY_PK } from "operations/subscriptions/room"
import { SEND_A_MESSAGE } from "operations/mutations/message"
import { getRouteParams } from "utils/router"
import { nanoid } from "nanoid"
import styled from "styled-components"
import tw from "tailwind.macro"
import { useLocation } from "react-router-dom"

interface ChatProps {
  bell: Bell
  className?: string
}

const ChatRaw: React.FC<ChatProps> = ({ bell, ...props }) => {
  const location = useLocation()
  const params = getRouteParams(location.pathname)

  const { data: authUserResult, loading: loadingMe } = useQuery(AUTH_USER)

  const source = params?.goalId === "all" ? "bell" : "goal"
  const roomId = source === "bell" ? params.bellId : params.goalId
  const { data: dataRooms, loading: loadingRoom } = useSubscription(
    ROOMS_BY_PK,
    {
      variables: { id: roomId },
    }
  )
  const [bookARoom] = useMutation(BOOK_A_ROOM)
  const [sendAMessage] = useMutation(SEND_A_MESSAGE)

  if (loadingMe || loadingRoom) return <Loading />

  const room = dataRooms?.chat_rooms_by_pk
  const authUser = authUserResult.authUser

  const roomBooking = async () => {
    const now = new Date()
    const sourceObject =
      source === "bell"
        ? bell
        : bell.blocks.filter((b) => b.id === params.goalId)?.[0]
    const user_room_participations = sourceObject.user_participations.map(
      (participant) => ({
        user_id: participant.user.id,
        role: participant.role,
        joined_at: now,
        last_seen_at: now,
      })
    )

    await bookARoom({
      variables: {
        source: source,
        sourceId: sourceObject.id,
        roomName: sourceObject.name,
        user_room_participations: user_room_participations,
      },
    })
  }

  if (!room) roomBooking()

  const sendMessage = async (content) => {
    await sendAMessage({
      variables: {
        object: {
          id: nanoid(),
          room_id: room.id,
          content: content,
          from_user_id: authUser.id,
        },
      },
    })
  }

  return (
    <div {...props}>
      <div className="flex flex-col justify-end min-h-full">
        {roomId && <MessageList roomId={roomId} />}
        <form className="border" onSubmit={(e) => sendMessage(e)}>
          <MessageEditor onSave={sendMessage} />
        </form>
      </div>
    </div>
  )
}

const Chat = styled(ChatRaw)`
  .rs-placeholder-paragraph {
    margin-top: 20px;
    p {
      margin-top: 5px !important;
      ${tw`bg-gray-500`}
    }
    .rs-placeholder-paragraph-graph {
      height: 30px;
      width: 30px;
      ${tw`bg-gray-500`}
    }
  }
`
export { Chat }
