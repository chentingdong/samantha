import React, { useState, useEffect } from 'react'
import { Navbar } from 'react-bootstrap'
import './virtual-assistant.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import config from '../config'
import axios from 'axios'
import Parser from 'html-react-parser'
import { DebounceInput } from 'react-debounce-input';

function VirtualAssistant (props) {
  let initialMessage = {
    id: 1,
    who: 'agent',
    message: 'Welcome...'
  }

  let [ messageList, setMessageList ] = useState([ initialMessage ])
  let [ currentMessage, setCurrentMessage ] = useState('')
  let [ suggestions, setSuggestions ] = useState([])

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
  }, [ ws ])

  // messages
  async function sendMessage (message) {
    setCurrentMessage(message)

    let newMessage = {
      // TODO: use uuid for id?
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
  }

  // autocomplete
  function suggest () {
    let url = config.suggestUrl + '/' + currentMessage
    axios
      .get(url)
      .then((resp) => {
        console.log(resp.data)
        setSuggestions(resp.data)
      })
      .catch(() => {
        setSuggestions([])
      })
  }

  useEffect(suggest, [ currentMessage ])

  // DOM
  return (
    <div className="container-fluid">
      <div className="messages">
        {messageList.map((msg, index) => {
          return (
            <div key={index}>
              <span>{msg.who}:</span>
              <span>{msg.message}</span>
            </div>
          )
        })}
      </div>
      <div className="suggestions" style={{ width: '100%' }}>
        {suggestions.length > 0 &&
          <label>I guess you mean:</label>
        }
        <ul>
          {suggestions.map((suggestion) => {
            return <li onClick={e => sendMessage(e.target.innerText)}>{Parser(suggestion)}</li>
          })}
        </ul>
      </div>
      <Navbar fixed="bottom" className="">
        <form className="col-12" onSubmit={e => { e.preventDefault(); sendMessage(currentMessage) }} >
          <DebounceInput
            className="col-12 input-message"
            minLength={2}
            debounceTimeout={300}
            autoFocus="true"
            value={currentMessage}
            onChange={e => { setCurrentMessage(e.target.value); suggest() }}
          />
        </form>
        <FontAwesomeIcon icon={faBell} className="send-button clickable" onClick={e => { sendMessage(e.target.value) }} />
      </Navbar>
    </div>
  )
}

export default VirtualAssistant