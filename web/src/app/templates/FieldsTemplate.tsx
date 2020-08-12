import React, { useState } from "react"
import { Text } from "app/templates/Text"
import { MultiSelect } from "app/templates/MultiSelect"
import { ExternalLink } from "app/templates/ExternalLink"
import { SingleSelect } from "app/templates/SingleSelect"
import { Block } from "models/interface"
import { UPDATE_TASK_DETAIL } from "operations/mutations/updateTaskDetail"
import { COMPLETE_TASK } from "operations/mutations/updateOneBlock"
import { useMutation } from "@apollo/client"
import { Confirm } from "components/Confirm"

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
  const [field, setField] = useState(task?.task?.fields?.[0])
  const Template = templates[field?.response_type]

  const [showConfirm, setShowConfirm] = useState(false)
  const [updateTaskDetail] = useMutation(UPDATE_TASK_DETAIL)
  const [completeTask] = useMutation(COMPLETE_TASK)

  const save = async () => {
    await updateTaskDetail({
      variables: { id: task?.id, fields: [field] },
    })
    await completeTask({
      variables: { id: task.id },
    })
  }

  const cancel = () => {
    setShowConfirm(false)
  }

  const onSubmit = (field) => {
    setField(field)
    setShowConfirm(true)
  }

  return (
    <div {...props}>
      <Template field={field} onSubmit={onSubmit} view={view} />
      <Confirm
        className="text-2xs"
        show={showConfirm}
        setShow={setShowConfirm}
        onYes={save}
        onNo={cancel}
        style="inline"
        yesText="Complete Task"
        noText="Abandon Changes"
      />
    </div>
  )
}
