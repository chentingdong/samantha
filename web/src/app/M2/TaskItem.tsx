import React, { Component } from "react"
import { Text } from "app/templates/Text"
import { MultiSelect } from "app/templates/MultiSelect"
import { ExternalLink } from "app/templates/ExternalLink"
import { SingleSelect } from "app/templates/SingleSelect"
import styled from "styled-components"
import tw from "tailwind.macro"

export interface TaskItemProps {
  task: any
  view: "display" | "edit" | "hidden"
}

const TaskItemRaw: React.FC<TaskItemProps> = ({
  task,
  view = "display",
  ...props
}) => {
  const templates = {
    Text: Text,
    Decimal: Text,
    SingleSelect: SingleSelect,
    MultiSelect: MultiSelect,
    ExternalLink: ExternalLink,
  }
  const Template = templates[task?.fields[0].response_type]
  return (
    <div {...props}>
      {task && Template && (
        <>
          <div className="request">{task?.fields[0]?.question}</div>
          <div className="response">
            <Template field={task?.fields[0]} view={view} {...props} />
          </div>
        </>
      )}
    </div>
  )
}

const TaskItem = styled(TaskItemRaw)`
  .request {
    ${tw`text-left my-4`}
  }
  .response {
    ${tw`text-right my-4`}
  }
`

export { TaskItem }
