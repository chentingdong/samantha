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

  const { register, errors, getValues, reset } = useForm({
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: block,
    resolver: undefined,
    context: undefined,
    criteriaMode: "firstErrorDetected",
    shouldFocusError: true,
    shouldUnregister: true,
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
    updateOneBlock({
      variables: {
        id: blockId,
        data: updatedForm,
      },
    })
  }

  return (
    <div>
      <form onSubmit={submit} className="mb-4">
        <h2>Block</h2>
        <div className="m-2">
          <label className="block">Block name</label>
          <input
            name="name"
            ref={register({ required: true, minLength: 5, maxLength: 100 })}
            onBlur={submit}
            type="text"
          />
          {/* TODO: ErrorMessage component */}
          {errors.name && (
            <span className="text-error">This field is required</span>
          )}
        </div>
        <div className="m-2">
          <label className="block">Block description</label>
          <input
            name="description"
            ref={register({ required: true })}
            onBlur={submit}
            type="text"
          />
          {errors.name && (
            <span className="text-error">This field is required</span>
          )}
        </div>
      </form>
      <div className="m-2">
        <Assignment block={block} setBlock={setBlock} />
      </div>
      {block?.blockType?.category === "Action" && (
        <>
          <h4>Action</h4>
          <Action block={block} setBlock={setBlock} />
        </>
      )}
    </div>
  )
}

export { EditBlock }
