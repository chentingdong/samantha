import React from "react"
import { Loading, Error } from "components/Misc"
import { useSubscription } from "@apollo/client"
import { BELL_CATALOG } from "operations/subscriptions/bellCatalog"
import { BellListRow, BellListProps } from "./BellList"
import { useLocation } from "react-router-dom"
import { getRouteParams } from "utils/router"

const BellCatalogList: React.FC<BellListProps> = ({ whose, ...props }) => {
  const location = useLocation()
  const params = getRouteParams(location)

  const { loading, error, data } = useSubscription(BELL_CATALOG, {})
  if (loading) return <Loading />
  if (error) return <Error message={error.message} />

  let bells = data?.m2_bells
  // TODO: add this filter for my-bellhops page bell catalog list
  if (params.bellhopId && whose === "mine")
    bells = bells.filter(
      (bell) => bell.bellhop_participations?.bellhop?.id === params.bellhopId
    )

  return <BellListRow bells={bells} {...props} />
}

export { BellCatalogList }
