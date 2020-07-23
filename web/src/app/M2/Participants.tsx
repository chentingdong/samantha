// Participants.tsx
// Participants of a goal
import React from "react"
import { GET_USERS } from "../../operations/queries/getUsers"
import { useQuery } from "@apollo/client"
import { UserAvatar } from "components/UserAvatar"

interface ParticipantsProps {
  className?: string
}

export const Participants: React.FC<ParticipantsProps> = ({
  className,
  ...props
}) => {
  const { data, loading } = useQuery(GET_USERS)
  const users = data?.users

  return (
    <div className={className}>
      <h4>Participants</h4>
      <div className="flex">
        {users?.map((user) => (
          <UserAvatar user={user} key={user.id} className="w-8 h-8 m-2" />
        ))}
      </div>
    </div>
  )
}
