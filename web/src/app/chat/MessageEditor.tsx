import "quill/dist/quill.snow.css"

import React, { useRef, useState } from "react"

import ReactQuill from "react-quill"
import styled from "styled-components"
import tw from "tailwind.macro"

interface MessageEditorProps {
  onSave: (content) => void
}

const MessageEditorRaw: React.FC<MessageEditorProps> = ({
  onSave,
  ...props
}) => {
  const [content, setContent] = useState("")
  const reactQuillRef = useRef()

  const updateContent = (data, delta, source, editor) => {
    setContent(editor.getHTML())
  }

  const onKeyDown = async (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      await onSave(cleanHtml(content))
      setContent("")
    }
  }

  const cleanHtml = (content) => {
    return content.replace("<p><br></p>", "")
  }

  const modules = {
    toolbar: {
      container: "#toolbar",
    },
  }
  return (
    <div {...props}>
      <div>
        <ReactQuill
          theme="snow"
          ref={reactQuillRef}
          value={content}
          onChange={updateContent}
          onKeyDown={onKeyDown}
          modules={modules}
        />
      </div>
      <div id="toolbar" className="border-t-0">
        <button className="ql-bold" />
        <button className="ql-italic" value="italic" />
        <button className="ql-strike" value="strike" />
        <button className="ql-underline" value="underline" />
        <button className="ql-code-block" value="code-block" />
      </div>
    </div>
  )
}

const MessageEditor = styled(MessageEditorRaw)`
  .ql-snow .ql-editor pre.ql-syntax {
    ${tw`bg-gray-300 text-gray-900 overflow-visible`}
  }
  #toolbar button {
    ${tw`m-0 p-0 shadow w-4 h-4 m-2 bg-yellow-100`}
    border-radius: 50%;
    min-width: 0;
    overflow: hidden;
  }
`

export { MessageEditor }
