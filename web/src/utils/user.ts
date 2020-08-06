import { Participant, User } from "models/interface"

const displayParticipants = (participants: any[]) => {
  return participants?.map((participant) => participant.user.name).join(", ")
}

const userInitials = (user: User): string => {
  let initials = "N/A"
  if (user?.given_name && user?.family_name)
    initials =
      user.given_name.substring(0, 1) + user.family_name.substring(0, 1)
  else if (user?.given_name) initials = user.given_name.substring(0, 2)
  else if (user?.family_name) initials = user.family_name.substring(0, 2)
  return initials.toUpperCase()
}

const iPlayRoles = (
  authUser: User,
  participants: Participant[],
  roles: string[]
): boolean => {
  if (!participants) return false
  const userIds = participants
    .filter((participant) => roles.indexOf(participant.role) > -1)
    .map((participant) => participant.user.id)

  return userIds.indexOf(authUser.id) > -1
}

export { displayParticipants, userInitials, iPlayRoles }
