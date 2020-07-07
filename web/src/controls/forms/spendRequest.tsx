import React from "react"
import styled from "styled-components"
import tw from "tailwind.macro"
import { useForm } from "react-hook-form"
import { Button } from "../../components/Button"

const SpendRequestRaw: React.FC<{
  onSubmit: (form) => void
  onSuccess: () => void
  onFailure: () => void
  form: object
}> = ({ onSubmit, onSuccess, onFailure, form = {} }) => {
  const { register, getValues } = useForm({
    defaultValues: form,
  })

  const submit = () => {
    const updatedForm = getValues()
    onSubmit(updatedForm)
  }

  return (
    <form onSubmit={submit}>
      <div>
        <label className="block">Form name</label>
        <input
          name="name"
          ref={register({ required: true, maxLength: 100 })}
          onChange={submit}
          type="text"
        />
      </div>
      <div>
        <label className="block">Description</label>
        <input
          name="discription"
          ref={register({ required: true, maxLength: 500 })}
          onChange={submit}
          type="text"
        />
      </div>
      <div>
        <label className="block">Spend</label>
        <input
          name="spend"
          ref={register({ min: 0.0, max: 10000.0 })}
          onChange={submit}
          type="number"
        />
      </div>
      <div>
        <label className="block">Revenue</label>
        <input
          name="revenue"
          ref={register({ min: 0.0, max: 10000.0 })}
          onChange={submit}
          type="number"
        />
      </div>
      <div>
        <Button
          name="success"
          variant="primary"
          fill={false}
          onClick={(e) => {
            e.preventDefault()
            onSuccess()
          }}
        >
          Submit
        </Button>
      </div>
    </form>
  )
}

const SpendRequest = styled(SpendRequestRaw)`
  & {
    div {
      ${tw`my-4`}
    }
  }
`

export default SpendRequest
