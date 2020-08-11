import React, { Component } from "react"
import { FieldTemplate } from "app/templates/FieldTemplate"

import styled from "styled-components"
import tw from "tailwind.macro"
import { Block } from "models/interface"

export interface TaskItemProps {
  task: Block
  className: string
}

const TaskItemRaw: React.FC<TaskItemProps> = ({ task, ...props }) => {
  const stateToView = {
    Success: "display",
    Failure: "display",
    Running: "edit",
    Draft: "edit",
    Created: "edit",
  }
  const view = stateToView[task.state]

  return (
    <div {...props}>
      <div className="request">{task?.task?.fields[0]?.question}</div>
      {task?.task?.fields && task.task.fields[0]?.description && (
        <div className="description">
          Notes: {task?.task?.fields[0]?.description.toString()}
        </div>
      )}
      <div className="response">
        <FieldTemplate field={task?.task?.fields[0]} view={view} {...props} />
      </div>
    </div>
  )
}

const TaskItem = styled(TaskItemRaw)`
  .request {
    ${tw`text-left m-2`}
  }
  .description {
    ${tw`text-xs m-2 text-gray-500`}
  }
  .response {
    ${tw`text-right m-2`}
  }
`

export { TaskItem }
