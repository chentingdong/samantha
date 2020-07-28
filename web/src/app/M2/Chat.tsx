import React from "react"

interface ChatProps {}

export const Chat: React.FC<ChatProps> = (props) => {
  return (
    <div {...props}>
      <div className="">messages list...</div>
      <div className="">
        <input type="text" className="w-full" placeholder="type here..." />
      </div>
    </div>
  )
}
