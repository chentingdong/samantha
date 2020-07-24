import React, { useState } from "react"
import { Pagination } from "rsuite"
import { BellCard, BellRow } from "./BellItem"
import { Bell } from "models/interface"
import { TODO } from "components/TODO"
import { ViewMore } from "components/ViewMore"
import { useQuery } from "@apollo/client"
import { UI_STATE } from "../../operations/queries/uiState"

export interface BellListProps {
  bells?: Bell[]
  listTitle?: string
  className?: string
  whose?: string
}

const BellListCard: React.FC<BellListProps> = ({
  bells,
  listTitle = "",
  whose = "company",
  ...props
}) => {
  const initialCounts = 4
  const [showMore, setShowMore] = useState(false)
  const numberItems = showMore ? bells.length : initialCounts

  return (
    bells && (
      <div {...props}>
        {listTitle && <h3 className="py-2 my-4 border-b">{listTitle}</h3>}
        <ViewMore showMore={showMore} setShowMore={setShowMore} />
        <div className="h-auto px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {bells?.slice(0, numberItems).map((bell) => {
            return <BellCard bell={bell} key={bell.id} whose={whose} />
          })}
        </div>
      </div>
    )
  )
}

const BellListRow: React.FC<BellListProps> = ({
  bells,
  className,
  ...props
}) => {
  const initialCounts = 4
  const { data } = useQuery(UI_STATE)
  const [showMore, setShowMore] = useState(false)
  const numberItems = showMore ? bells.length : initialCounts
  return (
    <div className="container m-auto" {...props}>
      <h3 className="pt-4">Start a Bell</h3>
      <TODO>
        filter bell with is_definition=true bellhop id:
        <i>{data?.uiState?.currentBellhopId}</i>
      </TODO>
      <ViewMore showMore={showMore} setShowMore={setShowMore} />
      <div className="h-auto transition-height duration-500 ease-in-out">
        {bells.slice(0, numberItems).map((bell: Bell) => {
          return <BellRow bell={bell} key={bell.id} />
        })}
      </div>
    </div>
  )
}

export { BellListCard, BellListRow }
