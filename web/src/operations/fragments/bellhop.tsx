import { gql } from "@apollo/client"

const bellhopFragment = gql`
  fragment bellhopFragment on m2_bellhops {
    id
    name
    metadata
    profile_image_url
    created_at
    updated_at
  }
`

export { bellhopFragment }
