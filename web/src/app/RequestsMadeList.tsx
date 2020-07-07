import React from "react"
import { useQuery, useSubscription } from "@apollo/client"
import { REQUESTS_MADE } from "../operations/subscriptions/requestsMade"
import { RequestItem } from "./RequestItem"
import { BlockDef } from "../models/interface"
import { ItemOrigin, Typename } from "../models/enum"
import { Error } from "../components/Misc"
import { AUTH_USER } from "../operations/queries/authUser"
import { CatalogDropdown } from "./CatalogDropdown"
import { Divider, Loader } from "rsuite"

const RequestsMadeList = ({ className = "" }) => {
  const { data: authUserResult } = useQuery(AUTH_USER)
  const { loading, error, data } = useSubscription(REQUESTS_MADE, {
    variables: { userId: authUserResult?.authUser?.id },
  })

  if (loading) return <Loader speed="fast" content="Loading..." />
  if (error) return <Error message={error.message} />

  if (!data || !authUserResult) return <></>

  return (
    <div className={`requests-made-list ${className}`}>
      <CatalogDropdown
        title="Add a Bell from..."
        trigger={["click", "hover"]}
        noCaret
        placement="rightStart"
        editingTypename={Typename.blocks}
      />
      <Divider />
      {data.blocks.map((block: BlockDef, index: number) => (
        <RequestItem
          block={block}
          key={block.id}
          itemOrigin={ItemOrigin.Made}
          className={`requests-made-${index} col-span-2 xl:col-span-1`}
        />
      ))}
    </div>
  )
}

export { RequestsMadeList }
