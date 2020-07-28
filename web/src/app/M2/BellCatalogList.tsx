import React from "react"
import { Loading, Error } from "components/Misc"
import { useSubscription } from "@apollo/client"
import { BELL_CATALOG } from "operations/subscriptions/bellCatalog"
import { BellListRow, BellListProps } from "./BellList"

const BellCatalogList: React.FC<BellListProps> = (props) => {
  const { loading, error, data } = useSubscription(BELL_CATALOG, {})
  if (loading) return <Loading />
  if (error) return <Error message={error.message} />
  const bells = data?.m2_bells
  return <BellListRow bells={bells} />
}

export { BellCatalogList }
