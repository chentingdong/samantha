import { gql } from "@apollo/client"

export const UPDATE_TASK_DETAIL = gql`
  mutation update_task_detail($id: String!, $fields: jsonb) {
    update_m2_tasks_by_pk(pk_columns: { id: $id }, _set: { fields: $fields }) {
      id
      fields
    }
  }
`
