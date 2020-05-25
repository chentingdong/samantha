import React from "react"
import { FaBeer, FaTimes, FaApple, FaRunning } from "react-icons/fa"

const IconsDemo = () => {
  return (
    <div className="text-3xl">
      <FaBeer className="text-red-200 float-left mr-4" />
      <span className="btn mr-4 p-1 bg-gray-200 hover:bg-gray-500 float-left align-top">
        <FaTimes className="text-primary text-2xl" />
      </span>
      <FaApple className="text-green float-left mr-4" />
      <FaRunning className="text-success mr-4 rounded-full bg-gray-200 hover:bg-gray-700 cursor-pointer" />
    </div>
  )
}

export { IconsDemo }
