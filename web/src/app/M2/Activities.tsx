// Activities.tsx. appears in single page right side tabs
import React from "react"
import { activities } from "../../../data/activities"
import styled from "styled-components"
import tw from "tailwind.macro"
import { StateIcon } from "components/StateIcon"
import moment from "moment"
import { dateFormat } from "utils/common"

interface ActivitiesProps {
  className?: string
}

const ActivitiesRaw: React.FC<ActivitiesProps> = (props) => {
  const activitiesCompleted = activities.filter((a) => {
    return (
      a.state === "Completed" || (a.source === "bell" && a.state === "Started")
    )
  })
  const activitiesRunning = activities.filter((a) => a.state === "Running")
  const activitiesFuture = activities.filter((a) => a.state === "Created")
  return (
    <div {...props}>
      <div className="inner">
        {activitiesCompleted?.map((activity) => (
          <div className="activity" key={activity.id}>
            <StateIcon state={activity.state} />
            <div>
              <div>{moment(activity.ended_at).format(dateFormat)}</div>
              <div className="text-gray-500">
                <span className="capitalize">{activity.source} </span>
                <span>{activity.state.toLowerCase()}: </span>
                <i>{activity.name}</i>
              </div>
            </div>
          </div>
        ))}
        <hr />
        {activitiesRunning?.map((activity) => (
          <div className="activity" key={activity.id}>
            <StateIcon state={activity.state} />
            <div className="text-gray-500">
              Started: <a href="#">{activity.name}</a>
            </div>
          </div>
        ))}
        <hr />
        {activitiesFuture?.map((activity) => (
          <div className="activity" key={activity.id}>
            <StateIcon state={activity.state} />
            {activity.state}
            <div>{activity.name}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

const Activities: React.FC<ActivitiesProps> = styled(ActivitiesRaw)`
  .inner {
    ${tw`border-gray-800 border-l-2 m-4`}
  }
  .activity {
    ${tw`my-8 flex items-center`}
    margin-left: 25px;
    .rs-icon {
      ${tw`bg-white`}
      font-size: 20px;
      margin-left: -34px;
      margin-right: 15px;
      z-index: 10;
    }
  }
  hr {
    ${tw`w-2/3 mx-auto border-gray-800 border-dashed`}
  }
`

export { Activities }
