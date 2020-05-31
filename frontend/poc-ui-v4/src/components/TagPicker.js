import React, { useState } from "react"
import { Icon } from "rsuite"
import styled from "styled-components"
import { Close } from "./Close"

const TagPickerRaw = (props) => {
  const { value, options } = props
  const [tags, setTags] = useState(value)
  const [showSelect, setShowSelect] = useState(false)

  const pickTags = (e, option) => {
    if (e.target.checked && !objInArr(option, tags)) setTags([...tags, option])
    else if (!e.target.checked && objInArr(option, tags)) deleteTag(e, option)
  }

  const deleteTag = (e, tag) => {
    e.stopPropagation()
    let tmp = [...tags]
    tmp.splice(tags.indexOf(tag), 1)
    setTags(tmp)
  }

  const objInArr = (obj, arr) => {
    return arr.some((el) => el.value === obj.value)
  }

  return (
    <div>
      <div
        className="h-auto p-2 border rounded-md"
        onClick={(e) => {
          setShowSelect(false)
        }}
      >
        {tags?.map((tag, index) => {
          return (
            <span
              key={`${tag.label}-${index}`}
              className="tag p-1 ml-1 rounded-md inline-block w-auto"
            >
              <span className="mx-2">{tag.label}</span>
              <Close className="text-xs" onClick={(e) => deleteTag(e, tag)} />
            </span>
          )
        })}
        <div
          className="toggle p-2 m-1"
          onClick={(e) => {
            e.stopPropagation()
            setShowSelect(!showSelect)
          }}
        >
          <Icon icon="arrow-down" className=" mx-2 p-1" />
        </div>
      </div>
      {options?.map((option) => {
        return (
          showSelect && (
            <div key={option.value}>
              <input
                type="checkbox"
                className="inline-block"
                id={options.value}
                value={option.value}
                checked={objInArr(option, tags)}
                onChange={(e) => pickTags(e, option)}
              />
              <label htmlFor={options.value} className="inline-block m-1">
                {option.label}
              </label>
            </div>
          )
        )
      })}
    </div>
  )
}

const Styles = styled.div.attrs({})`
  position: relative;
  .toggle {
    color: var(--color-text-default);
    border-left: 1px solid var(--color-text-primary);
    cursor: pointer;
    position: absolute;
    right: 0;
    top: 0;
    &:hover {
      var(--color-text-primary);
    }
  }
  .tag {
    background-color: var(--color-bg-default);
    .close {
      border-color: var(--color-text-primary);
    }
  }
`

const TagPicker = (props) => {
  return (
    <Styles>
      <TagPickerRaw {...props} />
    </Styles>
  )
}

export { TagPicker }
