import React, { Component } from "react"
import { Text } from "app/templates/Text"
import { MultiSelect } from "app/templates/MultiSelect"
import { ExternalLink } from "app/templates/ExternalLink"
import { AskForApproval } from "app/templates/AskForApproval"

export interface TaskResponseFieldProps {
  field: any
}

const ResponseField: React.FC<TaskResponseFieldProps> = ({
  field,
  ...props
}) => {
  const templates = {
    Text: Text,
    MultiSelect: MultiSelect,
    ExternalLink: ExternalLink,
    AskForApproval: AskForApproval,
  }
  const Template = templates[field.response_type]
  return <Template field={field} {...props} />
}

interface TaskTaskResponseFieldProps {
  fields: any
}

export const TaskResponseFields: React.FC<TaskTaskResponseFieldProps> = ({
  fields,
  ...props
}) => {
  return (
    <div {...props}>
      {fields?.map((field) => {
        return <ResponseField key={field.response_type} field={field} />
      })}
    </div>
  )
}
