// import {
//   Editor,
//   EditorState,
//   KeyBindingUtil,
//   RichUtils,
//   getDefaultKeyBinding,
// } from "draft-js"
// import React, { useState } from "react"

// interface MessageEditorProps {
//   onSave: (content) => void
// }
// const MessageEditor: React.FC<MessageEditorProps> = ({ onSave, ...props }) => {
//   const [editorState, setEditorState] = React.useState(() =>
//     EditorState.createEmpty()
//   )

//   const contentState = editorState.getCurrentContent()

//   const onChange = (editorState) => {
//     setEditorState(editorState)
//   }

//   const handleKeyCommand = async (command) => {
//     if (command === "myeditor-save") {
//       const content = contentState.getPlainText()
//       await onSave(content)
//       setEditorState(EditorState.createEmpty())
//       return "handled"
//     }
//     const newState = RichUtils.handleKeyCommand(editorState, command)
//     if (newState) {
//       onChange(newState)
//       return "handled"
//     }
//     return "not-handled"
//   }

//   const onUnderlineClick = (e) => {
//     e.preventDefault()
//     onChange(RichUtils.toggleInlineStyle(editorState, "UNDERLINE"))
//   }

//   const onBoldClick = (e) => {
//     e.preventDefault()
//     onChange(RichUtils.toggleInlineStyle(editorState, "BOLD"))
//   }

//   const onItalicClick = (e) => {
//     e.preventDefault()
//     onChange(RichUtils.toggleInlineStyle(editorState, "ITALIC"))
//   }

//   const myKeyBindingFn = (e): string => {
//     if (e.keyCode === 13 /* `Enter` key */) {
//       return "myeditor-save"
//     }
//     return getDefaultKeyBinding(e)
//   }

//   return (
//     <div {...props}>
//       <div className="p-2 editor">
//         <Editor
//           editorState={editorState}
//           handleKeyCommand={handleKeyCommand}
//           keyBindingFn={myKeyBindingFn}
//           onChange={onChange}
//         />
//       </div>
//       <div className="text-center border-t gap-2">
//         <button onClick={onUnderlineClick}>U</button>
//         <button onClick={onBoldClick}>
//           <b>B</b>
//         </button>
//         <button onClick={onItalicClick}>
//           <em>I</em>
//         </button>
//       </div>
//     </div>
//   )
// }

// export { MessageEditor }
