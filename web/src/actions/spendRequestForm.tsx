import React from "react"
import styled from "styled-components"
import tw from "tailwind.macro"
import { useForm } from "react-hook-form"

const SpendRequestFormRaw: React.FC<{
  onSubmit: (form) => void
  form: object
}> = ({ onSubmit, form = {} }) => {
  const { register, getValues } = useForm({
    mode: "onChange",
    defaultValues: form,
  })

  const submit = () => {
    const form = getValues()
    onSubmit(form)
  }

  return (
    <form onSubmit={submit}>
      <div>
        <label className="block">Form name</label>
        <input
          name="name"
          ref={register({ required: true, maxLength: 100 })}
          type="text"
        />
      </div>
      <div>
        <label className="block">Description</label>
        <input
          name="discription"
          ref={register({ required: true, maxLength: 500 })}
          type="text"
        />
      </div>
      <div>
        <label className="block">Spend</label>
        <input
          name="spend"
          ref={register({ min: 0.0, max: 10000.0 })}
          type="number"
        />
      </div>
      <div>
        <label className="block">Revenue</label>
        <input
          name="revenue"
          ref={register({ min: 0.0, max: 10000.0 })}
          type="number"
        />
      </div>
    </form>
  )
}

const SpendRequestForm = styled(SpendRequestFormRaw)`
  & {
    div {
      ${tw`my-4`}
    }
  }
`

export { SpendRequestForm }
