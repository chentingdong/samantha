import { gql } from "@apollo/client"
const taskDetailFragment = gql`
  fragment taskDetailFragment on m2_tasks {
    id
    fields
  }
`

export { taskDetailFragment }
