import React from "react"
import FormBuilder from "react-form-builder2"
import "react-form-builder2/dist/app.css"
import { BlockCatalogItem } from "../tailwind/BlockCatalogItem"
import styled from "styled-components"

class TextArea2 extends React.Component {
  constructor(props) {
    super(props)
    this.inputField = React.createRef()
  }

  render() {
    return (
      <div className="SortableItem rfb-item form-control bg-black">
        <div className="form-group bg-blue">
          <input className="bg-blue" />
        </div>
      </div>
    )
  }
}

const FormBuilderRaw = () => {
  let items = [
    {
      key: "Header",
      name: "Header Text",
      icon: "fa fa-header",
      static: true,
      content: "some text...",
    },
    {
      key: "Paragraph",
      name: "Paragraph",
      static: true,
      icon: "fa fa-paragraph",
      content: "Placeholder Text...",
    },
    {
      key: "TextArea",
      name: "TextArea",
      static: true,
      icon: "fa fa-textarea",
      content: "placeholder",
    },
    {
      key: "Block",
      name: "Block",
      static: true,
      icon: "fa fa-textarea",
      content: { BlockCatalogItem },
    },
  ]

  return (
    <FormBuilder.ReactFormBuilder
      className="h-100"
      url="../../../data/form.json"
      toolbarItems={items}
      saveUrl="../../../data/form.json"
    />
  )
}

const Styles = styled.div.attrs({
  className: "rounded-t-md",
})`
  color: var(--color-text-default);
  background: var(--color-bg-default);
  .react-form-builder {
    .badge,
    .react-form-builder-preview {
      .form-control,
      .rfb-item {
        background: transparent;
      }
    }
    .react-form-builder-toolbar {
      color: var(--color-text-primary);
      background: var(--color-bg-primary);
      margin: 3em;
    }
  }
`

const FormBuilderDemo = ({ ...props }) => {
  return (
    <Styles>
      <FormBuilderRaw {...props} />
    </Styles>
  )
}
export { FormBuilderDemo }
