import React, { useState, useEffect } from 'react'
import { Navbar } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import config from '../config'
import axios from 'axios'
import parse from 'html-react-parser'
import htmlToText from 'html-to-text'
import { DebounceInput } from 'react-debounce-input';
import RuntimeTools from '../components/runtime-tools'

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
      receiveMessage(message)
    }

    ws.onclose = () => {
      console.log('Disconnected websocket ' + config.wsUrl)
      setWs(wsNew)
    }
  })

  async function sendMessage (message) {
    setCurrentMessage(message)

    let newMessage = {
      id: messageList.length + 1,
      who: 'user',
      message: message
    }

    setMessageList([ ...messageList, newMessage ])

    const payload = {
      "action": "request",
      "task": message
    }

    await ws.send(JSON.stringify(payload))
    setCurrentMessage('')
  }

  function receiveMessage (msg) {
    console.log("received message: " + msg)
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
    return index === activeSuggestion ? 'active' : null
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
        sendMessage(currentMessage)
      }
    }
  }

  // DOM

  return (
    <div className="container-fluid" id="va-dialog">
      <RuntimeTools />
      <div className="messages">
        {messageList.map((msg, index) => {
          return (
            <div key={index}>
              <span>{msg.who}: </span>
              <span>{msg.message}</span>
            </div>
          )
        })}
      </div>
      {(suggestions.length > 0) &&
        <div className="suggestions" style={{ width: '100%' }}>
          <label>Smart suggestions from Bellhop:</label>
          <ul>
            {suggestions.map((suggestion, index) => {
              return (
                <li key={index}
                  className={`col-2 clickable suggestion ${isActiveSuggestion(index)}`}
                  onClick={e => sendMessage(e.target.innerText)}
                  onKeyDown={e => sendMessage(e.target.innerText)}
                  onMouseOver={e => setActiveSuggestion(index)}
                >{index} {parse(suggestion)} </li>
              )
            })}
          </ul>
        </div>
      }
      <Navbar fixed="bottom">
        <DebounceInput
          className="col-12 input-message"
          minLength={2}
          debounceTimeout={100}
          autoFocus={true}
          value={currentMessage}
          onChange={e => { setCurrentMessage(e.target.value) }}
          onKeyDown={e => handleKeyDown(e, activeSuggestion)}
        />
        <FontAwesomeIcon icon={faBell} className="send-button clickable" />
      </Navbar>
    </div>
  )
}

export default VirtualAssistant