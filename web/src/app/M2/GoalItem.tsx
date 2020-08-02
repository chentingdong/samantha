import * as React from "react"
import { Block } from "models/interface"
import { StateIcon } from "components/StateIcon"
import { CircleIcon, CircleImage, CircleNumber } from "components/Circle"
import styled from "styled-components"
import tw from "tailwind.macro"
import { Icon } from "rsuite"
import { displayUsers } from "utils/user"
import { displayDate } from "utils/common"
import { ParticipantsPicker } from "./ParticipantsPicker"
import { Loading, Error } from "components/Misc"
import { useQuery } from "@apollo/client"
import { GET_USERS } from "operations/queries/getUsers"

interface GoalItemProps {
  goal: Block
  countCompletedTasks: number
  countNotifications: number
}

const GoalItemRaw: React.FC<GoalItemProps> = ({
  goal,
  countCompletedTasks,
  countNotifications,
  ...props
}) => {
  console.log(goal)

  const { data, loading, error } = useQuery(GET_USERS)
  const users = data?.users
  if (loading)
    return <Loading speed="fast" content="Loading..." className="text-center" />
  if (error) return <Error message={error.message} />

  return (
    <div {...props}>
      <div className="flex justify-between">
        <main>
          <div>
            {goal.name}: {goal.className}
          </div>
          {goal.state === "Success" && (
            <div>Ended at: {displayDate(goal.ended_at)}</div>
          )}
          {goal.state === "Running" && (
            <div>Updated at: {displayDate(goal.updated_at)}</div>
          )}
          {goal.state === "Created" && (
            <div>Created at: {displayDate(goal.created_at)}</div>
          )}
          {goal.user_participations.length > 0 && (
            <div>Assigned to: {displayUsers(goal.user_participations)}</div>
          )}
          <div className="mt-4 text-sm text-gray-500">
            {countCompletedTasks} Tasks Completed
          </div>
        </main>
        <aside>
          <div className="flex icons gap-2">
            <CircleIcon icon="attachment" />
            <CircleNumber number={countNotifications} />
            <StateIcon className="icon" state={goal.state} />
          </div>
          <div className="flex justify-end mt-2">
            <Icon className="p-1 text-lg" icon="angle-right" />
            <div className="ml-2 text-sm underline cursor-pointer">
              Goal Details <br />
              Tasks
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

const GoalItem = styled(GoalItemRaw)`
  ${tw`border-gray-100 border p-4`}
  &:hover {
    ${tw`bg-gray-100`}
  }
  aside {
    .icons {
      & > * {
        ${tw`w-8 h-8`}
      }
      & > .icon {
        font-size: 38px;
        margin-top: -2px;
      }
    }
  }
`
export { GoalItem }
