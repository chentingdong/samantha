import * as React from "react"
import { Error } from "components/Misc"
import { ResponseFieldProps } from "app/templates/ResponseFieldProps"
import { useForm } from "react-hook-form"

const TextView: React.FC<{ text: string }> = ({ text }) => {
  return <span>{text}</span>
}

const TextEdit: React.FC<{ text: string }> = ({ text }) => {
  const updateField = (value) => {
    console.log("TODO:mutation to finish task" + value)
  }
  return (
    <input
      className="p-2 border rounded-full"
      value={text}
      onChange={updateField}
    />
  )
}

export const Text: React.FC<ResponseFieldProps> = ({
  field,
  view,
  ...props
}) => {
  console.log(view)
  return (
    <div {...props}>
      {view === "display" && <TextView text={field.response} />}
      {view === "edit" && <TextEdit text={field.response} />}
    </div>
  )
}
