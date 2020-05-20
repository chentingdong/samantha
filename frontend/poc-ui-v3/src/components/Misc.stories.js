
import React from "react"
import { Loading, Error } from "./Misc"

export default {
  title: "Misc",
}

export const loading = () => <Loading/>
export const error = () => <Error message="Something's wrong"/>
