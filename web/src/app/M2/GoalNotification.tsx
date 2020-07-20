// GoalNotification.ts
// Goal working view - conversational
import React from "react"
import { notifications } from "../../../data/notification"
import { UI_STATE } from "../../operations/queries/uiState"
import { useQuery } from "@apollo/client"
import { Icon } from "rsuite"
import styled from "styled-components"
import tw from "tailwind.macro"
import moment from "moment"
import { setUiState } from "../../operations/mutations/setUiState"

export interface GoalNotificationProps {
  className: string
}

const GoalNotificationRaw: React.FC<GoalNotificationProps> = ({
  className,
  ...props
}) => {
  const {
    data: { uiState },
    loading,
  } = useQuery(UI_STATE)

  return (
    <>
      {uiState.showNotification && (
        <div className={className}>
          <div className={`container mx-auto`} {...props}>
            <div
              className="float-right p-2 overflow-hidden rounded-full cursor-pointer hover:bg-gray-300 active:bg-gray-100"
              onClick={(e) => setUiState({ showNotification: false })}
            >
              <Icon className="text-2xl " icon="close" />
            </div>
            {notifications?.map((notification, index) => {
              return (
                <div
                  key={index}
                  className={notification.from === "Bellhop" ? "others" : "me"}
                >
                  <div className="message">
                    <span>{notification.from} at </span>
                    <span className="mx-2">
                      {moment(notification.created_at).format("MM/DD hh:mm:ss")}
                    </span>
                    <div>
                      {notification.content ||
                        "missing notification content..."}
                    </div>
                  </div>
                </div>
              )
            })}
            <input type="text" />
          </div>
        </div>
      )}
    </>
  )
}

const GoalNotification = styled(GoalNotificationRaw)`
  .others,
  .me {
    ${tw`my-4 p-4`}
    .message {
      ${tw`rounded-lg p-4`}
    }
  }
  .me {
    ${tw`text-right`}
  }
`

export { GoalNotification }
