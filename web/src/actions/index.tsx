import React, { Component } from "react"
import SpendRequestForm from "./spendRequestForm"
import SpendRequestApproval from "./spendRequestApproval"
interface ActionStateProps {
  tagName: string
}

const Action: React.FC<ActionStateProps> = ({ tagName = "" }) => {
  let components = {}

  components["SpendRequestForm"] = SpendRequestForm
  components["SpendRequestApproval"] = SpendRequestApproval

  const TagName = components[tagName]
  return TagName ? <TagName /> : <></>
}

export default Action
