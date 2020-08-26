import "quill/dist/quill.snow.css"

import React from "react"
import styled from "styled-components"
import tw from "tailwind.macro"
import { useQuill } from "react-quilljs"

interface MessageEditorProps {
  onSave: (content) => void
}

const MessageEditorRaw: React.FC<MessageEditorProps> = ({
  onSave,
  ...props
}) => {
  const { quill, quillRef } = useQuill({
    modules: {
      toolbar: "#toolbar",
    },
    formats: ["size", "bold", "italic", "underline", "strike", "code-block"],
  })

  const insertToEditor = (url) => {
    const range = quill.getSelection()
    quill.insertEmbed(range.index, "image", url)
  }

  return (
    <div {...props}>
      <div ref={quillRef} />
      <div id="toolbar" className="border-t-0">
        <button className="ql-bold" />
        <button className="ql-italic" value="italic" />
        <button className="ql-strike" value="strike" />
        <button className="ql-underline" value="underline" />
        <button className="ql-code-block" value="code-block" />
      </div>
      <div id="editor" />
    </div>
  )
}

const MessageEditor = styled(MessageEditorRaw)`
  .ql-snow .ql-editor pre.ql-syntax {
    ${tw`bg-gray-300 text-gray-900 overflow-visible`}
  }
`

export { MessageEditor }
