import React, { useState } from "react"
import { Loader, Placeholder, Pagination, Icon } from "rsuite"
import { Error } from "components/Misc"
import { useQuery } from "@apollo/client"
import { BELLS_LIST } from "operations/queries/bellsList"
import { Bell } from "models/interface"
import { Card } from "components/Card"
import moment from "moment"

export interface BellsListProps {}

export interface BellsListItem {
  bell: Bell
}

const BellsListItem: React.FC<BellsListItem> = ({ bell }) => {
  return (
    <Card className="">
      <div className="card-header">
        <h5>{bell.name}</h5>
        <div>{moment(bell.createdAt).format("MM/DD hh:mm:ss")}</div>
        <div>by</div>
      </div>
      <div className="card-footer">Facilities</div>
    </Card>
  )
}

const BellsList: React.FC<BellsListProps> = (props) => {
  const { loading, error, data } = useQuery(BELLS_LIST)

  const initialCounts = 5
  const [showMore, setShowMore] = useState(false)
  const numberItems = showMore ? data.bells.length : initialCounts

  if (loading) return <Loader speed="fast" content="Loading..." />
  if (error) return <Error message={error.message} />
  if (!data) return <></>

  // TODO: to a component
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
    <div className="container m-auto">
      <h5 className="py-2 border-b-2">Running Bells</h5>
      {ViewMoreButton}
      <div className="h-auto transition-height duration-500 ease-in-out grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {data.bells.slice(0, numberItems).map((bell: Bell, index: number) => {
          return <BellsListItem bell={bell} key={bell.id} />
        })}
      </div>
      <div className="flex flex-row-reverse p-4 px-8 my-4 border-t-2 clear-both">
        <Pagination className="" pages={5} activePage={1} />
      </div>
    </div>
  )
}

export { BellsList, BellsListItem }
