import { gql } from "@apollo/client"

export const USER_BELL_PARTICIPATIONS = gql`
  subscription m2_user_bell_participations(
    $bellId: String!
    $roles: [m2_participation_roles_enum!]
  ) {
    m2_user_bell_participations(
      where: { role: { _in: $roles }, bell: { id: { _eq: $bellId } } }
    ) {
      role
      user {
        id
        name
        email
        picture
        given_name
        family_name
      }
    }
  }
`

export const USER_BELL_GOALS_PARTICIPATIONS = gql`
  subscription m2_user_block_participations(
    $goalId: String!
    $roles: [m2_participation_roles_enum!]
  ) {
    m2_user_block_participations(
      where: { block: { id: { _eq: $goalId } }, role: { _in: $roles } }
    ) {
      role
      user {
        id
        name
        email
        picture
        given_name
        family_name
      }
    }
  }
`
