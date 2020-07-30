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
  const state2ViewMap = {
    Completed: "display",
    Running: "edit",
  }

  const todoTaskCount = tasks.filter((task) => {
    return state2ViewMap[task.state] === undefined
  })

  return (
    <div {...props}>
      <h4 className="border-b">Bellhop Counter</h4>
      <div className="tasks">
        {tasks?.map((task) => {
          const view = state2ViewMap[task.state]
          return (
            <div key={task?.id} className="task">
              <div className="request">{task?.task?.title}</div>
              {view && (
                <TaskResponseFields
                  className="response"
                  view={view}
                  fields={task.task.fields}
                />
              )}
            </div>
          )
        })}
        {todoTaskCount.length === 0 && (
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
    ${tw`border p-4 rounded-lg border-b`}
    .task {
      ${tw`my-8`}
      .request {
        ${tw`text-left my-4`}
      }
      .response {
        ${tw`text-right my-4`}
      }
    }
  }
`

export { TaskList }
