// Participants.tsx
// Participants of a goal
import React from "react"
import {UserAvatar} from "components/UserAvatar"
import {ParticipantsPicker} from "./ParticipantsPicker"
import {Bell} from "models/interface"
import {Loading, Error} from "components/Misc"
import {useQuery} from "@apollo/client"
import {GET_USERS} from "operations/queries/getUsers"
import {getRouteParams} from "utils/router"

interface ParticipantsProps {
  bell: Bell
  className?: string
}

export const Participants: React.FC<ParticipantsProps> = ({
  bell,
  ...props
}) => {
  const params = getRouteParams(location)

  const {data, loading, error} = useQuery(GET_USERS)

  if (loading)
    return <Loading speed="fast" content="Loading..." className="text-center" />
  if (error) return <Error message={error.message} />

  // Add participants in ordered roles, skip if exists in previous role.
  const getUserParticipations = (roles: string[]) => {
    let goals = bell?.blocks.filter((block) => block.type === "Goal")
    if (params.goalId !== "all")
      goals = goals.filter(
        (goal) => goal.id === params.goalId || goal.parent?.id === params.goalId
      )

    const ups = []
    const userIds = []

    goals?.forEach((goal) => {
      goal.user_participations.forEach((participant) => {
        const userParticipated = userIds.indexOf(participant.user.id) > -1
        const isRole = roles.indexOf(participant.role) > -1
        if (!userParticipated && isRole) {
          userIds.push(participant.user.id)
          ups.push(participant.user)
        }
      })
    })

    return ups
  }

  const participants = getUserParticipations([
    "bell_initiator",
    "bell_owner",
    "goal_assignee",
    "task_assignee",
    "task_requestor",
  ])
  const followers = getUserParticipations(["bell_follower", "goal_follower"])
  const poolUsers = data?.users.filter(
    (user) => participants.map((p) => p.id).indexOf(user.id) === -1
  )

  const addFollower = (user) => {
    console.log(`add ${user} to goal`)
  }
  const removeFollower = (user) => {
    console.log(`remove ${JSON.stringify(user, null, 4)} from goal`)
  }

  return (
    <div {...props}>
      <span>Participants</span>
      <div className="flex">
        {participants?.map((participant, index) => (
          <UserAvatar
            avatar="initials"
            user={participant}
            key={participant.id + index}
            className="w-8 h-8 mx-1 my-2"
          />
        ))}
        <ParticipantsPicker
          className="m-1"
          pickedUsers={followers}
          users={poolUsers}
          onInsertUser={addFollower}
          onDeleteUser={removeFollower}
        />
      </div>
    </div>
  )
}
