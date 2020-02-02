import React, { useState, useEffect } from 'react'
import { Navbar } from 'react-bootstrap'
import './virtual-assistant.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import config from '../config'
import { Card } from 'react-bootstrap'
import axios from 'axios'
import Parser from 'html-react-parser'

function VirtualAssistant (props) {
  let initialMessageList = [ {
    id: 1,
    who: 'agent',
    message: 'Welcome.'
  } ]

  let [ messageList, setMessageList ] = useState(initialMessageList)
  let [ currentMessage, setCurrentMessage ] = useState('')
  let [ suggestions, setSuggestions ] = useState([])

  // websocket
  // let wsNew = new WebSocket(config.wsUrl)
  // let [ ws, setWs ] = useState(wsNew)

  // useEffect(() => {
  //   ws.onmessage = event => {
  //     const message = event.data
  //     receiveMessage(message)
  //   }

  //   ws.onclose = () => {
  //     console.log('Disconnected websocket ' + config.wsUrl)
  //     setWs(wsNew)
  //   }
  // }, [ws])


  // messages
  async function sendMessage (e) {
    e.preventDefault()

    let newMessage = {
      id: messageList.length + 1,
      who: 'user',
      message: currentMessage,
      blockInput: false
    }

    setMessageList([ ...messageList, newMessage ])

    // const message = {
    //   "action": "request",
    //   "task": currentMessage
    // }

    // await ws.send(JSON.stringify(message))
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
      <Card className="suggestions" style={{ width: '100%' }}>
        {suggestions.length > 0 &&
          <label>I guess you mean:</label>
        }
        <ul>
          {suggestions.map((suggestion, index) => {
            return <li>{Parser(suggestion)}</li>
          })}
        </ul>
      </Card>
      <Navbar fixed="bottom" className="">
        <form className="col-12" onSubmit={sendMessage}>
          <input type="text"
            className="col-12 input-message"
            autoFocus={true}
            value={currentMessage}
            onChange={e => setCurrentMessage(e.target.value)}
          />
        </form>
        <FontAwesomeIcon icon={faBell} className="send-button clickable" onClick={sendMessage} />
      </Navbar>
    </div>
  )
}

export default VirtualAssistant