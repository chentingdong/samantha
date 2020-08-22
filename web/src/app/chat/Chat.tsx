import React, { useEffect, useRef } from "react"
import { useMutation, useQuery } from "@apollo/client"

import { AUTH_USER } from "operations/queries/authUser"
import { BOOK_A_BELL_ROOM } from "operations/mutations/room"
import { Bell } from "models/interface"
import { Loading } from "components/Misc"
import { Placeholder } from "rsuite"
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
  const { data: authUserResult, loading: loadingUser } = useQuery(AUTH_USER)
  const messagesEndRef = useRef(null)
  const location = useLocation()
  const [bookABellRoom] = useMutation(BOOK_A_BELL_ROOM)
  const params = getRouteParams(location.pathname)
  const authUser = authUserResult.authUser

  useEffect(() => {
    messagesEndRef.current.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    })
  })

  useEffect(() => {
    const roomSource = params?.goalId === "all" ? "bell" : "block"

    if (roomSource === "bell") {
      const user_room_participants = bell.user_participations.map((p) => ({
        user_id: p.user.id,
        role: p.role,
        joined_at: new Date(),
      }))

      bookABellRoom({
        variables: {
          bellId: bell.id,
          roomId: bell.id,
          roomName: bell.name,
          user_room_participations: user_room_participants,
        },
      })
    }

    // const room_bookings = [
    //   {
    //     name: `${bell.name} conversations`,
    //     room_id: room_id,
    //     source: room_source,
    //     source_id: source_id,
    //   },
    // ]
    // const participants =
    //   params?.goalId === "all"
    //     ? bell.user_participations
    //     : bell.blocks.filter((block) => block.id === params.goalId)?.[0]
    //         .user_participations
    // const user_room_participations = participants.map((participant) => {
    //   return {
    //     id: participant.user.id,
    //     last_seen_at: now,
    //     user: participant.user,
    //   }
    // })

    // const room = {
    //   id: room_id,
    //   type: "chat",
    //   created_at: now,
    //   room_bookings: room_bookings,
    //   user_room_participations: user_room_participations,
    // }
    // console.log(room)
  }, [])

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
