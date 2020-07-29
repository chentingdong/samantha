import React, { useState, useEffect } from "react"
import { Icon } from "rsuite"
import styled from "styled-components"
import { User } from "../models/interface"
import tw from "tailwind.macro"
import ChevronDown from "../assets/img/chevron-down.svg"

type TagPickerType = {
  value: User[]
  data: User[]
  className?: string
  onInsertTag?: (tag: User) => void
  onDeleteTag?: (tag: User) => void
}
const TagPickerRaw: React.FC<TagPickerType> = ({
  value,
  data,
  className,
  onInsertTag,
  onDeleteTag,
}) => {
  const [tags, setTags] = useState([])
  const [showSelect, setShowSelect] = useState(false)
  useEffect(() => {
    setTags(value)
  }, [value])

  const pickTags = (e, tag) => {
    let newTags = [...tags, tag]
    if (e.target.checked && !objInArr(tag, tags)) {
      newTags = [...tags, tag]
      setTags(newTags)
      onInsertTag(tag)
    } else if (!e.target.checked && objInArr(tag, tags)) {
      deleteTag(e, tag)
    }
  }

  const deleteTag = (e, tag) => {
    e.stopPropagation()
    const tmp = [...tags]
    tmp.splice(tags.indexOf(tag), 1)
    onDeleteTag(tag)
    setTags(tmp)
  }

  const toggleSelect = (e) => {
    setShowSelect(!showSelect)
  }

  const objInArr = (obj, arr) => {
    return arr.some((el) => el.id === obj.id)
  }

  return (
    <div className={`${className} rounded p-1`}>
      <div className="toggle-select" onClick={toggleSelect}>
        {tags?.length === 0 && <div className="p-1">click to select...</div>}
        {tags?.map((tag, index) => {
          return (
            <span key={index} className="inline-block w-auto p-1 rounded tag">
              <span className="m-1">{tag.name}</span>
              <Icon
                className="text-sm cursor-pointer"
                icon="close"
                onClick={(e) => deleteTag(e, tag)}
              />
            </span>
          )
        })}
        <div className="p-2 toggle">
          <Icon icon={ChevronDown} size="lg" />
        </div>
      </div>
      <div>
        {data?.map((tag) => {
          return (
            showSelect && (
              <div key={tag.id}>
                <input
                  type="checkbox"
                  className="inline-block cursor-pointer"
                  name={tag.name}
                  value={tag.id}
                  checked={objInArr(tag, tags)}
                  onChange={(e) => pickTags(e, tag)}
                />
                <label htmlFor={tag.name} className="inline-block m-1">
                  {tag.name}
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
  ${tw`px-3`}
  border-radius: 20px;
  line-height: 1.5rem;
  position: relative;
  border: 1px solid;
  color: var(--color-text-default);
  background: var(--color-bg-default);
  padding-right: 2em;
  .tag {
    color: var(--color-text-success);
    background-color: var(--color-bg-success);
    .close {
    }
  }
  .toggle {
    position: absolute;
    z-index: 50;
    right: 0.5em;
    top: 0.2em;
    cursor: pointer;
    .rs-icon {
      color: var(--color-bg-primary);
    }
  }
`

const TagPicker: React.FC<TagPickerType> = (props) => {
  return (
    <Styles>
      <TagPickerRaw {...props} />
    </Styles>
  )
}

export { TagPicker }
