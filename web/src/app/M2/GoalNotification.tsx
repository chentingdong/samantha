// GoalNotification.ts
// Goal working view - conversational
import React from "react"
import { notifications } from "../../../data/notification"
import { UI_STATE } from "../../operations/queries/uiState"
import { useQuery } from "@apollo/client"

interface GoalNotificationProps {}

export const GoalNotification: React.FC<GoalNotificationProps> = (props) => {
  const {
    data: { uiState },
    loading,
  } = useQuery(UI_STATE)

  return (
    <div className="">
      {/* {uiState.showNotification && ( */}
      <div>
        {notifications?.map((notification, index) => {
          return (
            <div
              key={index}
              className={
                notification.from === "Bellhop" ? "text-left" : "text-right"
              }
            >
              {notification.content}asdf
            </div>
          )
        })}
      </div>
      {/* )} */}
    </div>
  )
}
