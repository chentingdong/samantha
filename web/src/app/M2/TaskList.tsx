// Tasks.tsx, under bells for requestors view
import React from "react"
import styled from "styled-components"
import tw from "tailwind.macro"
import { TaskItem } from "app/M2/TaskItem"
import { Block } from "models/interface"
interface TaskListRawProps {
  tasks?: Block[]
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

  const todoTasks = tasks.filter((task) => {
    return state2ViewMap[task.state] === "hidden"
  })

  return (
    <div {...props}>
      <h4 className="border-b">Tasks</h4>
      <div className="tasks">
        {tasks?.map((task) => {
          const view = state2ViewMap[task.state]
          return (
            <TaskItem
              className="task"
              view={view}
              task={task.task}
              key={task.id}
            />
          )
        })}
        {todoTasks.length === 0 && (
          <div className="m-4 text-lg italic">
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
      ${tw`my-8 border-b border-gray-100`}
    }
  }
`

export { TaskList }
