import React, { useState } from "react"
import TagsInput from "react-tagsinput"
import "react-tagsinput/react-tagsinput.css" // If using WebPack and style-loader.

const Tag = () => {
  const [tags, setTags] = useState([1, 2])

  const handleChange = (newTags) => {
    setTags(newTags)
  }

  return <TagsInput value={tags} onChange={(tags) => handleChange(tags)} />
}

export { Tag }
