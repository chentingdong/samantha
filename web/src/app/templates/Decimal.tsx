import React from "react"
import { TemplateFieldDecimal } from "models/interface"
import { useForm } from "react-hook-form"

const DecimalDisplay: React.FC<{ Decimal: string }> = ({ Decimal }) => {
  return <span>{Decimal}</span>
}

interface DecimalEditProps {
  field: TemplateFieldDecimal
  onSubmit: (field: TemplateFieldDecimal) => void
}
const DecimalEdit: React.FC<DecimalEditProps> = ({
  field,
  onSubmit,
  ...props
}) => {
  const { register, errors, getValues, reset } = useForm({
    defaultValues: field,
    mode: "onChange",
    reValidateMode: "onChange",
  })

  const submit = () => {
    if (errors.response) return
    const formData = getValues()
    onSubmit({ ...field, ...formData })
  }

  return (
    <form onSubmit={submit} {...props}>
      <input
        name="response"
        type="number"
        className="w-auto px-2 py-1 border rounded-full"
        onBlur={submit}
        ref={register({
          required: !field.optional,
          min: field.min_value,
          max: field.max_value,
        })}
      />
      <div className="text-error">
        {errors.response?.type === "required" && "Field is required"}
        {errors.response?.type === "max" &&
          "Number exceeds maximum value of: " + field.max_value}
        {errors.response?.type === "min" &&
          "Number is smaller than minimum value of: " + field.min_value}
      </div>
    </form>
  )
}

interface DecimalProps {
  field: TemplateFieldDecimal
  view: string
  onSubmit: (field: TemplateFieldDecimal) => void
}

const Decimal: React.FC<DecimalProps> = ({
  field,
  view,
  onSubmit,
  ...props
}) => {
  return (
    <>
      {view === "display" && (
        <DecimalDisplay Decimal={field.response} {...props} />
      )}
      {view === "edit" && (
        <DecimalEdit field={field} onSubmit={onSubmit} {...props} />
      )}
    </>
  )
}

export { Decimal }
