import * as React from "react"
import { ResponseFieldProps } from "app/templates/ResponseFieldProps"
import { Button } from "components/Button"

interface ExternalLinkProps {
  title: string
  url: string
}

const ExternalLinkDisplay: React.FC<ExternalLinkProps> = ({ title, url }) => {
  console.log(title, url)
  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      {title}
    </a>
  )
}

const ExternalLinkEdit: React.FC<ExternalLinkProps> = ({
  title,
  url,
  ...props
}) => {
  const onClick = () => {
    //TODO: submit field change here
    console.log("TODO: submit task with field value")
  }
  return (
    <div {...props}>
      <a className="block" href={url} target="_blank" rel="noopener noreferrer">
        {title}
      </a>
      <Button color="secondary" className="mr-0 text-sm fill" onClick={onClick}>
        Mark as completed
      </Button>
    </div>
  )
}

export const ExternalLink: React.FC<ResponseFieldProps> = ({
  field,
  view,
  ...props
}) => {
  return (
    <>
      {view === "display" && (
        <ExternalLinkDisplay
          title={field?.response.title}
          url={field?.response.url}
          {...props}
        />
      )}
      {view === "edit" && (
        <ExternalLinkEdit
          title={field.response.title}
          url={field.response.url}
          {...props}
        />
      )}
    </>
  )
}
