import { gql } from "@apollo/client"
export const DELETE_ONE_BELL = gql`
  mutation delete_bells_by_pk($id: String!) {
    delete_bells_by_pk(id: $id) {
      id
    }
  }
`
