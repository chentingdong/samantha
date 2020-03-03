import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import config from '../config'
import axios from 'axios'
import parse from 'html-react-parser'
import htmlToText from 'html-to-text'
import { DebounceInput } from 'react-debounce-input';
import RuntimeTools from '../components/runtime-tools'
import Cases from '../components/cases'

function VirtualAssistant (props) {
  let initialMessage = {
    id: 1,
    who: 'agent',
    message: 'Welcome to Bellhop Virtual Assistant :), please start typing and follow our instructions.'
  }

  let [ messageList, setMessageList ] = useState([ initialMessage ])
  let [ currentMessage, setCurrentMessage ] = useState('')
  let [ suggestions, setSuggestions ] = useState([])
  let [ activeSuggestion, setActiveSuggestion ] = useState(0)

  let wsNew = new WebSocket(config.wsUrl)
  let [ ws, setWs ] = useState(wsNew)

  useEffect(() => {
    ws.onmessage = event => {
      const message = event.data
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
      id: messageList.length + 1,
      who: 'user',
      message: message
    }

    setMessageList([ ...messageList, newMessage ])

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
      id: messageList.length + 1,
      who: 'agent',
      message: msg
    }
    setMessageList([ ...messageList, newMessage ])
  }

  // autocomplete
  function suggest () {
    if (currentMessage !== '') {
      let url = config.suggestUrl + '/' + currentMessage

      axios
        .get(url)
        .then((resp) => {
          setSuggestions(resp.data)
        })
        .catch((err) => {
          console.error(err)
        })
    }
  }

  // suggest input when currentMessage changes
  useEffect(suggest, [ currentMessage ])

  function isActiveSuggestion (index) {
    return index === activeSuggestion ? 'btn-light' : null
  }

  function handleKeyDown (e, activeSuggestion) {
    // arrow down, next suggestoins
    if (e.which === 40) {
      e.preventDefault()
      if (activeSuggestion === suggestions.length - 1) {
        setActiveSuggestion(0)
      } else {
        setActiveSuggestion(activeSuggestion + 1)
      }
    }
    // arrow up, prev suggestoins
    else if (e.which === 38) {
      if (activeSuggestion === 0) {
        setActiveSuggestion(suggestions.length - 1)
      } else {
        setActiveSuggestion(activeSuggestion - 1)
      }
    }
    // enter, send message to ws
    else if (e.which === 13) {
      if (suggestions.length > 0) {
        const msg = htmlToText.fromString(suggestions[ activeSuggestion ])
        setCurrentMessage(msg)
        setSuggestions([])
      } else {
        userMessage(currentMessage)
      }
    }
  }

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
      <RuntimeTools userMessage={userMessage} agentMessage={agentMessage} />
      <Cases className="mt-1 row" />
      <hr />
      <div className="messages">
        {messageList.map((msg, index) => {
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
      {(suggestions.length > 0) &&
        <div className="container-fluid fixed-bottom mb-5">
          <label>Bellhop suggestions:</label><br />
          <div className="row">
            {suggestions.map((suggestion, index) => {
              suggestion = parse(suggestion)
              return (
                <div key={index}
                  className={`col-12 clickable suggestion ${isActiveSuggestion(index)}`}
                  onClick={e => userMessage(suggestion)}
                  onKeyDown={e => userMessage(suggestion)}
                  onMouseOver={e => setActiveSuggestion(index)}
                >{index}. {suggestion} </div>
              )
            })}
          </div>
        </div>
      }
      <div className="fixed-bottom m-1">
        <DebounceInput
          className="col-12 input-message"
          minLength={2}
          debounceTimeout={100}
          autoFocus={true}
          value={currentMessage}
          onChange={e => { setCurrentMessage(e.target.value) }}
          onKeyDown={e => handleKeyDown(e, activeSuggestion)}
        />
        <FontAwesomeIcon icon="bell" className="clickable" style={style.sendButton} />
      </div>
    </div>
  )
}

export default VirtualAssistant