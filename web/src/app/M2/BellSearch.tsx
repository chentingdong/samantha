import React, { useState } from "react"
import styled from "styled-components"
import tw from "tailwind.macro"
import { Dropdown, Icon } from "rsuite"

type BellSearchProps = {}

const BellSearchRaw: React.FC<BellSearchProps> = ({ ...props }) => {
  const [show, setShow] = useState(false)
  const [value, setValue] = useState("")
  const [suggestions, setSuggestions] = useState([
    "Finance",
    "Facilities",
    "Engineering",
  ])

  const suggest = (text) => {
    // TODO: suggest api
    const newSuggestions = suggestions
    setSuggestions(newSuggestions)
  }

  const onChange = (e) => {
    const val = e.currentTarget.value
    setValue(val)
    suggest(val)
    if (!val || val === "") setShow(false)
    else setShow(true)
  }

  return (
    <div className="bell-search w-1/3 mx-auto relative">
      <input
        type="text"
        value={value}
        onChange={onChange}
        onBlur={(e) => setShow(false)}
      />
      <Icon icon="search" className="absolute right-0 top-0 m-5 text-lg" />
      {show && (
        <div className="menu border border-dark rounded-lg p-2 absolute w-full bg-default z-10">
          {suggestions.map((suggestion, index) => {
            return <div key={index}>{suggestion}</div>
          })}
        </div>
      )}
    </div>
  )
}

const BellSearch = styled(BellSearchRaw)`
  width: 70%;
  margin: 0 auto;
  .bell-search {
    ${tw`border rounded-lg`}
  }
`

export { BellSearch }
