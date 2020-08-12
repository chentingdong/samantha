import React, {useState} from "react"
import {CheckPicker} from "rsuite"
import styled from "styled-components"
import tw from "tailwind.macro"
import {SelectProps} from "./SingleSelect"

const MultiSelectDisplay: React.FC<{value: string[]}> = ({value}) => {
  return <div>{value.join(', ')}</div>
}

export const MultiSelectEditRaw: React.FC<SelectProps> = ({field, onSubmit, ...props}) => {
  const [selected, setSelected] = useState(field.response)
  const select_options = field.select_options.map((option) => {
    return {
      label: option,
      value: option,
      role: "",
    }
  })
  const submit = () => {
    onSubmit({...field, response: selected})
  }
  const onChange = (selections) => {
    setSelected(selections)
  }
  return (
    <>
      <CheckPicker
        value={selected}
        data={select_options}
        onChange={onChange}
        countable={false}
        placement="bottomEnd"
        onExit={submit}
        {...props}
      />
      {selected?.length === 0 && <div className="text-error">You must select at least one option</div>}
    </>
  )
}

const MultiSelectEdit = styled(MultiSelectEditRaw)`
  .rs-picker-toggle,
  .rs-picker-toggle.active {
    border-left-width: 1px;
  }
  .rs-picker-toggle.active {
    ${tw`mr-4`}
  }
`

const MultiSelect: React.FC<SelectProps> = ({field, view, onSubmit, ...props}) => {
  return (
    <>
      {view === "display" && (
        <MultiSelectDisplay value={field.response} />
      )}
      {view === "edit" && (
        <MultiSelectEdit
          field={field}
          onSubmit={onSubmit}
        />
      )}
    </>
  )
}

export {MultiSelect}
