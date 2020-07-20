import React from "react"
import { Bell } from "models/interface"
import { Icon } from "rsuite"
import styled from "styled-components"
import tw from "tailwind.macro"
import { goalData } from "../../../data/goal"
interface GoalProps {
  block: Bell
}
import { setUiState } from "../../operations/mutations/setUiState"

const GoalRaw: React.FC<GoalProps> = ({ block, ...props }) => {
  const countCompletedTasks = () => {
    const completedTasks = goalData.tasks.filter((task) =>
      ["Success", "Failure"].includes(task.state)
    )
    return completedTasks.length
  }

  const goalRunningTasks = () => {
    const runningTasks = goalData.tasks.filter((task) => {
      return task.state === "Running"
    })
    return runningTasks
  }

  const goalNextTasks = () => {
    const nextTasks = goalData.tasks.filter((task) => {
      return ["Created", "Ready"].includes(task.state)
    })
    return nextTasks
  }

  return (
    <div className="taskCard grid grid-cols-5 ">
      <main className="col-span-5 lg:col-span-3 ">
        <div className="align-middle">
          <h4 className="inline-block">{block.name}</h4>
          <span className="px-2">({goalData.owner.bellhops.join(",")})</span>
          <span className="underline">
            {goalData.participants.length} Participants
          </span>
        </div>
        <div className="my-2">{countCompletedTasks()} tasks completed</div>
        <div>
          <h4>In progress tasks</h4>
          <ul className="px-4">
            {goalRunningTasks().map((task) => {
              return (
                <li className="mx-4 my-2 list-disc" key={task.id}>
                  <a href="">{task.name}</a>
                  <span className="ml-2">({task.owner})</span>
                </li>
              )
            })}
          </ul>
        </div>
        <div>
          <h4>Next tasks</h4>
          <ul className="px-4">
            {goalNextTasks().map((task) => {
              return (
                <li className="mx-4 my-2 list-disc" key={task.id}>
                  <a className="text-lg" href="">
                    {task.name}
                  </a>
                  <span className="ml-2">({task.owner})</span>
                </li>
              )
            })}
          </ul>
        </div>
        <a className="block py-2 my-4 text-lg" href="#">
          Details View <Icon icon="down" />
        </a>
      </main>
      <aside className="col-span-5 lg:col-span-2">
        <h5 className="my-8 text-center">Recent Activity</h5>
        <div className="activities grid grid-cols-3">
          <div className="activity grid grid-rows-2">
            <div
              className="circle"
              onClick={(e) => setUiState({ showNotification: true })}
            >
              {goalData.notifications.length}
            </div>
            <label>Bellhop Notifications</label>
          </div>
          <div className="activity grid grid-rows-2">
            <div className="circle">{goalData.chatMessages.length}</div>
            <label>Chat & Collab</label>
          </div>
          <div className="activity grid grid-rows-2">
            <div className="circle">{goalData.documents.length}</div>
            <label>Documents & Artifacts</label>
          </div>
        </div>
      </aside>
    </div>
  )
}

const GoalStyle = styled.div.attrs({
  className: "p-8 border-gray-800 rounded-lg border-1",
})`
  & {
    main {
      ${tw`border-r-0 lg:border-r-2 border-b-2 lg:border-b-0`}
    }
    .activities {
      ${tw`items-center content-center`}
      .activity {
        .circle {
          ${tw`flex self-start mx-auto items-center justify-center`}
          ${tw`hover:bg-gray-300 active:bg-gray-100 cursor-pointer`}
          ${tw`rounded-full border-2`}
          ${tw`w-20 sm:w-32 md:w-32 lg:w-24 xl:w-32`}
          ${tw`h-20 sm:h-32 md:h-32 lg:h-24 xl:h-32`}
        }
        label {
          ${tw`w-32 self-end m-auto block text-center`}
        }
      }
    }
  }
`

const Goal: React.FC<GoalProps> = ({ block, ...props }) => {
  return (
    <GoalStyle>
      <GoalRaw block={block} {...props} />
    </GoalStyle>
  )
}

export { GoalRaw, Goal }
