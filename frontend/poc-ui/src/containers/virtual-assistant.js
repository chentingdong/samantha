import React, { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import config from '../config'
import { DebounceInput } from 'react-debounce-input';
import Cases from '../components/cases'
import Tasks from '../components/tasks'
import Suggest from '../components/suggest'

function VirtualAssistant (props) {
  let initialMessage = {
    id: 1,
    who: 'agent',
    message: 'Welcome to Bellhop Virtual Assistant :), please start typing and follow our instructions.'
  }

  const [ messages, setMessages ] = useState([ initialMessage ])
  const [ currentMessage, setCurrentMessage ] = useState('')
  const [ currentCaseId, setCurrentCaseId ] = useState()

  let [ selectedSuggestion, setselectedSuggestion ] = useState(0)
  const suggestRef = useRef();

  let wsNew = new WebSocket(config.wsUrl)
  let [ ws, setWs ] = useState(wsNew)

  useEffect(() => {
    ws.onmessage = event => {
      // TODO: ws returns string instead of json, shouldn't need to parse here.
      const message = JSON.parse(event.data).body.utterance
      agentMessage(message)
    }

    ws.onclose = () => {
      console.log('Disconnected websocket ' + config.wsUrl)
      setWs(wsNew)
    }
  })

  async function userMessage (message) {
    setCurrentMessage(message)

    let newMessage = {
      id: messages.length + 1,
      who: 'user',
      message: message
    }

    setMessages([ ...messages, newMessage ])

    const payload = {
      "action": "interaction",
      "task": message
    }

    await ws.send(JSON.stringify(payload))
    setCurrentMessage('')
  }

  function agentMessage (msg) {
    console.log("received message: " + JSON.stringify(msg))
    let newMessage = {
      id: messages.length + 1,
      who: 'agent',
      message: msg
    }
    setMessages([ ...messages, newMessage ])
  }

  function getCaseMessages ( ) {
    // TODO: /GET /case-messages?case-id={currentCaseId}
    let resp = [initialMessage]

    setMessages(resp)
  }

  useEffect( () => {
    getCaseMessages( currentCaseId );
  }, [ currentCaseId ] )

  const style = {
    sendButton: {
      position: 'absolute',
      right: '0.5em',
      bottom: '0.4em',
      fontSize: '1.5em'
    }
  }

  return (
    <div className="container-fluid">
      <Cases className="mt-1 row" currentCaseId={currentCaseId} setCurrentCaseId={setCurrentCaseId}/>
      <Tasks userMessage={userMessage} agentMessage={agentMessage} currentCaseId={currentCaseId}/>
      <hr />
      <div className="messages">
        {messages.map((msg, index) => {
          return (
            <div key={index} className="small">
              <span className="mr-3">
                {(() => {
                  switch (msg.who) {
                    case "user": return <FontAwesomeIcon icon="user" />;
                    case "agent": return <FontAwesomeIcon icon="robot" />;
                    default: return <FontAwesomeIcon icon="bomb" />;
                  }
                })()}
              </span>
              <span>{msg.message}</span>
            </div>
          )
        })}
      </div>
      <Suggest
        currentMessage={currentMessage}
        setCurrentMessage={setCurrentMessage}
        userMessage={userMessage}
        ref={suggestRef}
        selectedSuggestion={selectedSuggestion}
        setselectedSuggestion={setselectedSuggestion}
      />
      <div className="fixed-bottom m-1">
        <DebounceInput
          className="col-12 input-message"
          minLength={2}
          debounceTimeout={100}
          autoFocus={true}
          value={currentMessage}
          onChange={e => { setCurrentMessage(e.target.value) }}
          onKeyDown={e => {suggestRef.current.handleKeyDown(e, selectedSuggestion)}}
        />
        <FontAwesomeIcon icon="bell" className="clickable" style={style.sendButton}/>
      </div>
    </div>
  )
}

export default VirtualAssistant