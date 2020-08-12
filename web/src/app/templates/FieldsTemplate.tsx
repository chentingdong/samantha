import * as React from "react"
import { Text } from "app/templates/Text"
import { MultiSelect } from "app/templates/MultiSelect"
import { ExternalLink } from "app/templates/ExternalLink"
import { SingleSelect } from "app/templates/SingleSelect"
import { Block } from "models/interface"
import { UPDATE_TASK_DETAIL } from "operations/mutations/updateTaskDetail"
import { COMPLETE_TASK } from "operations/mutations/updateOneBlock"
import { useMutation } from "@apollo/client"

interface FieldsTemplateProps {
  task: Block
  view: "display" | "edit"
}

export const FieldsTemplate: React.FC<FieldsTemplateProps> = ({
  task,
  view,
  ...props
}) => {
  const templates = {
    Text: Text,
    Decimal: Text,
    SingleSelect: SingleSelect,
    MultiSelect: MultiSelect,
    ExternalLink: ExternalLink,
  }
  const field = task?.task?.fields?.[0]
  const Template = templates[field?.response_type]

  const [updateTaskDetail] = useMutation(UPDATE_TASK_DETAIL)
  const [completeTask] = useMutation(COMPLETE_TASK)

  const onSubmit = async (field) => {
    await updateTaskDetail({
      variables: { id: task?.id, fields: [field] },
    })
    // await completeTask({
    //   variables: { id: task.id },
    // })
  }

  return <Template field={field} onSubmit={onSubmit} view={view} {...props} />
}
