import React, { useState, useEffect } from "react"
import { useLazyQuery, useMutation } from "@apollo/client"
import { BLOCKS_BY_PK } from "../operations/queries/blockByPk"
import { useForm } from "react-hook-form"
import { UPDATE_ONE_BLOCK } from "../operations/mutations/updateOneBlock"
import { Action } from "../controls/Action"
import { initialBlock } from "../../data/initialBlock"
import { Assignment } from "./Assignment"

function EditBlock({ blockId }) {
  const [block, setBlock] = useState(initialBlock)
  const [getData, { data }] = useLazyQuery(BLOCKS_BY_PK)
  const [updateOneBlock] = useMutation(UPDATE_ONE_BLOCK)

  const { register, getValues, reset } = useForm({
    defaultValues: block,
  })

  useEffect(() => {
    getData({ variables: { id: blockId } })
  }, [blockId])

  useEffect(() => {
    if (data && data.blocks) {
      setBlock(data.blocks[0])
      reset(data.blocks[0])
    }
  }, [data])

  const submit = () => {
    const updatedForm = getValues()
    console.log(updatedForm)
    updateOneBlock({
      variables: {
        id: blockId,
        data: updatedForm,
      },
    })
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
      <div>
        <Assignment block={block} setBlock={setBlock} />
      </div>
      {block?.blockType?.category === "Action" && (
        <>
          <h3>Action</h3>
          <Action block={block} setBlock={setBlock} />
        </>
      )}
    </div>
  )
}

export default EditBlock
