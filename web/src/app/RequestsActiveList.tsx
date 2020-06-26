import React from "react"
import { useQuery, useSubscription } from "@apollo/client"
import { REQUESTS_ACTIVE } from "../operations/subscriptions/requestsActive"
import { RequestItem } from "./RequestItem"
import { BlockDef } from "../models/interface"
import { ItemOrigin, Typename, EditMode } from "../models/enum"
import { Loading, Error } from "../components/Misc"
import { AUTH_USER } from "../operations/queries/authUser"
import { CatalogDropdown } from "./CatalogDropdown"
import { Divider, Loader } from "rsuite"

const RequestsActiveList = ({ className = "" }) => {
  const { data: authUserResult } = useQuery(AUTH_USER)
  const { loading, error, data } = useSubscription(REQUESTS_ACTIVE)

  if (loading) return <Loader speed="fast" content="Loading..." />
  if (error) return <Error message={error.message} />

  if (!data || !authUserResult) return <></>

  return (
    <div className={`requests-active-list ${className}`}>
      {data.blocks.map((block: BlockDef, index: number) => (
        <RequestItem
          block={block}
          key={block.id}
          itemOrigin={ItemOrigin.Made}
          className={`requests-active-${index} col-span-2 xl:col-span-1`}
        />
      ))}
    </div>
  )
}

export { RequestsActiveList }
