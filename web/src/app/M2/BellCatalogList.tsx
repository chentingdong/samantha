import { BellListProps, BellListRow } from "./BellList"
import { Error, Loading } from "components/Misc"

import { BELL_CATALOG } from "operations/subscriptions/bellCatalog"
import React from "react"
import { getRouteParams } from "utils/router"
import { useLocation } from "react-router-dom"
import { useSubscription } from "@apollo/client"

const BellCatalogList: React.FC<BellListProps> = ({ whose, ...props }) => {
  const location = useLocation()
  const params = getRouteParams(location.pathname)

  const { loading, error, data } = useSubscription(BELL_CATALOG, {})
  if (loading) return <Loading />
  if (error) return <Error message={error.message} />

  let bells = data?.m2_bells
  if (params.bellhopId && whose === "mine")
    bells = bells?.filter(
      (bell) =>
        bell?.bellhop_participations
          ?.map((p) => p.bellhop.id)
          .indexOf(params.bellhopId) > -1
    )

  return <BellListRow bells={bells} {...props} />
}

export { BellCatalogList }
