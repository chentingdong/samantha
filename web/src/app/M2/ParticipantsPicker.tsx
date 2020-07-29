import React, { useState, useEffect } from "react"
import ClickOutHandler from "react-onclickout"
import { Icon } from "rsuite"
import { User } from "models/interface"
import { userInitials } from "utils/user"
import { Button } from "components/Button"
import styled from "styled-components"
import tw from "tailwind.macro"

interface ParticipantsPickerProps {
  participants: User[]
  users: User[]
  className?: string
  onInsertTag?: (tag: User) => void
  onDeleteTag?: (tag: User) => void
}
const ParticipantsPickerRaw: React.FC<ParticipantsPickerProps> = ({
  participants,
  users,
  className,
  onInsertTag,
  onDeleteTag,
}) => {
  const [tags, setTags] = useState([])
  const [showSelect, setShowSelect] = useState(false)
  useEffect(() => {
    setTags(participants)
  }, [participants])

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

  const onClickOut = (e) => {
    setShowSelect(false)
  }

  const objInArr = (obj, arr) => {
    return arr.some((el) => el.id === obj.id)
  }

  return (
    <ClickOutHandler onClickOut={onClickOut}>
      <div className={`${className} flex`}>
        {tags?.length === 0 && <div className="p-1">click to select...</div>}
        {tags?.map((tag, index) => {
          return (
            <div key={index} className="tag">
              <div className="inner">
                <span className="m-1">{userInitials(tag)}</span>
                <Icon
                  className="close"
                  icon="close"
                  onClick={(e) => deleteTag(e, tag)}
                />
              </div>
            </div>
          )
        })}
        <Button
          className="w-8 h-8 add-tag circle"
          color="primary"
          onClick={toggleSelect}
        >
          <Icon icon="plus" />
        </Button>
      </div>
      {showSelect && (
        <div className="users">
          {users?.map((tag) => {
            return (
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
          })}
        </div>
      )}
    </ClickOutHandler>
  )
}

const ParticipantsPicker = styled(ParticipantsPickerRaw)`
  ${tw`relative my-2`}
  line-height: 2rem;
  .tag {
    ${tw`relative mx-1 cursor-pointer font-bold`}
    font-size: 1rem;
    .inner {
      ${tw`m-1 w-8 h-8 content-center text-center`}
      ${tw`text-white bg-purple-500 rounded-full`}
      .close {
        ${tw`absolute top-0 right-0 w-4 h-4 p-1 `}
        ${tw`content-center text-center font-bold text-purple-800`}
        ${tw`cursor-pointer bg-gray-500 shadow rounded-full`}
        font-size: 0.5rem;
        display: None;
      }
      :hover .close {
        display: block;
      }
    }
  }
  .add-tag {
    &, &:hover {
      ${tw`mx-2 my-1`}
      .rs-icon {
        font-size: 1rem;
      }
    }
    &:active {
      opacity: 0.5;
      transition: opacity 0.5 liner;
    }
  }
  .users {
    ${tw`bg-white shadow-lg w-full p-4`}
  }
`

export { ParticipantsPicker }
