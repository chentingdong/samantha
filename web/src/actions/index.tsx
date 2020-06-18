import React, { Component } from "react"
import SpendRequestForm from "./spendRequestForm"

interface ActionStateProps {
  tagName: string
}

const Action: React.FC<ActionStateProps> = ({ tagName = "" }) => {
  const components = {
    SpendRequestForm: SpendRequestForm,
  }

  return components[tagName] ? components[tagName] : <></>
}

export default Action
