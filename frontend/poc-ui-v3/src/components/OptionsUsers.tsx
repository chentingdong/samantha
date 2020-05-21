import React from "react"
import { useQuery } from "@apollo/client"
import { GET_USERS } from "../operations/queries/getUsers"

const OptionsUsers = () => {
  const {
    data: { users },
  } = useQuery(GET_USERS)
  return (
    <>
      {users.map((user) => {
        return (
          <option value={user.id} key={user.id}>
            {user.name}
          </option>
        )
      })}
    </>
  )
}

export { OptionsUsers }
