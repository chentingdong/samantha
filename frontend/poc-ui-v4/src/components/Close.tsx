import React, { useState } from "react"
import { Icon } from "rsuite"
import styled from "styled-components"

const Close = ({ className, onClick }) => {
  return (
    <Icon
      icon="close"
      className={`${className} p-1 ml-1 text-xs border rounded-full inline-block cursor-pointer`}
      onClick={onClick}
    />
  )
}

export { Close }
