// Tasks.tsx, under bells for requestors view
import React from "react"
import styled from "styled-components"
import tw from "tailwind.macro"
import { TaskItem } from "app/M2/TaskItem"
import { Block } from "models/interface"
interface TaskListRawProps {
  tasks?: Block[]
  className?: string
}

export const TaskListRaw: React.FC<TaskListRawProps> = ({
  tasks,
  ...props
}) => {
  const state2ViewMap = {
    Success: "display",
    Failure: "display",
    Running: "edit",
    Draft: "hidden",
    Created: "hidden",
  }

  const runningTasks = tasks.filter((task) => task.state === "Running")
  const todoTasks = tasks.filter(
    (task) => task.state === "Draft" || task.state === "Created"
  )

  return (
    <div {...props}>
      <h4 className="border-b">Tasks</h4>
      <div className="tasks">
        {tasks?.map((task) => {
          const view = state2ViewMap[task.state]
          return (
            <TaskItem
              className={`task ${view}`}
              view={view}
              task={task.task}
              key={task.id}
            />
          )
        })}
        {todoTasks.length === 0 && runningTasks.length === 0 && (
          <div className="m-2 text-lg italic">
            All good for now! Come back for updates.
          </div>
        )}
      </div>
    </div>
  )
}

const TaskList = styled(TaskListRaw)`
  ${tw`mt-8`}
  .tasks {
    ${tw`border p-4 rounded-lg mt-4`}
    .task {
      ${tw`p-2`}
      box-sizing: border-box;
      &.edit {
        ${tw`bg-green-100`}
      }
    }
  }
`

export { TaskList }
