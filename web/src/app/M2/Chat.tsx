import * as React from "react"

interface ChatProps {
  className: string
}

export const Chat: React.FC<ChatProps> = ({ className, ...props }) => {
  return <div className={className}>Chat...</div>
}
