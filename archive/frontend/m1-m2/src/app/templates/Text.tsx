import React from "react"
import { TemplateFieldText } from "models/interface"
import { useForm } from "react-hook-form"

const TextDisplay: React.FC<{ text: string | number }> = ({ text }) => {
  return <span>{text}</span>
}

interface TextEditProps {
  field: TemplateFieldText
  onSubmit: (field: TemplateFieldText) => void
}
const TextEdit: React.FC<TextEditProps> = ({ field, onSubmit, ...props }) => {
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
        type="text"
        className="w-auto px-2 py-1 border rounded-full"
        onBlur={submit}
        autoComplete="off"
        ref={register({
          required: !field.optional,
          minLength: field.min_field_size,
          maxLength: field.max_field_size,
        })}
      />
      <div className="text-error">
        {errors.response?.type === "required" && "Field is required"}
        {errors.response?.type === "maxLength" &&
          "Maximum characters of this field is " + field.max_field_size}
        {errors.response?.type === "minLength" &&
          "Minimum characters of this field is " + field.min_field_size}
      </div>
    </form>
  )
}

interface TextProps {
  field: TemplateFieldText
  view: string
  onSubmit: (field: TemplateFieldText) => void
}

const Text: React.FC<TextProps> = ({ field, view, onSubmit, ...props }) => {
  return (
    <>
      {view === "display" && <TextDisplay text={field.response} {...props} />}
      {view === "edit" && (
        <TextEdit field={field} onSubmit={onSubmit} {...props} />
      )}
    </>
  )
}

export { Text }
