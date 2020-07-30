// Tasks.tsx, under bells for requestors view
import React from "react"
import { tasks as testingTasks } from "../../../data/tasks"
import styled from "styled-components"
import tw from "tailwind.macro"
import { TaskResponseFields } from "app/M2/TaskResponseFields"

interface TaskListRawProps {
  tasks?: any
}

export const TaskListRaw: React.FC<TaskListRawProps> = ({
  tasks = testingTasks,
  ...props
}) => {
  return (
    <div {...props}>
      {tasks?.map((task) => {
        const view = task.state === "Completed" ? "display" : "edit"

        return (
          <div key={task?.id} className="task">
            <div className="request">{task?.task?.title}</div>
            <TaskResponseFields
              className="response"
              view={view}
              fields={task.task.fields}
            />
          </div>
        )
      })}
    </div>
  )
}

const TaskList = styled(TaskListRaw)`
  ${tw`border m-2 p-4 rounded-lg`}
  .request {
    ${tw`text-left`}
  }
  .response {
    ${tw`text-right`}
  }
`

export { TaskList }
