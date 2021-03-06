import { BellItemCard, BellItemRow } from "./BellItem"
import React, { useState } from "react"

import { Bell } from "models/interface"
import { ViewMore } from "components/ViewMore"

export interface BellListProps {
  bells?: Bell[]
  listTitle?: string
  className?: string
  whose?: "all" | "mine"
}

const BellListCard: React.FC<BellListProps> = ({
  bells,
  listTitle = "",
  whose = "all",
  ...props
}) => {
  const initialCounts = 4
  const [showMore, setShowMore] = useState(false)
  const numberItems = showMore ? bells.length : initialCounts

  return (
    <div {...props}>
      {listTitle && <h4 className="my-4 border-b">{listTitle}</h4>}
      {bells?.length > numberItems && (
        <ViewMore showMore={showMore} setShowMore={setShowMore} />
      )}
      <div className="h-auto px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {bells?.slice(0, numberItems).map((bell) => {
          return <BellItemCard bell={bell} key={bell?.id} whose={whose} />
        })}
      </div>
    </div>
  )
}

const BellListRow: React.FC<BellListProps> = ({
  bells,
  className,
  ...props
}) => {
  const initialCounts = 4
  const [showMore, setShowMore] = useState(false)
  const numberItems = showMore ? bells.length : initialCounts
  return (
    <div className="container m-auto" {...props}>
      <h4 className="mx-1 pt-4 border-b">Start a Bell</h4>
      {bells.length > 0 && (
        <>
          {bells.length > numberItems && (
            <ViewMore showMore={showMore} setShowMore={setShowMore} />
          )}
          <div className="h-auto transition-height duration-500 ease-in-out">
            {bells.slice(0, numberItems).map((bell: Bell) => {
              return <BellItemRow bell={bell} key={bell?.id} />
            })}
          </div>
        </>
      )}
      {bells.length === 0 && (
        <div className="my-4 text-lg text-center text-gray-500">
          No catalog bells found for you.
        </div>
      )}
    </div>
  )
}

export { BellListCard, BellListRow }
