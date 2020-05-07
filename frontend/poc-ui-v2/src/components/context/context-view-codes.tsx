import React, { useContext } from 'react'
import AceEditor from 'react-ace'
import 'ace-builds/src-noconflict/mode-json'
import 'ace-builds/src-noconflict/theme-github'
import { Context } from './store'

export const ContextViewCodes = () => {
  const { state, dispatch } = useContext(Context)
  return (
    <div>
      <h5>context</h5>
      <AceEditor
        mode="json"
        theme="github"
        name="context"
        width="100%"
        maxLines={Infinity}
        editorProps={{ $blockScrolling: true }}
        value={JSON.stringify(state, null, 2)}
      />
    </div>
  )
}
