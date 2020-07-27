// Goals.tsx in Bells
import * as React from "react"
import { Participants } from "./Participants"
import { Chat } from "./Chat"

interface GoalsProps {}

export const Goals: React.FC<GoalsProps> = (props) => {
  return (
    <div className="flex-grow p-4 grid grid-cols-3 gap-4">
      <div className="col-span-1 md:col-span-2">Goal list</div>
      <div className="bg-gray-300 border-t col-span-3 md:col-span-1">
        <div className="flex flex-col p-4">
          <Chat className="flex-grow" />
          <Participants className="flex-none" />
        </div>
      </div>
    </div>
  )
}
