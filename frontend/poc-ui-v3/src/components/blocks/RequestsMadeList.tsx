import React, { useContext } from 'react'
import { RequestsMadeItem } from '../block/RequestsMadeItem'
import { useQuery } from '@apollo/client'
import { REQUESTS_MADE } from '../../operations/queries/requestsMade'
import { Context } from '../context/store'

export const RequestsMadeList = () => {
  const { state, dispatch } = useContext(Context)

  const { loading, error, data } = useQuery(REQUESTS_MADE, {
    variables: { userId: state.user.id },
  })

  if (loading) return <>Loading...</>
  if (error) return <>{`Error! ${error.message}`}</>

  return (
    <div>
      {data.children &&
        data.children.map((block) => (
          <RequestsMadeItem key={block.id} block={block} />
        ))}
    </div>
  )
}
