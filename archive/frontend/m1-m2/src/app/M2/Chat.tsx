import React, { useEffect, useRef } from "react"
import { Placeholder } from "rsuite"
import styled from "styled-components"
import tw from "tailwind.macro"

interface ChatProps {
  className?: string
}

const ChatRaw: React.FC<ChatProps> = (props) => {
  const placeholders = Array.from(Array(5).keys())
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    })
  })

  return (
    <div {...props}>
      <div
        ref={messagesEndRef}
        className="flex flex-col justify-end min-h-full"
      >
        {placeholders.map((placeholder) => {
          return (
            <Placeholder.Paragraph key={placeholder} graph="circle" rows={2} />
          )
        })}
        <div className="mt-4">
          <input type="text" className="w-full" placeholder="type here..." />
        </div>
      </div>
    </div>
  )
}

const Chat = styled(ChatRaw)`
  .rs-placeholder-paragraph {
    margin-top: 20px;
    p {
      margin-top: 5px !important;
      ${tw`bg-gray-500`}
    }
    .rs-placeholder-paragraph-graph {
      height: 30px;
      width: 30px;
      ${tw`bg-gray-500`}
    }
  }
`
export { Chat }
