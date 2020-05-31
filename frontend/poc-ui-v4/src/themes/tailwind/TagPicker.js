import React, { useState } from "react"
import { Tag, TagGroup } from "rsuite"

const TagPicker = () => {
  const [tags, setTags] = useState(["a", "b"])
  const options = ["a", "b", "c"]

  const [showSelect, setShowSelect] = useState(false)
  const toggleShowSelect = () => {
    setShowSelect(!showSelect)
  }
  const addTag = (e, option) => {
    if (e.target.checked && tags.indexOf(option) === -1)
      setTags([...tags, option])
    else if (!e.target.checked && tags.indexOf(option) !== -1) {
      let newTags = [...tags]
      newTags.splice(newTags.indexOf(option), 1)
      setTags(newTags)
    }
  }
  return (
    <>
      <TagGroup className="p-2 border" onClick={toggleShowSelect}>
        {tags.map((tag) => {
          return <Tag closable>{tag}</Tag>
        })}
      </TagGroup>
      {options.map((option) => {
        return (
          showSelect && (
            <div>
              <input
                className="inline-block"
                type="checkbox"
                value={option}
                checked={tags.indexOf(option) > -1}
                onChange={(e) => addTag(e, option)}
              />
              <label className="inline-block m-1">{option}</label>
            </div>
          )
        )
      })}
    </>
  )
}

export { TagPicker }
