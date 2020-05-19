import React, { useContext } from "react"
import { useQuery } from "@apollo/client"
import { REQUESTS_MADE } from "../operations/queries/requestsMade"
import { Context } from "../context/store"
import { RequestItem } from "../components/RequestItem"
import { ItemOrigin } from "../models/enum"

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
          <div className="m-3" key={block.id}>
            <RequestItem block={block} itemOrigin={ItemOrigin.Made} />
          </div>
        ))}
    </div>
  )
}

export { RequestsMadeList }
