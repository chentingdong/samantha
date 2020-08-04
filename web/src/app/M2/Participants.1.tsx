// Participants.tsx
// Participants of a goal
import React from "react"
import { UserAvatar } from "components/UserAvatar"
import { ParticipantsPicker } from "./ParticipantsPicker"
import { Bell } from "models/interface"
import { Loading, Error } from "components/Misc"
import { useQuery } from "@apollo/client"
import { GET_USERS } from "operations/queries/getUsers"
import { getBellLocationParams } from "utils/bell"

interface ParticipantsProps {
  bell: Bell
  className?: string
}

export const Participants: React.FC<ParticipantsProps> = ({
  bell,
  ...props
}) => {
  const params = getBellLocationParams(location)

  const { data, loading, error } = useQuery(GET_USERS)
  const poolUsers = data?.users

  if (loading)
    return <Loading speed="fast" content="Loading..." className="text-center" />
  if (error) return <Error message={error.message} />

  const getUserParticipations = (roles: string[]) => {
    let ups = []

    if (params.goalId === "all" || params.goalId === "") {
      bell.blocks.forEach((block) => {
        ups = ups.concat(block.user_participations)
      })
    } else {
      bell.blocks.forEach((block) => {
        if (block.parent_id === params.goalId) {
          ups = ups.concat(block.user_participations)
        }
      })
    }

    const userParticipations = ups?.filter(
      (user_participant) => roles.indexOf(user_participant.role) > -1
    )
    return userParticipations
  }

  const owners = getUserParticipations(["bell_initiator", "bell_owner"])
  const participants = getUserParticipations([
    "goal_assignee",
    "task_assignee",
    "task_requestor",
  ])
  const followers = getUserParticipations(["bell_follower", "goal_follower"])

  console.log(owners, participants, followers)

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
        {participants?.map((participant, index) => (
          <UserAvatar
            avatar="initials"
            user={participant}
            key={participant.user.id + index}
            className="w-8 h-8 m-2"
          />
        ))}
        <ParticipantsPicker
          participants={followers}
          users={poolUsers}
          onInsertTag={addFollower}
          onDeleteTag={removeFollower}
        />
      </div>
    </div>
  )
}
