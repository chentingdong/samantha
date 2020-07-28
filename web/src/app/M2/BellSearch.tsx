import React, { useState } from "react"
import styled from "styled-components"
import IconBell from "../../assets/img/bell.svg"
import { NavLink } from "react-router-dom"

export interface BellSearchProps {}

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
    <div
      className="container relative px-4 mx-auto md:w-1/2 lg:w-1/3"
      onClick={(e) => setShow(false)}
    >
      <input
        type="text"
        value={value}
        onChange={onChange}
        className="w-full border border-gray-800"
        placeholder="Quick Start Bell"
      />
      <img src={IconBell} className="absolute top-0 right-0 h-4 mx-8 my-5" />
      {show && (
        <div className="absolute z-10 w-full p-4 bg-gray-100 border border-gray-100 rounded-lg shadow-xl menu">
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
            <NavLink to="/company-bell-desk">Company Bell Desk</NavLink>
          </div>
        </div>
      )}
    </div>
  )
}

const BellSearch = styled(BellSearchRaw)``

export { BellSearch }
