import React from 'react'
import { Context } from '../context/store'

export const OptionsUsers = () => {
  const { state, dispatch } = React.useContext(Context)
  return (
    <>
      {state.users.map((user) => {
        return (
          <option value={user.id} key={user.id}>
            {user.attributes.name}
          </option>
        )
      })}
    </>
  )
}
