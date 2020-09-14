import {
  Bell,
  BellExecutor,
  BellhopBellParticipation,
  Block,
  Goal,
  Task,
  UserBellParticipation,
  UserBlockParticipation,
} from "../types"

import apolloClient from "../graphql/apolloClient"
import { gql } from "@apollo/client"

export const getBellByPk = async function (id: string): Promise<Bell> {
  const { data, errors } = await apolloClient.query({
    query: gql`
      query get_bell_by_pk($id: String!) {
        bell: m2_bells_by_pk(id: $id) {
          id
          name
          description
          root_block_id
          acts_as_main_bell
          sub_bells {
            id
          }
          user_participations {
            user_id
            role
          }
          bellhop_participations {
            bellhop_id
            role
          }
          blocks {
            id
            local_id
            type
            bell_executor {
              bell_id
            }
          }
        }
      }
    `,
    variables: { id },
  })
  if (errors) return undefined
  return data.bell
}

export const getBlockByPk = async function (id: string): Promise<Block> {
  const { data, errors } = await apolloClient.query({
    query: gql`
      query get_block_by_pk($id: String!) {
        block: m2_blocks_by_pk(id: $id) {
          id
          name
          local_id
          type
          configs
          sibling_order
          user_participations {
            user_id
            role
          }
          goal {
            id
            goal_name
            success_conditions
          }
          task {
            id
            title
            fields
          }
          bell_executor {
            id
            bell_id
            block {
              local_id
            }
          }
          children {
            id
          }
        }
      }
    `,
    variables: { id },
  })
  if (errors) return undefined
  return data.block
}

export const insertBlock = async ({ data }: { data: object }) => {
  const { data: returnData, errors } = await apolloClient.mutate({
    mutation: gql`
      mutation insert_block($object: m2_blocks_insert_input!) {
        block: insert_m2_blocks_one(object: $object) {
          id
        }
      }
    `,
    variables: { object: data },
  })
  if (errors) return
  return returnData.block
}

export const insertTask = async ({ data }: { data: object }) => {
  const { data: returnData, errors } = await apolloClient.mutate({
    mutation: gql`
      mutation insert_task($object: m2_tasks_insert_input!) {
        task: insert_m2_tasks_one(object: $object) {
          id
        }
      }
    `,
    variables: { object: data },
  })
  if (errors) return
  return returnData.task
}

export const insertGoal = async ({ data }: { data: object }) => {
  const { data: returnData, errors } = await apolloClient.mutate({
    mutation: gql`
      mutation insert_goal($object: m2_goals_insert_input!) {
        goal: insert_m2_goals_one(object: $object) {
          id
        }
      }
    `,
    variables: { object: data },
  })
  if (errors) return
  return returnData.goal
}

export const insertBellExecutor = async ({ data }: { data: object }) => {
  const { data: returnData, errors } = await apolloClient.mutate({
    mutation: gql`
      mutation insert_bell_executor($object: m2_bell_executors_insert_input!) {
        bell_executor: insert_m2_bell_executors_one(object: $object) {
          id
        }
      }
    `,
    variables: { object: data },
  })
  if (errors) return
  return returnData.bell_executor
}

export const insertBell = async ({ data }: { data: object }) => {
  const { data: returnData, errors } = await apolloClient.mutate({
    mutation: gql`
      mutation insert_bell($object: m2_bells_insert_input!) {
        bell: insert_m2_bells_one(object: $object) {
          id
        }
      }
    `,
    variables: { object: data },
  })
  if (errors) return
  return returnData.bell
}

export const insertUserBlockParticipation = async ({
  data,
}: {
  data: object
}) => {
  const { data: returnData, errors } = await apolloClient.mutate({
    mutation: gql`
      mutation insert_user_block_participation(
        $object: m2_user_block_participations_insert_input!
      ) {
        user_block_particiaption: insert_m2_user_block_participations_one(
          object: $object
        ) {
          id
        }
      }
    `,
    variables: { object: data },
  })
  if (errors) return
  return returnData.user_block_participation
}

export const insertUserBellParticipation = async ({
  data,
}: {
  data: object
}) => {
  const { data: returnData, errors } = await apolloClient.mutate({
    mutation: gql`
      mutation insert_user_bell_participation(
        $object: m2_user_bell_participations_insert_input!
      ) {
        user_bell_particiaption: insert_m2_user_bell_participations_one(
          object: $object
        ) {
          id
        }
      }
    `,
    variables: { object: data },
  })
  if (errors) return
  return returnData.user_bell_participation
}

export const insertBellhopBellParticipation = async ({
  data,
}: {
  data: object
}) => {
  const { data: returnData, errors } = await apolloClient.mutate({
    mutation: gql`
      mutation insert_bellhop_bell_participation(
        $object: m2_bellhop_bell_participations_insert_input!
      ) {
        bellhop_bell_particiaption: insert_m2_bellhop_bell_participations_one(
          object: $object
        ) {
          id
        }
      }
    `,
    variables: { object: data },
  })
  if (errors) return
  return returnData.bellhop_bell_participation
}

export const updateBellById = async ({
  data,
  id,
}: {
  data: object
  id: string
}) => {
  const { data: returnData, errors } = await apolloClient.mutate({
    mutation: gql`
      mutation update_bell_by_id($data: m2_bells_set_input, $id: String!) {
        bell: update_m2_bells_by_pk(pk_columns: { id: $id }, _set: $data) {
          id
        }
      }
    `,
    variables: { data, id },
  })
  if (errors) return
  return returnData.bell
}

export const updateBellExecutorByPk = async ({
  data,
  id,
}: {
  data: object
  id: string
}) => {
  const { data: returnData, errors } = await apolloClient.mutate({
    mutation: gql`
      mutation update_bell_executor_by_pk(
        $data: m2_bell_executors_set_input
        $id: String!
      ) {
        bell_executor: update_m2_bell_executors_by_pk(
          pk_columns: { id: $id }
          _set: $data
        ) {
          id
        }
      }
    `,
    variables: { data, id },
  })
  if (errors) return
  return returnData.bell_executor
}

export const insertIntegration = async ({ data }: { data: object }) => {
  const { data: returnData, errors } = await apolloClient.mutate({
    mutation: gql`
      mutation insert_m2_integration($data: [m2_integration_insert_input!]!) {
        integration: insert_m2_integration(
          pk_colums: {id: $data.id}
          _set: $data
        ) {
          id,
          data
        }
      }
    `,
    variables: { data },
  })
  if (errors) return
  return returnData.integration
}
