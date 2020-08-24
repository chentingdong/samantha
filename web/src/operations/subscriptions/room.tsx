import { gql } from "@apollo/client"
import { roomFragment } from "../fragments/room"

export const ROOMS_BY_PK = gql`
  subscription chat_rooms_by_pk($id: String!) {
    chat_rooms_by_pk(id: $id) {
      ...roomFragment
    }
  }
  ${roomFragment}
`
