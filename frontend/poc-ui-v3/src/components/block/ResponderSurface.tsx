import React from "react"
import { gql, useQuery } from "@apollo/client"
import { RESPONDER_SURFACE } from "../../operations/queries/responderSurface"

export const ResponderSurface = ({ blockId }) => {
  const { loading, error, data } = useQuery(RESPONDER_SURFACE, {
    variables: { id: blockId },
  })

  if (loading) return "Loading..."
  if (error) return `Error! ${error.message}`

  return (
    <div>
      ResponderSurface for block ID={data.block.id}, name={data.block.name}
    </div>
  )
}
