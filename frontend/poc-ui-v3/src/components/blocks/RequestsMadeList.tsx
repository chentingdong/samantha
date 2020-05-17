import React, { useContext } from "react"
import { useQuery } from "@apollo/client"
import { REQUESTS_MADE } from "../../operations/queries/requestsMade"
import { Context } from "../context/store"
import { RequestItem } from "../block/RequestItem"

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
          <div className="m-3">
            <RequestItem key={block.id} block={block}>
              <p className="text-secondary text-right">
                {"Assigned to: "}
                {block.responders?.map((user) => user.name).join(", ")}
              </p>
            </RequestItem>
          </div>
        ))}
    </div>
  )
}

export { RequestsMadeList }
