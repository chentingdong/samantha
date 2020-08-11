import React from "react"
import { TaskItemProps } from "app/templates/TaskItemProps"
import { useForm } from "react-hook-form"

const TextDisplay: React.FC<{ text: string }> = ({ text }) => {
  return <span>{text}</span>
}

const TextEdit: React.FC<{ text: string }> = ({ text }) => {
  const onChange = (value) => {
    console.log("TODO:mutation to finish task" + value)
  }
  //TODO: useForm hook here for form submit and validation
  return (
    <input
      type="text"
      className="w-auto px-2 py-1 border rounded-full"
      value={text}
      onChange={onChange}
    />
  )
}

export const Text: React.FC<TaskItemProps> = ({ field, view, ...props }) => {
  return (
    <>
      {view === "display" && <TextDisplay text={field.response} {...props} />}
      {view === "edit" && <TextEdit text={field.response} {...props} />}
    </>
  )
}
