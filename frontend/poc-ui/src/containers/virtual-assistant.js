import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import config from '../config';
import { DebounceInput } from 'react-debounce-input';
import Cases from '../components/cases';
import Tasks from '../components/tasks';
import CaseMessages from '../components/case-messages';
import Suggest from '../components/suggest';
import apiWrapper from '../libs/api-wrapper';
import { Auth } from 'aws-amplify';
import logo from '../assets/bell.png';

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
      if ( event.data ) {
        const data = JSON.parse( event.data );
        console.log( data );
        agentMessage( data );
      }
    };
  }, [ ws ] );

  useEffect(() => {
    ws.onopen = () => {
      console.log( 'Connected websocket ' + config.wsUrl );
    };

    ws.onclose = () => {
      console.log( 'Disconnected websocket ' + config.wsUrl );
      setWs( wsNew );
    };
  }, []);

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
      utterance: utterance,
      createdAt: Date.now()
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
        if ( !resp.data )
          resp.data = [];

        let msgs = resp.data
          .sort( ( a, b ) => ( a.data.createdAt > b.data.createdAt ) ? 1 : -1 );

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
    sendButton: {
      position: 'absolute',
      right: '0.5em',
      bottom: '0.5em',
      height: "1em"
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
        agent={agent}
        agentMessage={ agentMessage }
        currentCaseId={ currentCaseId } />
      <hr className="row" />
      <CaseMessages className="row"
        messages={ messages }
      />
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
        <img src={ logo } style={ style.sendButton } />
      </div>
    </div>
  );
}

export default VirtualAssistant;