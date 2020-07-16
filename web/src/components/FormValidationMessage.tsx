import React from "react"
import { ErrorMessage } from "@hookform/error-message"
import styled from "styled-components"

type FormValidationMessageType = {
  errors?: unknown
  name: string
}
const FormValidationMessage: React.FC<FormValidationMessageType> = ({
  errors,
  name,
}) => {
  return (
    <>
      {errors && (
        <ErrorMessage
          errors={errors}
          name={name}
          render={({ message }) => (
            <div className="text-error p-2">{message}</div>
          )}
        />
      )}
    </>
  )
}

export { FormValidationMessage }
