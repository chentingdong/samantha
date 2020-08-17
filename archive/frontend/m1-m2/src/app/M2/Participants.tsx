import {
  ADD_BELL_PARTICIPATION,
  ADD_GOAL_PARTICIPATION,
  DELETE_BELL_PARTICIPATION,
  DELETE_GOAL_PARTICIPATION,
} from "operations/mutations/userParticipations"
import {
  USER_BELL_GOALS_PARTICIPATIONS,
  USER_BELL_PARTICIPATIONS,
} from "operations/subscriptions/userParticipations"
import { useMutation, useQuery, useSubscription } from "@apollo/client"

import { Bell } from "models/interface"
import { GET_USERS } from "operations/queries/getUsers"
import { Loading } from "components/Misc"
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
  const params = getRouteParams(location.pathname)
  const { data: usersResult, loading: loadingUser } = useQuery(GET_USERS)

  // subscriptions
  const {
    data: dataBellParticipant,
    loading: loadingBellParticipants,
  } = useSubscription(USER_BELL_PARTICIPATIONS, {
    variables: {
      bellId: bell?.id,
      roles: ["bell_initiator", "bell_owner"],
    },
  })
  const {
    data: dataBellFollowers,
    loading: loadingBellFollowers,
  } = useSubscription(USER_BELL_PARTICIPATIONS, {
    variables: {
      bellId: bell.id,
      roles: ["bell_follower"],
    },
  })
  const {
    data: dataGoalParticipant,
    loading: loadingGoalParticipants,
  } = useSubscription(USER_BELL_GOALS_PARTICIPATIONS, {
    variables: {
      goalId: params.goalId,
      roles: ["goal_assignee"],
    },
  })
  const {
    data: dataGoalFollowers,
    loading: loadingGoalFollowers,
  } = useSubscription(USER_BELL_GOALS_PARTICIPATIONS, {
    variables: {
      goalId: params.goalId,
      roles: ["goal_follower"],
    },
  })

  // mutations
  const [insertBellParticipant] = useMutation(ADD_BELL_PARTICIPATION)
  const [deleteBellParticipant] = useMutation(DELETE_BELL_PARTICIPATION)
  const [insertGoalParticipant] = useMutation(ADD_GOAL_PARTICIPATION)
  const [deleteGoalParticipant] = useMutation(DELETE_GOAL_PARTICIPATION)

  if (
    loadingUser ||
    loadingBellParticipants ||
    loadingBellFollowers ||
    loadingGoalParticipants ||
    loadingGoalFollowers
  )
    return <Loading />

  //transform to html display
  const participants =
    params.goalId === "all"
      ? dataBellParticipant?.m2_user_bell_participations
      : dataGoalParticipant?.m2_user_block_participations
  const followers =
    params.goalId === "all"
      ? dataBellFollowers?.m2_user_bell_participations
      : dataGoalFollowers?.m2_user_block_participations
  const poolUsers = usersResult?.m2_users?.filter(
    (user) => participants?.map((p) => p.user.id).indexOf(user.id) === -1
  )

  // event handlers
  const addFollower = (user) => {
    if (params.goalId === "all")
      insertBellParticipant({
        variables: {
          bellId: bell.id,
          userId: user.id,
          role: "bell_follower",
        },
      })
    else
      insertGoalParticipant({
        variables: {
          goalId: params.goalId,
          userId: user.id,
          role: "goal_follower",
        },
      })
  }
  const removeFollower = (user) => {
    if (params.goalId === "all")
      deleteBellParticipant({
        variables: {
          bellId: params.bellId,
          userId: user.id,
          role: "bell_follower",
        },
      })
    else
      deleteGoalParticipant({
        variables: {
          goalId: params.goalId,
          userId: user.id,
          role: "goal_follower",
        },
      })
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
