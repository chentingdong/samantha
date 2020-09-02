import "quill/dist/quill.snow.css"
import "quill-mention"

import React, { useEffect, useState } from "react"
import { useMutation, useQuery } from "@apollo/client"

import Amplify from "@aws-amplify/core"
import { GET_USERS } from "operations/queries/getUsers"
import ImageUploader from "quill-image-uploader"
import { Loading } from "components/Misc"
import Quill from "quill"
import Storage from "@aws-amplify/storage"
import axios from "axios"
import config from "../../../configs/config"
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
  const [editor, setEditor] = useState()
  const { data: usersResult, loading: loadingUser } = useQuery(GET_USERS)
  Quill.register("modules/imageUploader", ImageUploader)

  Amplify.configure(config)

  useEffect(() => {
    const quill = new Quill("#editor", {
      theme: "snow",
      modules: {
        toolbar: "#toolbar",
        imageUploader: {
          upload: (file) => {
            return new Promise((resolve, reject) => {
              try {
                const imageUrl = handleUpload(file)
                return resolve(imageUrl)
              } catch {
                reject("upload image failed")
              }
            })
          },
        },
        keyboard: {
          bindings: {
            linebreak: {
              key: 13, //enter
              shiftKey: false,
              handler: async () => {
                await onSave(quill.root.innerHTML)
                setContent("")
                quill.root.innerHTML = ""
              },
            },
          },
        },
        mention: {
          allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
          mentionDenotationChars: ["@"],
          source: async function (searchTerm, renderList) {
            const mentioniedPeople = await mentionPeople(searchTerm)
            renderList(mentioniedPeople)
          },
        },
      },
    })
    setEditor(quill)
  }, [])

  const mentionPeople = async (searchTerm) => {
    const allPeople = usersResult?.m2_users.map((user) => ({
      id: user.id,
      value: user.name,
    }))
    return allPeople.filter((person) => person.value.includes(searchTerm))
  }

  const handleUpload = async (file) => {
    Storage.configure(config.Storage)
    console.log(file)

    let resp, imageUrl
    try {
      resp = await Storage.put(`${file.name}`, file, {
        contentType: file.type,
      })
      imageUrl = await Storage.get(resp["key"])
    } catch (err) {
      console.error(`Failed uploading file, ${err}`)
    }

    return imageUrl
  }

  if (loadingUser) return <Loading />

  return (
    <div {...props}>
      <div id="editor" suppressContentEditableWarning>
        {content}
      </div>
      <div id="toolbar" className="border-t-0">
        <button className="ql-bold" />
        <button className="ql-italic" value="italic" />
        <button className="ql-strike" value="strike" />
        <button className="ql-underline" value="underline" />
        <button className="ql-code-block" value="code-block" />
        <button className="float-right ql-image" value="image" />
      </div>
    </div>
  )
}

const MessageEditor = styled(MessageEditorRaw)`
  .ql-snow .ql-editor pre.ql-syntax {
    ${tw`bg-gray-300 text-gray-900 overflow-visible`}
  }
  .ql-mention-list-container {
    ${tw`bg-gray-300 p-2 mb-4`}
    .ql-mention-list-item {
      ${tw`cursor-pointer p-2`}
    }
  }
  #toolbar button {
    ${tw`m-0 p-0 shadow w-4 h-4 m-2 bg-yellow-300`}
    border-radius: 50%;
    min-width: 0;
    overflow: hidden;
  }
`

export { MessageEditor }
