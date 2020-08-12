import React, {useState} from "react"
import {CheckPicker} from "rsuite"
import styled from "styled-components"
import tw from "tailwind.macro"
import {TemplateFieldMultiSelect} from "models/interface"

const MultiSelectDisplay: React.FC<{value: string[]}> = ({value}) => {
  return <div>{value.join(', ')}</div>
}

interface MultiSelectEditProps {
  field: TemplateFieldMultiSelect
  onSubmit: (field: TemplateFieldMultiSelect) => void
}

export const MultiSelectEditRaw: React.FC<MultiSelectEditProps> = ({field, onSubmit, ...props}) => {
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
      {selected.length === 0 && <div className="text-error">You must select at least one option</div>}
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

interface MultiSelectProps {
  field: TemplateFieldMultiSelect
  view: string
  onSubmit: (field: TemplateFieldMultiSelect) => void
}

const MultiSelect: React.FC<MultiSelectProps> = ({field, view, onSubmit, ...props}) => {
  return (
    <>
      {view === "display" && (
        <MultiSelectDisplay value={field.response} {...props} />
      )}
      {view === "edit" && (
        <MultiSelectEdit
          field={field}
          onSubmit={onSubmit}
          {...props}
        />
      )}
    </>
  )
}

export {MultiSelectDisplay, MultiSelectEdit, MultiSelect}
