import React, { Component } from 'react';
import { Widget, toggleWidget, addResponseMessage} from 'react-chat-widget';

import './VirtualAgent.css';
import 'react-chat-widget/lib/styles.css';

import logo from '../assets/astound.png';
import avatar from '../assets/droid.png';

const wsUrl = 'wss://jhempytc66.execute-api.us-east-1.amazonaws.com/test';

class App extends Component {
  ws = new WebSocket(wsUrl);

  componentDidMount() {
    toggleWidget();
    this.ws.onopen = () => {
      console.log('connected to websocket ' + wsUrl)
    }
    this.ws.onmessage = event => {
      const message = event.data
      this.handleResponseMessage(message)
    }
    this.ws.onclose = () => {
      console.log('Disconnected websocket ' + wsUrl)
      this.setState({
        ws: new WebSocket(wsUrl),
      })
    }
  }

  handleUserMessage = (utterance) => {
    const message = {
      "action": "request",
      "task": utterance
    }

    this.ws.send(JSON.stringify(message))
  }

  handleResponseMessage = (responseMessage) => {
    console.log(`Got message from websocket: ${responseMessage}`);
    const utterance = JSON.parse(responseMessage).utterance
    addResponseMessage(utterance);
  }

  render() {
    return (
      <div className="App">
        <Widget
          handleNewUserMessage={this.handleUserMessage}
          profileAvatar={avatar}
          title=""
          titleAvatar={logo}
          subtitle="Astound Assist"
          showChat="true"
          fullScreenMode="true"
        />
      </div>
    );
  }
}

export default App;
