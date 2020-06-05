import React, { useState } from "react"
import { Icon } from "rsuite"
import styled from "styled-components"
import { User } from "../models/interface"

type TagPickerType = {
  value: User[]
  data: User[]
  onChange: (option: User[]) => void
  onBlur?: () => void
}
const TagPickerRaw: React.FC<TagPickerType> = ({ value, data, onChange }) => {
  const [tags, setTags] = useState(value)
  const [showSelect, setShowSelect] = useState(false)

  const pickTags = (e, option) => {
    if (e.target.checked && !objInArr(option, tags)) setTags([...tags, option])
    else if (!e.target.checked && objInArr(option, tags)) deleteTag(e, option)
    onChange([option])
  }

  const deleteTag = (e, tag) => {
    e.stopPropagation()
    let tmp = [...tags]
    tmp.splice(tags.indexOf(tag), 1)
    setTags(tmp)
  }

  const objInArr = (obj, arr) => {
    return arr.some((el) => el.id === obj.id)
  }

  return (
    <div className="rounded p-1 text-sm">
      <div
        onClick={(e) => {
          e.stopPropagation()
          setShowSelect(!showSelect)
        }}
      >
        {tags.length === 0 && <span>click to select...</span>}
        {tags?.map((tag, index) => {
          return (
            <span key={index} className="tag inline-block w-auto text-xs">
              <span className="m-1">{tag.name}</span>
              <Icon
                className="text-xs cursor-pointer"
                icon="close"
                onClick={(e) => deleteTag(e, tag)}
              />
            </span>
          )
        })}
        <div className="toggle p-1 pl-2 m-1">
          <Icon icon="arrow-down" className="" />
        </div>
      </div>
      <div className="">
        {data?.map((option) => {
          return (
            showSelect && (
              <div key={option.id}>
                <input
                  type="checkbox"
                  className="inline-block cursor-pointer"
                  id={option.id}
                  value={option.id}
                  checked={objInArr(option, tags)}
                  onChange={(e) => pickTags(e, option)}
                />
                <label htmlFor={option.name} className="inline-block m-1">
                  {option.name}
                </label>
              </div>
            )
          )
        })}
      </div>
    </div>
  )
}

const Styles = styled.div.attrs({})`
  position: relative;
  border: 1px solid;
  border-radius: 5px;
  background: var(--color-bg-secondary);
  min-height: 2.5em;
  .tag {
    padding: 0.25em;
    margin: 0.12em;
    background-color: var(--color-bg-default);
    .close {
      border-color: var(--color-text-default);
    }
  }
  .toggle {
    color: var(--color-text-primary);
    border-left: 1px solid;
    position: absolute;
    right: 0;
    top: 0;
    cursor: pointer;
    &:hover {
      var(--color-text-primary);
    }
  }
`

const TagPicker: React.FC<TagPickerType> = (props) => {
  // use react HOC to pass on props to Raw component
  return (
    <Styles>
      <TagPickerRaw {...props} />
    </Styles>
  )
}

export { TagPicker }
