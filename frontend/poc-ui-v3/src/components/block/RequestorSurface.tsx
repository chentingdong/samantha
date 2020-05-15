import React from "react"
import { gql, useQuery } from "@apollo/client"
import { REQUESTOR_SURFACE } from "../../operations/queries/requestorSurface"

const RequestorSurface = ({ blockId }) => {
  const { loading, error, data } = useQuery(REQUESTOR_SURFACE, {
    variables: { id: blockId },
  })
  if (loading) return <>Loading...</>
  if (error) return <>Error! ${error.message}</>

  return (
    <div>
      RequestorSurface for block ID={data.block.id}, name={data.block.name}
    </div>
  )
}

export { RequestorSurface }
