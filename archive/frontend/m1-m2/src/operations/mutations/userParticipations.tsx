import { gql } from "@apollo/client"

export const ADD_BELL_PARTICIPATION = gql`
  mutation insert_m2_user_bell_participants_one(
    $bellId: String!
    $userId: String!
    $role: m2_participation_roles_enum!
  ) {
    insert_m2_user_bell_participations_one(
      object: { bell_id: $bellId, user_id: $userId, role: $role }
    ) {
      id
      user_id
      bell_id
      role
    }
  }
`

export const DELETE_BELL_PARTICIPATION = gql`
  mutation delete_m2_user_bell_participations(
    $bellId: String!
    $userId: String!
    $role: m2_participation_roles_enum!
  ) {
    delete_m2_user_bell_participations(
      where: {
        bell_id: { _eq: $bellId }
        user_id: { _eq: $userId }
        role: { _eq: $role }
      }
    ) {
      returning {
        id
        bell_id
        user_id
        role
      }
    }
  }
`

export const ADD_GOAL_PARTICIPATION = gql`
  mutation insert_m2_user_goal_participants_one(
    $goalId: String!
    $userId: String!
    $role: m2_participation_roles_enum!
  ) {
    insert_m2_user_block_participations_one(
      object: { block_id: $goalId, user_id: $userId, role: $role }
    ) {
      id
      user_id
      block_id
      role
    }
  }
`

export const DELETE_GOAL_PARTICIPATION = gql`
  mutation delete_m2_user_goal_participations(
    $goalId: String!
    $userId: String!
    $role: m2_participation_roles_enum!
  ) {
    delete_m2_user_block_participations(
      where: {
        block_id: { _eq: $goalId }
        user_id: { _eq: $userId }
        role: { _eq: $role }
      }
    ) {
      returning {
        id
        block_id
        user_id
        role
      }
    }
  }
`
