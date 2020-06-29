import { gql } from "@apollo/client"

const bellFragment = gql`
  fragment bellFragment on bells {
    id
    name
    description
    state
    context
    created_at
    last_updated
    block_id
  }
`
export { bellFragment }
