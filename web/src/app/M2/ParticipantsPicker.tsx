import React, { useState, useEffect } from "react"
import ClickOutHandler from "react-onclickout"
import { Icon } from "rsuite"
import { User } from "models/interface"
import { userInitials } from "utils/user"
import { Button } from "components/Button"
import styled from "styled-components"
import tw from "tailwind.macro"

interface ParticipantsPickerProps {
  pickedUsers: User[]
  users: User[]
  className?: string
  onInsertUser?: (user: User) => void
  onDeleteUser?: (user: User) => void
}
const ParticipantsPickerRaw: React.FC<ParticipantsPickerProps> = ({
  pickedUsers,
  users,
  onInsertUser,
  onDeleteUser,
  ...props
}) => {
  const [showSelect, setShowSelect] = useState(false)
  const [selections, setSelections] = useState(pickedUsers)

  const selectUser = (e, user) => {
    if (e.target.checked && !objInArr(user, selections)) {
      addUser(user)
    } else if (!e.target.checked && objInArr(user, selections)) {
      removeUser(e, user)
    }
  }

  const addUser = (user) => {
    const updatedSelections = [...selections, user]
    setSelections(updatedSelections)
    onInsertUser(selections)
  }

  const removeUser = (e, user) => {
    const idx = selections.indexOf(user)
    const updatedSelections = [...selections]
    updatedSelections.splice(idx, 1)
    setSelections(updatedSelections)
    onDeleteUser(user)
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
      <div {...props}>
        <div className="flex">
          {selections?.map((user, index) => {
            return (
              <div key={index} className="user">
                <div className="circle bg-secondary">
                  <span className="m-1">{userInitials(user)}</span>
                  <Icon
                    className="close"
                    icon="close"
                    onClick={(e) => removeUser(e, user)}
                  />
                </div>
              </div>
            )
          })}
          <Button
            className="w-8 h-8 add-user circle"
            color="primary"
            onClick={toggleSelect}
          >
            <Icon icon="plus" />
          </Button>
        </div>
        {showSelect && (
          <div className="users">
            {users?.map((user) => {
              return (
                <div key={user.id}>
                  <input
                    type="checkbox"
                    className="inline-block cursor-pointer"
                    name={user.name}
                    value={user.id}
                    checked={objInArr(user, selections)}
                    onChange={(e) => selectUser(e, user)}
                  />
                  <label htmlFor={user.name} className="inline-block m-1">
                    {user.name}
                  </label>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </ClickOutHandler>
  )
}

const ParticipantsPicker = styled(ParticipantsPickerRaw)`
  ${tw`relative`}
  line-height: 2rem;
  .user {
    ${tw`relative mx-1 cursor-pointer`}
    .circle {
      ${tw`m-1 w-8 h-8 content-center text-center`}
      ${tw`text-white text-sm rounded-full`}
      .close {
        ${tw`absolute top-0 right-0 w-4 h-4 p-2`}
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
  .add-user {
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
    ${tw`bg-white shadow-lg w-full p-2`}
  }
`

export { ParticipantsPicker }
