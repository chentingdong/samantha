// Participants.tsx
// Participants of a goal
import React from "react"
import { GET_USERS } from "operations/queries/getUsers"
import { useQuery } from "@apollo/client"
import { UserAvatar } from "components/UserAvatar"
import { Loader } from "rsuite"
import { Error } from "components/Misc"

interface ParticipantsProps {
  className?: string
}

export const Participants: React.FC<ParticipantsProps> = ({
  className,
  ...props
}) => {
  const { data, loading, error } = useQuery(GET_USERS)
  const users = data?.users

  return (
    <div className={className}>
      <h4>Participants</h4>
      {loading && <Loader speed="fast" content="Loading..." />}
      {error && <Error message={error.message} />}
      <div className="flex">
        {users?.map((user) => (
          <UserAvatar user={user} key={user.id} className="w-8 h-8 m-2" />
        ))}
      </div>
    </div>
  )
}
