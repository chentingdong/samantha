import React, { useState } from "react"
import { Loader, Placeholder, Pagination, Icon } from "rsuite"
import { Error } from "components/Misc"
import { useQuery } from "@apollo/client"
import { BELLS_LIST } from "operations/queries/bellsList"
import { BellCard, BellRow } from "./BellItem"
import styled from "styled-components"
import { Bell } from "models/interface"
import tw from "tailwind.macro"
import { TODO } from "components/TODO"
import { Button } from "components/Button"
import { ViewMore } from "components/ViewMore"

export interface BellListProps {
  bells?: Bell[]
  className?: string
  whose?: string
}

const BellListCard: React.FC<BellListProps> = ({
  bells,
  whose = "company",
  ...props
}) => {
  const initialCounts = 5
  const [showMore, setShowMore] = useState(false)
  const numberItems = showMore ? bells.length : initialCounts

  return (
    bells && (
      <div {...props}>
        <h5 className="py-2 border-b-2">Running Bells</h5>
        <ViewMore showMore={showMore} setShowMore={setShowMore} />
        <div className="h-auto px-8 transition-height duration-500 ease-in-out grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {bells?.slice(0, numberItems).map((bell) => {
            return <BellCard bell={bell} key={bell.id} whose={whose} />
          })}
        </div>
        <div className="flex flex-row-reverse p-4 px-8 my-4 border-t-2 clear-both">
          <Pagination className="" pages={5} activePage={1} />
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
  const initialCounts = 3
  const [showMore, setShowMore] = useState(false)
  const numberItems = showMore ? bells.length : initialCounts
  return (
    <div className="container m-auto" {...props}>
      <h5 className="pt-4 border-b-2">Start a bell</h5>
      <ViewMore showMore={showMore} setShowMore={setShowMore} />
      <div className="h-auto transition-height duration-500 ease-in-out">
        {bells.slice(0, numberItems).map((bell: Bell) => {
          return <BellRow bell={bell} key={bell.id} />
        })}
      </div>
      <div className="p-4 px-8 my-4 text-right border-t-2 clear-both">
        <Pagination className="" pages={5} activePage={1} />
        <TODO position="right">pagination update page (M2 UI only)</TODO>
      </div>
    </div>
  )
}

export { BellListCard, BellListRow }
