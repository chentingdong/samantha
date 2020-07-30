import * as React from "react"
import { ResponseFieldProps } from "app/templates/ResponseFieldProps"
import { SelectPicker } from "rsuite"

export const MultiSelectDisplay: React.FC<{ value: string }> = ({ value }) => {
  return <div>{value}</div>
}

export const MultiSelectEdit: React.FC<{
  value: string
  options: string[]
}> = ({ value, options }) => {
  const select_options = options.map((option) => {
    return {
      label: option,
      value: option,
      role: "",
    }
  })
  const updateField = (value) => {
    console.log("TODO:mutation to finish task:" + value)
  }

  //TODO: useForm hook for form submit and validation
  return (
    <SelectPicker
      placement="bottomEnd"
      placeholder={value}
      data={select_options}
      onChange={updateField}
    />
  )
}

export const MultiSelect: React.FC<ResponseFieldProps> = ({
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
          value={field.response}
          options={field.select_options}
          {...props}
        />
      )}
    </>
  )
}
