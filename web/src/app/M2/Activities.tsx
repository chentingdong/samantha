// Activities.tsx. appears in single page right side tabs
import React from "react"
import styled from "styled-components"
import tw from "tailwind.macro"
import { StateIcon } from "components/StateIcon"
import { displayDate } from "utils/common"
import { Bell } from "models/interface"
import { useLocation, matchPath, Link } from "react-router-dom"

interface ActivitiesProps {
  bell: Bell
  className?: string
}

const ActivitiesRaw: React.FC<ActivitiesProps> = ({ bell, ...props }) => {
  const location = useLocation()

  const match = matchPath(location.pathname, {
    path: "/bells/:bellId/:goalId?/:context?",
  })
  const bellId = bell.id
  const goalId = match?.params.goalId || "all"
  const context = match?.params.context || "activities"

  const activities =
    goalId === "all"
      ? bell.blocks
      : bell.blocks.filter(
          (block) => block.id === goalId || block.parent_id === goalId
        )

  const activitiesCompleted = activities.filter((a) => a.state === "Success")
  const activitiesRunning = activities.filter((a) => a.state === "Running")
  const activitiesFuture = activities.filter((a) => a.state === "Created")

  return (
    <div {...props}>
      <div className="inner">
        {activitiesCompleted?.map((activity) => (
          <div className="activity" key={activity.id}>
            <StateIcon state={activity.state} />
            <div>
              <div>{displayDate(activity.ended_at || activity.started_at)}</div>
              <div className="text-gray-500">
                <span className="capitalize">{activity.type} Completed: </span>
                <i>{activity.name}</i>
              </div>
            </div>
          </div>
        ))}
        <hr />
        {activitiesRunning?.map((activity) => {
          const isTask = activity.type === "Task"
          const taskGoalId =
            activity.parent.type === "Goal" ? activity.parent.id : goalId
          return (
            <div className="activity" key={activity.id}>
              <StateIcon state={activity.state} />
              <span className="pr-2">Started:</span>
              <div className="text-lg text-gray-800">
                {isTask && (
                  <Link
                    to={`/bells/${bellId}/${taskGoalId}/${context}/details`}
                  >
                    {activity.name}
                  </Link>
                )}
                {!isTask && <span>{activity.name}</span>}
              </div>
            </div>
          )
        })}
        <div className="ddd">...</div>
        {activitiesFuture?.map((activity) => (
          <div className="hidden activity" key={activity.id}>
            <StateIcon state={activity.state} />
            <div>
              <span className="capitalize">{activity.state}: </span>
              {activity.name}
            </div>
          </div>
        ))}
        <div className="activity">
          <StateIcon state="Created" />
          <div className="text-gray-500">
            <span>Complete </span> <i>goal</i>
          </div>
        </div>
      </div>
    </div>
  )
}

const Activities: React.FC<ActivitiesProps> = styled(ActivitiesRaw)`
  .inner {
    ${tw`border-gray-800 border-l-2 m-4 pb-1`}
  }
  .activity {
    ${tw`my-8 flex items-center`}
    margin-left: 32px;
    .rs-icon {
      ${tw`bg-white`}
      font-size: 20px;
      margin-left: -41px;
      margin-right: 15px;
      z-index: 10;
    }
  }
  hr {
    ${tw`w-2/3 mx-auto border-gray-800 border-dashed border-gray-500`}
  }
  .ddd {
    ${tw`mx-auto my-8 text-3xl font-bold text-center text-gray-500`}
  }
`

export { Activities }
