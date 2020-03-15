import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import config from '../config';
import { DebounceInput } from 'react-debounce-input';
import Cases from '../components/cases';
import Tasks from '../components/tasks';
import Suggest from '../components/suggest';
import apiWrapper from '../libs/api-wrapper';
import { Auth } from 'aws-amplify';
import uuidv4 from 'node-uuid';

function VirtualAssistant ( props ) {
  const [ messages, setMessages ] = useState( [] );
  const [ currentMessage, setCurrentMessage ] = useState( '' );
  const [ currentCaseId, setCurrentCaseId ] = useState();

  let [ selectedSuggestion, setselectedSuggestion ] = useState( 0 );
  const suggestRef = useRef();

  let wsNew = new WebSocket( config.wsUrl, [ 'ws', 'wws' ] );
  let [ ws, setWs ] = useState( wsNew );

  let agent = {
    name: 'agent'
  };

  useEffect( () => {
    ws.onmessage = event => {
      const data = JSON.parse( event.data );
      console.log( data );
      agentMessage( data );
    };

    ws.onopen = () => {
      console.log( 'Connected websocket ' + config.wsUrl );
    };

    ws.onclose = () => {
      console.log( 'Disconnected websocket ' + config.wsUrl );
      setWs( wsNew );
    };
  } );

  async function userMessage ( utterance ) {
    setCurrentMessage( utterance );

    let newMessage = {
      fromUser: Auth.user,
      toUser: agent,
      utterance: utterance,
      createdAt: Date.now()
    };

    setMessages( [ ...messages, { data: newMessage } ] );

    const payload = {
      action: "interaction",
      caseId: currentCaseId,
      data: newMessage
    };

    await ws.send( JSON.stringify( payload ) );
    setCurrentMessage( '' );
  }

  function agentMessage ( utterance ) {
    console.log( "received message: " + JSON.stringify( utterance ) );
    let newMessage = {
      fromUser: agent,
      toUser: Auth.user,
      utterance: utterance
    };
    setMessages( [ ...messages, newMessage ] );
  }

  function getCaseMessages () {
    let path = `/case-messages`;
    let params = {
      caseId: currentCaseId
    };
    apiWrapper
      .get( path, { params: params } )
      .then( resp => {
        if ( !resp.data ) resp.data = [];
        let msgs = resp.data
          .sort( ( a, b ) => ( a.createdAt > b.createdAt ) ? 1 : -1 )
          .map( msg => {
            msg.createdAt = resp.data.createdAt;
            return msg;
          } )

        setMessages( msgs );
      } )
      .catch( err => {
        console.error( err );
      } );
  }

  useEffect( () => {
    getCaseMessages();
  }, [ currentCaseId ] );

  const style = {
    inlineImage: {
      height: "1.5em"
    },
    sendButton: {
      position: 'absolute',
      right: '0.5em',
      bottom: '0.5em'
    },
    inputMessage: {
      fontSize: '1.1em',
      border: '1px solid #999999',
      borderRadius: '5px'
    }
  };

  return (
    <div className="container-fluid">
      <Cases className="mt-1 row"
        currentCaseId={ currentCaseId }
        setCurrentCaseId={ setCurrentCaseId } />
      <Tasks className="mt-1 row"
        agentMessage={ agentMessage }
        currentCaseId={ currentCaseId } />
      <hr />
      <div className="messages">
        { messages &&
          messages.map( ( msg, index ) => {
            return (
              <div key={ index } className="small">
                <span className="mr-1">
                  { ( () => {
                    if ( msg.data.fromUser.name === 'agent' ) {
                      return <FontAwesomeIcon icon="robot" />;
                    }
                    else {
                      return <img src={ msg.data.fromUser.picture } style={ style.inlineImage } />;
                    }
                  } )() }
                </span>
                <span className="mr-1">{ msg.data.createdAt }:</span>
                <span>{ msg.data.utterance }</span>
              </div>
            );
          } ) }
      </div>
      <Suggest
        currentMessage={ currentMessage }
        setCurrentMessage={ setCurrentMessage }
        userMessage={ userMessage }
        ref={ suggestRef }
        selectedSuggestion={ selectedSuggestion }
        setselectedSuggestion={ setselectedSuggestion }
      />
      <div className="fixed-bottom m-1">
        <DebounceInput
          className="col-12"
          style={ style.inputMessage }
          minLength={ 2 }
          debounceTimeout={ 100 }
          autoFocus={ true }
          value={ currentMessage }
          onChange={ e => { setCurrentMessage( e.target.value ); } }
          onKeyDown={ e => { suggestRef.current.handleKeyDown( e, selectedSuggestion ); } }
        />
        <FontAwesomeIcon icon="bell" className="clickable" style={ style.sendButton } />
      </div>
    </div>
  );
}

export default VirtualAssistant;