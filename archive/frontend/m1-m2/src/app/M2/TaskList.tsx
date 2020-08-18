import { buildRouterUrl, getRouteParams } from "utils/router"
import { useHistory, useLocation } from "react-router-dom"

import { Block } from "models/interface"
// Tasks.tsx, under bells for requestors view
import React from "react"
import { TODO } from "components/TODO"
import { TaskItem } from "app/M2/TaskItem"
import styled from "styled-components"
import tw from "tailwind.macro"

interface TaskListRawProps {
  tasks?: Block[]
  className?: string
}

export const TaskListRaw: React.FC<TaskListRawProps> = ({
  tasks,
  ...props
}) => {
  const location = useLocation()
  const history = useHistory()
  const params = getRouteParams(location.pathname)
  /* Engine decide task Running state. */
  const completedTasks = tasks?.filter(
    (task) => task.state === "Success" || task.state === "failure"
  )
  const runningTasks = tasks?.filter((task) => task.state === "Running")
  const nextTasks = tasks?.filter(
    (task) => task.state === "Draft" || task.state === "Created"
  )
  const linkToTask = (task) => {
    const path = buildRouterUrl({ ...params, taskId: task.id })
    history.push(path)
  }

  return (
    <div {...props}>
      <h4 className="border-b">Tasks</h4>
      <div className="tasks">
        <TODO>
          use runningTasks rather than all tasks here, check if engine sets
          state correctly
        </TODO>
        {completedTasks?.map((task) => {
          const active = params.taskId === task.id ? "active-task" : ""
          return (
            <div onClick={(e) => linkToTask(task)} key={task.id}>
              <TaskItem className={`task ${active}`} task={task} />
            </div>
          )
        })}
        {runningTasks?.map((task) => {
          const active = params.taskId === task.id ? "active-task" : ""
          return (
            <div onClick={(e) => linkToTask(task)} key={task.id}>
              <TaskItem className={`task ${active}`} task={task} />
            </div>
          )
        })}
        {nextTasks?.length === 0 && runningTasks?.length === 0 && (
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
        &.active-task {
          ${tw`bg-green-100 mr-0`}
          border-left: none;
        }
      }
    }
  }
`

export { TaskList }
