import { gql } from "@apollo/client"

export const UPSERT_ONE_USER = gql`
  mutation upsertOneUser(
    $where: UserWhereUniqueInput!
    $create: UserCreateInput!
    $update: UserUpdateInput!
  ) {
    upsertOneUser(where: $where, create: $create, update: $update) {
      id
      name
      email
    }
  }
`
