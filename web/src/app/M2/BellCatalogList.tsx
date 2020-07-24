import React, { useState } from "react"
import { Loading, Error } from "components/Misc"
import { useSubscription } from "@apollo/client"
import { BELL_CATALOG } from "operations/subscriptions/bellCatalog"
import { Bell } from "models/interface"
import { TODO } from "components/TODO"
import { ViewMore } from "components/ViewMore"
import { BellRow } from "./BellItem"
import { BellListProps } from "./BellList"

const BellCatalogList: React.FC<BellListProps> = (props) => {
  const { loading, error, data } = useSubscription(BELL_CATALOG, {})

  const bells = data?.bells
  const initialCounts = 4
  const [showMore, setShowMore] = useState(false)
  const numberItems = showMore ? bells.length : initialCounts
  if (loading) return <Loading />
  if (error) return <Error message={error.message} />
  if (!bells) return <></>

  return (
    <div className="relative" {...props}>
      <h3 className="pt-4 border-b">Start a Bell</h3>
      <ViewMore showMore={showMore} setShowMore={setShowMore} />
      <div className="h-auto transition-height duration-500 ease-in-out">
        {bells.slice(0, numberItems).map((bell: Bell) => {
          return <BellRow bell={bell} key={bell.id} />
        })}
      </div>
    </div>
  )
}

export { BellCatalogList }
