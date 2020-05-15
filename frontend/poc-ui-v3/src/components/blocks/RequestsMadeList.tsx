import React, { useContext } from "react"
import { RequestsMadeItem } from "../block/RequestsMadeItem"
import { useQuery } from "@apollo/client"
import { REQUESTS_MADE } from "../../operations/queries/requestsMade"
import { Context } from "../context/store"

const RequestsMadeList = () => {
  const { state, dispatch } = useContext(Context)

  const { loading, error, data } = useQuery(REQUESTS_MADE, {
    variables: { userId: state.user.id },
  })
  const requestsMade = data ? data.blocks : []

  if (loading) return <>Loading...</>
  if (error) return <>Error! ${error.message}</>

  return (
    <div>
      {requestsMade &&
        requestsMade.map((block) => (
          <RequestsMadeItem key={block.id} block={block} />
        ))}
    </div>
  )
}

export { RequestsMadeList }
