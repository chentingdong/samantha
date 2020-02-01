import React, { useState, useEffect } from 'react';
import { Widget, toggleWidget, addResponseMessage } from 'react-chat-widget';
import avatar from '../assets/droid.png';
import 'react-chat-widget/lib/styles.css';
import './virtual-agent.css';

const wsUrl = 'wss://jhempytc66.execute-api.us-east-1.amazonaws.com/test';

function VirtualAgent () {
  let wsNew = new WebSocket(wsUrl)
  let [ws, setWs] = useState(wsNew)

  useEffect(() => {
    toggleWidget();

    ws.onopen = () => {
      console.log('connected to websocket ' + wsUrl)
    }

    ws.onmessage = event => {
      const message = event.data
      handleResponseMessage(message)
    }

    ws.onclose = () => {
      console.log('Disconnected websocket ' + wsUrl)
      setWs(wsNew)
    }
  })

  let handleUserMessage = (utterance) => {
    const message = {
      "action": "request",
      "task": utterance
    }

    ws.send(JSON.stringify(message))
  }

  let handleResponseMessage = (responseMessage) => {
    console.log(`Got message from websocket: ${responseMessage}`);
    const utterance = JSON.parse(responseMessage).utterance
    addResponseMessage(utterance);
  }

  let suggest = (utterance) => {
    console.log(utterance)
  }

  return (
    <div className="VirtualAgent">
      <Widget
        handleNewUserMessage={handleUserMessage}
        onChange={suggest}
        profileAvatar={avatar}
        showCloseButton="false"
        fullScreenMode="true" />
    </div>
  );
}

export default VirtualAgent;
