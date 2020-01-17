import React, { useEffect } from 'react';
import { Widget, toggleWidget, addResponseMessage } from 'react-chat-widget';

import logo from '../assets/astound.png';
import avatar from '../assets/droid.png';
import 'react-chat-widget/lib/styles.css';
import './VirtualAgent.css';


const wsUrl = 'wss://jhempytc66.execute-api.us-east-1.amazonaws.com/test';

function VirtualAgent () {
  let ws = new WebSocket(wsUrl)

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
      ws = new WebSocket(wsUrl)
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

  return (
    <div className="VirtualAgent">
      {/* <Widget
        handleNewUserMessage={handleUserMessage}
        profileAvatar={avatar}
        title=""
        titleAvatar=""
        subtitle="Astound Assist"
        showChat="true"
        showCloseButton="false"
        fullScreenMode="false"
      /> */}
      <Widget handleNewUserMessage={handleUserMessage}
        showCloseButton="false" fullScreenMode="true"/>
    </div>
  );
}

export default VirtualAgent;
