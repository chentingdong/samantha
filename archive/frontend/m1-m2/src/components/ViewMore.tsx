import React from "react"
import { Icon } from "rsuite"

export interface ViewMoreProps {
  showMore: boolean
  setShowMore: (boolean) => void
}
const ViewMore: React.FC<ViewMoreProps> = ({ showMore, setShowMore }) => {
  return (
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
}

export { ViewMore }
