import React from "react"
import { useQuery } from "@apollo/client"
import { REQUESTS_MADE } from "../operations/queries/requestsMade"
import { RequestItem } from "./RequestItem"
import { ItemOrigin, Typename, EditMode } from "../models/enum"
import { useMutation } from "@apollo/client"
import { CREATE_ONE_BLOCK } from "../operations/mutations/createOneBlock"
import { UPDATE_ONE_BLOCK } from "../operations/mutations/updateOneBlock"
import { COMPLETE_ONE_BLOCK } from "../operations/mutations/completeOneBlock"
import { Loading, Error } from "./Misc"
import { AUTH_USER } from "../operations/queries/authUser"
import { CatalogDropdown } from "./CatalogDropdown"
import { Divider } from "rsuite"

const RequestsMadeList = () => {
  const { data: authUserResult } = useQuery(AUTH_USER)
  const [createOneBlock] = useMutation(CREATE_ONE_BLOCK)
  const [updateOneBlock] = useMutation(UPDATE_ONE_BLOCK)
  const [completeOneBlock] = useMutation(COMPLETE_ONE_BLOCK)
  const { loading, error, data } = useQuery(REQUESTS_MADE, {
    variables: { userId: authUserResult?.authUser?.id },
    fetchPolicy: "network-only",
  })

  if (loading) return <Loading />
  if (error) return <Error message={error.message} />

  return (
    <>
      <CatalogDropdown
        title="Add a Request from"
        trigger={["click", "hover"]}
        noCaret
        placement="rightStart"
        editingTypename={Typename.Block}
        editorMode={EditMode.Create}
      />
      <Divider />
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
