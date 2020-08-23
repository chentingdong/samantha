import React, { useEffect, useRef } from "react"
import { useMutation, useQuery } from "@apollo/client"

import { AUTH_USER } from "operations/queries/authUser"
import { BOOK_A_ROOM } from "operations/mutations/room"
import { Bell } from "models/interface"
import { Loading } from "components/Misc"
import { Placeholder } from "rsuite"
import { getRouteParams } from "utils/router"
import styled from "styled-components"
import tw from "tailwind.macro"
import { useLocation } from "react-router-dom"

interface ChatProps {
  bell: Bell
  className?: string
}

const ChatRaw: React.FC<ChatProps> = ({ bell, ...props }) => {
  const { data: authUserResult, loading: loadingUser } = useQuery(AUTH_USER)
  const messagesEndRef = useRef(null)
  const location = useLocation()
  const [bookARoom] = useMutation(BOOK_A_ROOM)
  const params = getRouteParams(location.pathname)

  useEffect(() => {
    messagesEndRef.current.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    })
  })

  const source = params?.goalId === "all" ? "bell" : "goal"

  if (source === "bell") {
    const user_room_participants = bell.user_participations.map(
      (participant) => ({
        user_id: participant.user.id,
        role: participant.role,
        joined_at: new Date(),
      })
    )

    bookARoom({
      variables: {
        source: "bell",
        sourceId: bell.id,
        roomName: bell.name,
        user_room_participations: user_room_participants,
      },
    })
  } else if (source === "goal") {
    const goal = bell.blocks.filter((b) => b.id === params.goalId)?.[0]
    const user_room_participants = goal.user_participations.map(
      (participant) => ({
        user_id: participant.user.id,
        role: participant.role,
        joined_at: new Date(),
      })
    )

    bookARoom({
      variables: {
        source: "goal",
        sourceId: params.goalId,
        roomName: goal.name,
        user_room_participations: user_room_participants,
      },
    })
  }

  if (loadingUser) return <Loading />

  const placeholders = Array.from(Array(5).keys())

  return (
    <div {...props}>
      <div
        ref={messagesEndRef}
        className="flex flex-col justify-end min-h-full"
      >
        {placeholders.map((placeholder) => {
          return (
            <Placeholder.Paragraph key={placeholder} graph="circle" rows={2} />
          )
        })}
        <div className="mt-4">
          <input type="text" className="w-full" placeholder="type here..." />
        </div>
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
