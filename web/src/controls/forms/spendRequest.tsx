import React from "react"
import styled from "styled-components"
import tw from "tailwind.macro"
import { useForm } from "react-hook-form"
import { Button } from "../../components/Button"
import { FormValidationMessage } from "components/FormValidationMessage"

const SpendRequestRaw: React.FC<{
  onSubmit: (form) => void
  onSuccess: () => void
  onFailure: () => void
  form: object
}> = ({ onSubmit, onSuccess, onFailure, form = {} }) => {
  const { register, errors, getValues } = useForm({
    mode: "onBlur",
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
          ref={register({
            required: "Name is required",
            minLength: 5,
            maxLength: 100,
          })}
          onBlur={submit}
          type="text"
        />
        <FormValidationMessage errors={errors} name="name" />
      </div>
      <div>
        <label className="block">Description</label>
        <input
          name="discription"
          ref={register({
            required: "Description required",
            minLength: 10,
            maxLength: 500,
          })}
          onBlur={submit}
          type="text"
        />
        <FormValidationMessage errors={errors} name="description" />
      </div>
      <div>
        <label className="block">Spend</label>
        <input
          name="spend"
          ref={register({
            min: {
              value: 0.0,
              message: "spend must be positive numbers",
            },
            max: {
              value: 10000.0,
              message: "spend exceeded maximum number of 10000.0",
            },
          })}
          onBlur={submit}
          type="number"
        />
        <FormValidationMessage errors={errors} name="spend" />
      </div>
      <div>
        <label className="block">Revenue</label>
        <input
          name="revenue"
          ref={register({
            min: {
              value: 0.0,
              message: "spend must be positive numbers",
            },
            max: {
              value: 10000.0,
              message: "spend exceeded maximum number of 10000.0",
            },
          })}
          onBlur={submit}
          type="number"
        />
        <FormValidationMessage errors={errors} name="revenue" />
      </div>
      <div>
        <Button
          color="bg-primary"
          fill={true}
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

const SpendRequest = styled(SpendRequestRaw)``

export default SpendRequest
