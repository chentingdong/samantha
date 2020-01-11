import React, { Component } from 'react';
import { Widget, toggleWidget, addResponseMessage, addUserMessage} from 'react-chat-widget';

import './App.css';
import 'react-chat-widget/lib/styles.css';

import logo from './astound.png';

const wsUrl = 'wss://czq9z69bt7.execute-api.us-east-1.amazonaws.com/test';

class App extends Component {
  ws = new WebSocket(wsUrl);

  componentDidMount() {
    toggleWidget();
    this.ws.onopen = () => {
      console.log('connected to websocket ' + wsUrl)
    }
    this.ws.onmessage = event => {
      const message = event.data
      addResponseMessage(message)
    }
    this.ws.onclose = () => {
      console.log('Disconnected websocket ' + wsUrl)
      this.setState({
        ws: new WebSocket(wsUrl),
      })
    }
  }

  handleNewUserMessage = (newMessage) => {
    var message = {
      "action":"test",
      "echo": newMessage
    }

    this.ws.send(JSON.stringify(message))
  }

  handleResponseMessage = (responseMessage) => {
    addResponseMessage(responseMessage);
  }

  render() {
    return (
      <div className="App">
        <Widget
          handleNewUserMessage={this.handleNewUserMessage}
          profileAvatar={logo}
          title=""
          titleAvatar={logo}
          subtitle="Astound Assist"
          showChat="true"
          fullScreenMode="true"
          showCloseButton="false"
        />
        <div>
        </div>
      </div>
    );
  }
}

export default App;
