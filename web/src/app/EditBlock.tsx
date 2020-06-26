import React, { useState, useEffect } from "react"
import { useQuery, useLazyQuery } from "@apollo/client"
import { BLOCKS_BY_PK } from "../operations/queries/blockByPk"
import { useForm } from "react-hook-form"

function EditBlock({ blockId }) {
  const [block, setBlock] = useState({})
  const [getData, { data, loading }] = useLazyQuery(BLOCKS_BY_PK)
  const { register, getValues, reset } = useForm({
    defaultValues: block,
  })

  useEffect(() => {
    getData({ variables: { id: blockId } })
    if (data) setBlock(data.blocks[0])
    console.log(block)
    reset(block)
  }, [blockId])

  const submit = () => {
    // const updatedForm = getValues()
    // console.log(updatedForm)
  }

  if (loading) return <p>Loading ...</p>
  return (
    <div>
      {data && (
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
      )}
    </div>
  )
}

export default EditBlock
