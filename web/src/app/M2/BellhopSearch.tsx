import React, { useState, useEffect } from "react"
import styled from "styled-components"
import IconBell from "../../assets/img/bell.svg"
import { NavLink, Link } from "react-router-dom"
import { BELLHOP_SEARCH } from "operations/queries/bellhopSearch"
import { BELL_SEARCH } from "operations/queries/bellSearch"
import { useLazyQuery } from "@apollo/client"

export interface BellSearchProps {}

const BellSearchRaw: React.FC<BellSearchProps> = ({ ...props }) => {
  const [show, setShow] = useState(false)
  const [value, setValue] = useState("")

  const [suggestions, setSuggestions] = useState({ bellhops: [], bells: [] })
  const [getBellhopData, { data: dataBellhops }] = useLazyQuery(
    BELLHOP_SEARCH,
    {
      fetchPolicy: "network-only",
    }
  )

  const [getBellData, { data: dataBells }] = useLazyQuery(BELL_SEARCH, {
    fetchPolicy: "network-only",
  })

  useEffect(() => {
    const newSuggestions = {
      bellhops: dataBellhops?.m2_bellhops,
      bells: dataBells?.m2_bells,
    }
    setSuggestions(newSuggestions)
  }, [dataBellhops, dataBells])

  const suggest = async (text) => {
    const variables = { variables: { search: `%${text}%` } }
    await getBellhopData(variables)
    await getBellData(variables)
  }

  const onChange = (e) => {
    const val = e.currentTarget.value
    suggest(val)
    setValue(val)
    setShow(val && val !== "")
  }

  return (
    <div
      {...props}
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
        <div className="absolute z-10 w-full p-4 bg-gray-200 border border-gray-200 rounded-lg shadow-xl menu">
          <div className="p-2 border-b-2 grid grid-cols-3">
            <div className="col-span-1">Bellhops</div>
            <div className="pl-4 border-l border-gray-500 col-span-2">
              {suggestions.bellhops?.map((bellhop) => {
                return (
                  <Link
                    to={`/all-bellhops/bellhops/${bellhop.id}`}
                    key={bellhop.id}
                  >
                    {bellhop.name}
                  </Link>
                )
              })}
              {suggestions.bellhops?.length === 0 && <i>Nothing found</i>}
            </div>
          </div>
          <div className="p-2 border-b-2 grid grid-cols-3">
            <div className="col-span-1">Bells</div>
            <div className="pl-4 border-l border-gray-500 col-span-2">
              {suggestions.bells?.map((bell) => {
                return (
                  <Link to={`/bells/${bell.id}`} key={bell.id}>
                    {bell.name}
                  </Link>
                )
              })}
              {suggestions.bells?.length === 0 && <i>Nothing found</i>}
            </div>
          </div>
          <div className="mt-4 text-lg text-center underline">
            <NavLink to="/all-bellhops">Company Bell Desk</NavLink>
          </div>
        </div>
      )}
    </div>
  )
}

const BellSearch = styled(BellSearchRaw)``

export { BellSearch }
