import React, { useState } from "react"
import { Loader, Pagination } from "rsuite"
import { Error } from "components/Misc"
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
  const initialCounts = 3
  const [showMore, setShowMore] = useState(false)
  const numberItems = showMore ? bells.length : initialCounts
  if (loading) return <Loader speed="fast" content="Loading..." />
  if (error) return <Error message={error.message} />
  if (!bells) return <></>

  return (
    <div {...props}>
      <h3 className="pt-4">Start a bell</h3>
      <ViewMore showMore={showMore} setShowMore={setShowMore} />
      <div className="h-auto transition-height duration-500 ease-in-out">
        {bells.slice(0, numberItems).map((bell: Bell) => {
          return <BellRow bell={bell} key={bell.id} />
        })}
      </div>
      <div className="p-4 px-8 my-4 text-right border-t-1 clear-both">
        <Pagination className="" pages={5} activePage={1} />
        <TODO position="right">pagination update page (M2 UI only)</TODO>
      </div>
    </div>
  )
}

export { BellCatalogList }
