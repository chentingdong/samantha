import * as React from "react"
import { TaskItemProps } from "app/templates/TaskItemProps"
import { MultiCascader } from "rsuite"
import styled from "styled-components"

const MultiSelectDisplay: React.FC<{ value: string }> = ({ value }) => {
  return <div>{value}</div>
}

const MultiSelectEditRaw: React.FC<{
  value: string
  options: string[]
}> = ({ value, options, ...props }) => {
  const select_options = options.map((option) => {
    return {
      label: option,
      value: option,
      role: "",
    }
  })

  const updateField = (value) => {
    console.log("TODO: mutation to finish task:" + value)
  }

  //TODO: useForm hook for form submit and validation
  return (
    <MultiCascader
      placement="bottomEnd"
      placeholder={value}
      data={select_options}
      onChange={updateField}
      {...props}
    />
  )
}

const MultiSelectEdit = styled(MultiSelectEditRaw)`
  .rs-picker-value-count {
    display: none;
  }
`

export const MultiSelect: React.FC<TaskItemProps> = ({
  field,
  view,
  ...props
}) => {
  return (
    <>
      {view === "display" && (
        <MultiSelectDisplay value={field.response} {...props} />
      )}
      {view === "edit" && (
        <MultiSelectEdit
          countable={false}
          value={field.response}
          options={field.select_options}
          {...props}
        />
      )}
    </>
  )
}
