import React, { Component } from "react"
import { Text } from "app/templates/Text"
import { MultiSelect } from "app/templates/MultiSelect"
import { ExternalLink } from "app/templates/ExternalLink"
import { AskForApproval } from "app/templates/AskForApproval"

export interface ResponseFieldProps {
  field: any
  view: "display" | "edit"
}

const ResponseField: React.FC<ResponseFieldProps> = ({
  field,
  view = "display",
  ...props
}) => {
  const templates = {
    Text: Text,
    MultiSelect: MultiSelect,
    ExternalLink: ExternalLink,
    AskForApproval: AskForApproval,
  }
  const Template = templates[field.response_type]
  return <Template field={field} view={view} {...props} />
}

interface TaskTaskResponseFieldsProps {
  fields: any[]
  view: "display" | "edit"
}

export const TaskResponseFields: React.FC<TaskTaskResponseFieldsProps> = ({
  fields,
  view = "display",
  ...props
}) => {
  return (
    <div {...props}>
      {fields?.map((field) => {
        return (
          <ResponseField view={view} field={field} key={field.response_type} />
        )
      })}
    </div>
  )
}
