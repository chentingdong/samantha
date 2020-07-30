import * as React from "react"
import { Error } from "components/Misc"
import { TaskResponseFieldProps } from "app/templates/TaskResponseFieldProps"

export const Text: React.FC<TaskResponseFieldProps> = ({ field, ...props }) => {
  return <div>{field.response}</div>
}
