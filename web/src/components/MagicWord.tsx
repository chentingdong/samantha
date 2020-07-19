// connect a word like "todo" as keyboard magic sequence.
import * as React from "react"
import KeyboardEventHandler from "react-keyboard-event-handler"

interface MagicWordProps {
  // Type showWord to show
  showWord: string
  // Type hideWord to hide
  hideWord: string
  show: boolean
  setShow: (boolean) => void
}

export const MagicWord: React.FC<MagicWordProps> = ({
  showWord,
  hideWord,
  show = false,
  setShow,
  ...props
}) => {
  if (process.env.NODE_ENV === "production") return <></>

  const charList = "abcdefghijklmnopqrstuvwxyz0123456789".split("")

  let wordStream = ""
  const addToStream = (key) => {
    wordStream += key
    if (wordStream.length > 4) wordStream = wordStream.substring(1)
    if (wordStream === showWord) setShow(true)
    else if (wordStream === hideWord) setShow(false)
  }

  return (
    <div className="hidden">
      <KeyboardEventHandler
        handleKeys={charList}
        onKeyEvent={(key, e) => addToStream(key)}
      ></KeyboardEventHandler>
    </div>
  )
}
