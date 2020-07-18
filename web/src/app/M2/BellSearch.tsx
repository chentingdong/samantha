import React, { useState } from "react"
import styled from "styled-components"
import tw from "tailwind.macro"
import IconBell from "../../assets/img/bell.svg"
type BellSearchProps = { unknown }

const BellSearchRaw: React.FC<BellSearchProps> = ({ ...props }) => {
  const [show, setShow] = useState(false)
  const [value, setValue] = useState("")
  const [suggestions, setSuggestions] = useState({
    bellhops: ["Finance", "Facilities", "Engineering"],
    bells: ["bell 1", "bell 2"],
  })

  const suggest = (text) => {
    // TODO: suggest api
    // quick solution: hasura query name ilike tracks block table
    // good solution: solar pipeline indexing bell names
    const newSuggestions = {
      bellhops: ["Finance", "Facilities"],
      bells: ["bell 1", "bell 2"],
    }
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
    <div className="relative w-1/3 mx-auto bell-search">
      <input
        type="text"
        value={value}
        onChange={onChange}
        onBlur={(e) => setShow(false)}
        placeholder="Quick Start Bell"
      />
      <img src={IconBell} className="absolute top-0 right-0 h-4 m-5" />
      {show && (
        <div className="absolute z-10 w-full p-4 border rounded-lg shadow-xl menu border-dark bg-default">
          <div className="p-2 border-b-2 grid grid-cols-3">
            <div className="col-span-1">Bellhops</div>
            <div className="col-span-2">
              {suggestions.bellhops.map((bellhop, index) => {
                return <div key={`bellhop-${index}`}>{bellhop}</div>
              })}
            </div>
          </div>
          <div className="p-2 border-b-2 grid grid-cols-3">
            <div className="col-span-1">Bells</div>
            <div className="col-span-2">
              {suggestions.bells.map((bell, index) => {
                return <div key={`bell-${index}`}>{bell}</div>
              })}
            </div>
          </div>
          <div className="mt-4 text-lg text-center underline">
            <a href="">Visit Company Bell Desk</a>
          </div>
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
