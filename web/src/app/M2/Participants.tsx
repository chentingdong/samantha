import { Error, Loading } from "components/Misc"
import {
  USER_BELL_GOALS_PARTICIPATIONS,
  USER_BELL_PARTICIPATIONS,
} from "operations/subscriptions/userParticipations"
import { useQuery, useSubscription } from "@apollo/client"

import { Bell } from "models/interface"
import { GET_USERS } from "operations/queries/getUsers"
import { ParticipantsPicker } from "./ParticipantsPicker"
import React from "react"
import { UserAvatar } from "components/UserAvatar"
import { getRouteParams } from "utils/router"

interface ParticipantsProps {
  bell: Bell
  className?: string
}

export const Participants: React.FC<ParticipantsProps> = ({
  bell,
  ...props
}) => {
  const params = getRouteParams(location)

  const { data: usersResult, loading: loadingUser } = useQuery(GET_USERS)
  const {
    data: userBellParticipans,
    loading: loadingBellParticipants,
  } = useSubscription(USER_BELL_PARTICIPATIONS, {
    variables: {
      bellId: bell.id,
      roles: ["bell_initiator", "bell_owner"],
    },
  })
  const {
    data: userBellFollowers,
    loading: loadingBellFollowers,
  } = useSubscription(USER_BELL_PARTICIPATIONS, {
    variables: {
      bellId: bell.id,
      roles: ["bell_follower"],
    },
  })
  const {
    data: userGoalParticipans,
    loading: loadingGoalParticipants,
  } = useSubscription(USER_BELL_GOALS_PARTICIPATIONS, {
    variables: {
      goalId: params.goalId,
      roles: ["goal_assignee"],
    },
  })
  const {
    data: userGoalFollowers,
    loading: loadingGoalFollowers,
  } = useSubscription(USER_BELL_GOALS_PARTICIPATIONS, {
    variables: {
      goalId: params.goalId,
      roles: ["goal_follower"],
    },
  })

  if (
    loadingUser ||
    loadingBellParticipants ||
    loadingBellFollowers ||
    loadingGoalParticipants ||
    loadingGoalFollowers
  )
    return <Loading />

  const participants =
    params.goalId === "all"
      ? userBellParticipans?.m2_user_bell_participations
      : userGoalParticipans?.m2_user_block_participations
  const followers =
    params.goalId === "all"
      ? userBellFollowers?.m2_user_bell_participations
      : userGoalFollowers?.m2_user_block_participations
  const poolUsers = usersResult?.m2_users?.filter(
    (user) => participants?.map((p) => p.user.id).indexOf(user.id) === -1
  )

  console.log(followers, usersResult)
  const addFollower = (user) => {
    if (params.goalId === "all") console.log(`add ${user} to bell ${bell.id}`)
    else console.log(`add ${user} to goal ${params.goalId}`)
  }
  const removeFollower = (user) => {
    if (params.goalId === "all")
      console.log(`remove ${JSON.stringify(user, null, 4)} from bell`)
    else console.log(`remove ${JSON.stringify(user, null, 4)} from goal`)
  }

  return (
    <div {...props}>
      <span>Participants</span>
      <div className="flex">
        {participants?.map((participant) => (
          <UserAvatar
            avatar="initials"
            user={participant.user}
            key={participant.user.id}
            className="w-8 h-8 mx-1 my-2"
          />
        ))}
        <ParticipantsPicker
          className="m-1"
          pickedParticipants={followers}
          users={poolUsers}
          onInsertUser={addFollower}
          onDeleteUser={removeFollower}
        />
      </div>
    </div>
  )
}
