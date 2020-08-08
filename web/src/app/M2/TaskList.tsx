// Tasks.tsx, under bells for requestors view
import React from "react"
import styled from "styled-components"
import tw from "tailwind.macro"
import { TaskItem } from "app/M2/TaskItem"
import { Block } from "models/interface"
import { useLocation } from "react-router-dom"
import { getRouteParams } from "utils/bell"

const stateToView = {
  Success: "display",
  Failure: "display",
  Running: "edit",
  Draft: "display",
  Created: "display",
}

interface TaskListRawProps {
  tasks?: Block[]
  className?: string
}

export const TaskListRaw: React.FC<TaskListRawProps> = ({
  tasks,
  ...props
}) => {
  const location = useLocation()
  const params = getRouteParams(location)
  const runningTasks = tasks.filter((task) => task.state === "Running")
  const nextTasks = tasks.filter(
    (task) => task.state === "Draft" || task.state === "Created"
  )

  return (
    <div {...props}>
      <h4 className="border-b">Tasks</h4>
      <div className="tasks">
        {tasks?.map((task) => {
          const view = stateToView[task.state]
          const active = params.taskId === task.id ? "active" : ""
          return (
            <TaskItem
              className={`task ${view} ${active}`}
              view={view}
              task={task.task}
              key={task.id}
            />
          )
        })}
        {nextTasks.length === 0 && runningTasks.length === 0 && (
          <div className="m-2 text-lg italic">
            All good for now! Come back for updates.
          </div>
        )}
      </div>
    </div>
  )
}

const TaskList = styled(TaskListRaw)`
  & {
    ${tw`mt-8`}
    .tasks {
      ${tw`border p-4 rounded-lg mt-4`}
      .task {
        ${tw`p-2 my-1`}
        box-sizing: border-box;
        &.edit.active {
          ${tw`bg-green-100 mr-0`}
          border-left: none;
        }
      }
    }
  }
`

export { TaskList }
