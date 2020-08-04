// Activities.tsx. appears in single page right side tabs
import React from "react"
import styled from "styled-components"
import tw from "tailwind.macro"
import { BellStateIcon } from "components/BellStateIcon"
import { displayDate } from "utils/common"
import { Bell } from "models/interface"
import { useLocation, matchPath, Link } from "react-router-dom"
import { getBellLocationParams } from "utils/bell"

interface ActivitiesProps {
  bell: Bell
  className?: string
}

const ActivitiesRaw: React.FC<ActivitiesProps> = ({ bell, ...props }) => {
  const location = useLocation()
  const params = getBellLocationParams(location)

  const activities =
    params.goalId === "all"
      ? bell.blocks
      : bell.blocks.filter(
          (block) =>
            block.id === params.goalId || block.parent_id === params.goalId
        )

  const goal = bell.blocks.filter((block) => block.id === params.goalId)[0]
  const activitiesCompleted = activities.filter((a) => a.state === "Success")
  const activitiesRunning = activities.filter((a) => a.state === "Running")
  const activitiesFuture = activities.filter((a) => a.state === "Created")

  return (
    <div {...props}>
      <div className="inner">
        <div className="activity">
          <BellStateIcon state="Success" />
          <div>
            <div>{displayDate(bell.started_at)}</div>
            <div className="text-gray-500">
              <span className="capitalize">Bell Started: </span>
              <i>{bell.name}</i>
            </div>
          </div>
        </div>
        {activitiesCompleted?.map((activity) => (
          <div className="activity" key={activity.id}>
            <BellStateIcon state={activity.state} />
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
            activity.parent.type === "Goal" ? activity.parent.id : params.goalId
          return (
            <div className="activity" key={activity.id}>
              <BellStateIcon state={activity.state} />
              <div className="text-lg text-gray-800">
                <span className="pr-2">Started:</span>
                {isTask && (
                  <Link
                    to={`/bells/${params.bellId}/${taskGoalId}/${params.context}/details`}
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
            <BellStateIcon state={activity.state} />
            <div>
              <span className="capitalize">{activity.state}: </span>
              {activity.name}
            </div>
          </div>
        ))}
        <div className="activity">
          <BellStateIcon state="Created" />
          <div className="text-gray-500">
            <span>
              {goal?.state === "Success" ? "Completed" : "Complete"}:{" "}
            </span>
            <i>{goal?.name}</i>
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
