import React, {Component} from "react"
import {FieldsTemplate} from "app/templates/FieldsTemplate"
import styled from "styled-components"
import tw from "tailwind.macro"
import {Block} from "models/interface"

interface TaskItemProps {
  task: Block
  className: string
}

const TaskItemRaw: React.FC<TaskItemProps> = ({task, ...props}) => {
  const stateToView = {
    Success: "display",
    Failure: "display",
    Running: "edit",
    Draft: "edit",
    Created: "edit",
  }
  const view = stateToView[task.state]
  const field = task?.task?.fields?.[0]

  return (
    <div {...props}>
      <div className="request">{field?.question}</div>
      {field?.description && (
        <div className="description">
          Notes: {field?.description.toString()}
        </div>
      )}
      <div className="response">
        <FieldsTemplate task={task} view={view} {...props} />
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

export {TaskItem}
