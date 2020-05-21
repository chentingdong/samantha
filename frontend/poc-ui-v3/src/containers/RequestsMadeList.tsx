import React, { useContext } from "react"
import { useQuery } from "@apollo/client"
import { REQUESTS_MADE } from "../operations/queries/requestsMade"
import { Context } from "../context/store"
import { RequestItem } from "../components/RequestItem"
import { ItemOrigin } from "../models/enum"
import { useMutation } from "@apollo/client"
import { CREATE_ONE_BLOCK } from "../operations/mutations/createOneBlock"
import { UPDATE_ONE_BLOCK } from "../operations/mutations/updateOneBlock"
import { COMPLETE_ONE_BLOCK } from "../operations/mutations/completeOneBlock"
import { Loading, Error } from "../components/Misc"

const RequestsMadeList = () => {
  const { state, dispatch } = useContext(Context)
  const [createOneBlock] = useMutation(CREATE_ONE_BLOCK)
  const [updateOneBlock] = useMutation(UPDATE_ONE_BLOCK)
  const [completeOneBlock] = useMutation(COMPLETE_ONE_BLOCK)
  const { loading, error, data } = useQuery(REQUESTS_MADE, {
    variables: { userId: state.user.id },
  })

  if (loading) return <Loading />
  if (error) return <Error message={error.message} />

  return (
    <>
      {data.blocks?.map((block) => (
        <RequestItem
          block={block}
          key={block.id}
          itemOrigin={ItemOrigin.Made}
          actions={{ createOneBlock, updateOneBlock, completeOneBlock }}
        />
      ))}
    </>
  )
}

export { RequestsMadeList }
