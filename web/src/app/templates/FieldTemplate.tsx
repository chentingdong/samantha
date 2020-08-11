import * as React from "react"
import { Text } from "app/templates/Text"
import { MultiSelect } from "app/templates/MultiSelect"
import { ExternalLink } from "app/templates/ExternalLink"
import { SingleSelect } from "app/templates/SingleSelect"

interface FieldTemplateProps {
  field: any
  view: "display" | "edit"
}

export const FieldTemplate: React.FC<FieldTemplateProps> = ({
  field,
  view,
  ...props
}) => {
  const templates = {
    Text: Text,
    Decimal: Text,
    SingleSelect: SingleSelect,
    MultiSelect: MultiSelect,
    ExternalLink: ExternalLink,
  }
  const Template = templates[field.response_type]

  return <Template field={field} view={view} {...props} />
}
