import React, { useState } from "react"
import { Loader, Placeholder, Pagination, Icon } from "rsuite"
import { Error } from "components/Misc"
import { Button } from "components/Button"
import { useQuery } from "@apollo/client"
import { BLOCK_CATALOG } from "operations/queries/blockCatalog"
import { BlockDef } from "models/interface"

export interface BellListProps {}

export interface BellListItem {
  blockDef: BlockDef
}

const BellListItem: React.FC<BellListItem> = ({ blockDef }) => {
  return (
    <ul className="px-8 py-0 rounded-full cursor-pointer grid grid-cols-7 hover:bg-gray-300">
      <li className="self-center break-all col-span-2">
        {blockDef.name || <Placeholder.Paragraph rows={1} />}
      </li>
      <li className="self-center break-all col-span-4">
        {blockDef.description || <Placeholder.Paragraph rows={1} />}
      </li>
      <li className="flex flex-row-reverse self-center col-span-1">
        <Button color="secondary" className="fill">
          Start
        </Button>
      </li>
    </ul>
  )
}

const BellList: React.FC<BellListProps> = (props) => {
  const { loading, error, data } = useQuery(BLOCK_CATALOG)
  const initialCounts = 3
  const [showMore, setShowMore] = useState(false)
  const numberItems = showMore ? data.blockDefs.length : initialCounts

  if (loading) return <Loader speed="fast" content="Loading..." />
  if (error) return <Error message={error.message} />

  if (!data) return <></>

  const ShowMoreButton = (
    <div
      className="m-4 text-lg underline cursor-pointer"
      onClick={() => setShowMore(!showMore)}
    >
      {!showMore && <Icon icon="plus" />}
      {!showMore && <span className="ml-2">View More</span>}
      {showMore && <Icon icon="minus" />}
      {showMore && <span className="ml-2">View Less</span>}
    </div>
  )

  return (
    <div className="">
      <div className="flex flex-row-reverse p-4 px-8 mb-4 border-b-2">
        <Pagination className="" pages={5} activePage={1} />
      </div>
      {ShowMoreButton}
      <div className="h-auto transition-height duration-500 ease-in-out">
        {data.blockDefs
          .slice(0, numberItems)
          .map((blockDef: BlockDef, index: number) => {
            return <BellListItem blockDef={blockDef} key={blockDef.id} />
          })}
      </div>
      <div className="flex flex-row-reverse p-4 px-8 my-4 border-t-2 clear-both">
        <Pagination className="" pages={5} activePage={1} />
      </div>
    </div>
  )
}

export { BellList, BellListItem }
