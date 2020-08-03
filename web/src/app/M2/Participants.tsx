// Participants.tsx
// Participants of a goal
import React from "react"
import { GET_USERS } from "operations/queries/getUsers"
import { useQuery } from "@apollo/client"
import { UserAvatar } from "components/UserAvatar"
import { Loading, Error } from "components/Misc"
import { ParticipantsPicker } from "./ParticipantsPicker"
import { Bell } from "models/interface"

interface ParticipantsProps {
  bell: Bell
  className?: string
}

export const Participants: React.FC<ParticipantsProps> = ({
  bell,
  ...props
}) => {
  const { data, loading, error } = useQuery(GET_USERS)
  const users = data?.users
  if (loading)
    return <Loading speed="fast" content="Loading..." className="text-center" />
  if (error) return <Error message={error.message} />

  // load from bell
  const participants = data?.users?.slice(0, 2)
  const addFollower = (user) => {
    console.log(`add ${user} to bell`)
  }
  const removeFollower = (user) => {
    console.log(`remove ${user} from bell`)
  }

  return (
    <div {...props}>
      <span>Participants</span>
      <div className="flex">
        {users?.map((user) => (
          <UserAvatar user={user} key={user.id} className="w-8 h-8 m-2" />
        ))}
      </div>
      <span>Followers</span>
      <ParticipantsPicker
        participants={participants}
        users={users}
        onInsertTag={addFollower}
        onDeleteTag={removeFollower}
      />
    </div>
  )
}
