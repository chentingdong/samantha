import React, { useState, useEffect } from "react"
import { useQuery } from "@apollo/client"
import { BLOCKS_BY_PK } from "../operations/queries/blockByPk"
import { useForm } from "react-hook-form"

function EditBlock({ blockId }) {
  const { data, loading, error, fetchMore } = useQuery(BLOCKS_BY_PK, {
    variables: { id: blockId },
  })
  console.log(data)
  const { register, getValues } = useForm({
    defaultValues: data.blocks[0],
  })

  useEffect(() => {
    fetchMore({
      variables: { id: blockId },
      updateQuery: (prev, { fetchMoreResult, ...rest }) => {
        if (!fetchMoreResult) return prev
        return fetchMoreResult
      },
    })
  }, [blockId])

  const submit = () => {
    const updatedForm = getValues()
    console.log(updatedForm)
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          <label className="block">Bell name</label>
          <input
            name="name"
            ref={register({ required: true, maxLength: 100 })}
            onChange={submit}
            type="text"
          />
        </div>
        <div>
          <label className="block">Bell description</label>
          <input
            name="description"
            ref={register({ required: true, maxLength: 100 })}
            onChange={submit}
            type="text"
          />
        </div>
      </form>
    </div>
  )
}

export default EditBlock
