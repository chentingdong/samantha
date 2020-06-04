import React from "react"
import { useQuery } from "@apollo/client"
import { REQUESTS_MADE } from "../operations/queries/requestsMade"
import { RequestItem } from "./RequestItem"
import { ItemOrigin, Typename, EditMode } from "../models/enum"
import { Loading, Error } from "./Misc"
import { AUTH_USER } from "../operations/queries/authUser"
import { CatalogDropdown } from "./CatalogDropdown"
import { Divider, Loader } from "rsuite"

const RequestsMadeList = () => {
  const { data: authUserResult } = useQuery(AUTH_USER)
  const { loading, error, data } = useQuery(REQUESTS_MADE, {
    variables: { userId: authUserResult?.authUser?.id },
    fetchPolicy: "network-only",
    pollInterval: 1000,
  })

  if (loading) return <Loader speed="fast" content="Loading..." />
  if (error) return <Error message={error.message} />

  return (
    <>
      <CatalogDropdown
        title="Add a Bell from..."
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
        />
      ))}
    </>
  )
}

export { RequestsMadeList }
