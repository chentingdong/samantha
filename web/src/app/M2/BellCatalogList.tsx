import React, { useState } from "react"
import { Loader, Placeholder, Pagination, Icon } from "rsuite"
import { Error } from "components/Misc"
import { Button } from "components/Button"
import { useQuery } from "@apollo/client"
import { BELL_CATALOG } from "operations/queries/bellCagalog"
import { BlockDef, Bell } from "models/interface"

export interface BellCatalogListProps {}

export interface BellCatalogListItem {
  bell: Bell
}

const BellCatalogListItem: React.FC<BellCatalogListItem> = ({ bell }) => {
  return (
    <ul className="px-8 py-0 rounded-full cursor-pointer grid grid-cols-7 hover:bg-gray-300">
      <li className="self-center break-all col-span-2">
        {bell.name || <Placeholder.Paragraph rows={1} />}
      </li>
      <li className="self-center break-all col-span-4">
        {bell.description || <Placeholder.Paragraph rows={1} />}
      </li>
      <li className="flex flex-row-reverse self-center col-span-1">
        <Button color="secondary" className="fill">
          Start
        </Button>
      </li>
    </ul>
  )
}

const BellCatalogList: React.FC<BellCatalogListProps> = (props) => {
  const { loading, error, data } = useQuery(BELL_CATALOG)

  const initialCounts = 3
  const [showMore, setShowMore] = useState(false)
  const numberItems = showMore ? data.bells.length : initialCounts

  if (loading) return <Loader speed="fast" content="Loading..." />
  if (error) return <Error message={error.message} />

  if (!data) return <></>

  const ViewMoreButton = (
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
      <h5 className="pt-4 border-b-2">Start a bell</h5>
      {ViewMoreButton}
      <div className="h-auto transition-height duration-500 ease-in-out">
        {data.bells.slice(0, numberItems).map((bell: Bell, index: number) => {
          return <BellCatalogListItem bell={bell} key={bell.id} />
        })}
      </div>
      <div className="flex flex-row-reverse p-4 px-8 my-4 border-t-2 clear-both">
        <Pagination className="" pages={5} activePage={1} />
      </div>
    </div>
  )
}

export { BellCatalogList, BellCatalogListItem }
