import * as React from "react"
import { Link } from "react-router-dom"
import { Button } from "components/Button"

interface GoalListHeaderProps {
  link: string
  className?: string
}

export const GoalListHeader: React.FC<GoalListHeaderProps> = ({
  link,
  ...props
}) => {
  return (
    <div
      className={`${props.className} flex justify-between pb-2 mb-4 mr-4 border-b`}
    >
      <h4 className="">Goal</h4>
      <Link to={link} {...props}>
        <Button className="p-2 m-0 fill" color="secondary">
          View All Goals
        </Button>
      </Link>
    </div>
  )
}
