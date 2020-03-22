import React, { useState, useEffect, useRef, useMemo } from 'react';
import config from '../config';
import { DebounceInput } from 'react-debounce-input';
import CasesMenu from '../components/cases-menu';
import Tasks from '../components/tasks';
import CaseMessages from '../components/case-messages';
import Suggest from '../components/suggest';
import apiWrapper from '../libs/api-wrapper';
import { Auth } from 'aws-amplify';
import useWebSocket from 'react-use-websocket';
import '../assets/virtual-assistant.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function VirtualAssistant ( props ) {
  const [ messages, setMessages ] = useState( [] );
  const [ currentMessage, setCurrentMessage ] = useState( '' );
  const [ selectedSuggestion, setselectedSuggestion ] = useState( 0 );
  const suggestRef = useRef();

  const [ currentCaseId, setCurrentCaseId ] = useState();
  const wsOptions = useMemo( () => ( {
    queryParams: {
      'user': JSON.stringify( Auth.user )
    }
  } ), [] );

  // initiate a websocket connection, register connectionId.
  const [ sendMessage, lastMessage, readyState, getWebSocket ] = useWebSocket( config.wsUrl, wsOptions );

  const agentUser = {
    name: 'agent',
    picture: '<Fontawesome icon="robot" />'
  };

  useEffect( () => {
    if ( lastMessage !== null ) {
      agentMessage( lastMessage.data );
    }
  }, [ lastMessage ] );

  function buildMessage ( utterance, who ) {
    return {
      caseId: currentCaseId,
      data: {
        fromUser: who,
        toUser: agentUser,
        utterance: utterance,
        createdAt: Date.now()
      }
    };
  }

  function userMessage ( utterance ) {
    setCurrentMessage( utterance );
    let newMessage = buildMessage( utterance, Auth.user );
    apiWrapper
      .post( '/case-messages', newMessage )
      .then( resp => {
        newMessage.id = resp.data.id;
        setMessages( [ ...messages, newMessage ] );
        console.debug( `user message post success, resp from backend: ${ JSON.stringify( resp ) }` );
      } )
      .catch( err => {
        console.error( `user message post failed, ${ err }` );
      } );

    setCurrentMessage( '' );
  }

  function agentMessage ( utterance ) {
    console.log( "agent message: " + JSON.stringify( utterance ) );
    let newMessage = buildMessage( utterance, agentUser );
    setMessages( [ ...messages, newMessage ] );
  }

  useEffect( () => {
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

          //TODO: dynamodb doesn't easily sort, do sorting in UI for now, until move to rds
          let msgs = resp.data
            .sort( ( a, b ) => ( a.data.createdAt > b.data.createdAt ) ? 1 : -1 );

          setMessages( msgs );
        } )
        .catch( err => {
          console.error( err );
        } );
    }
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
      borderRadius: '5px',
      position: 'fixed',
      bottom: '0',
      width: '100%'
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-3 vh-100 bg-dark">
          <CasesMenu className="text-light bg-dark case-menu row"
            currentCaseId={ currentCaseId } setCurrentCaseId={ setCurrentCaseId } />
        </div>
        <div className="col-6 bg-lighter">
          <Tasks currentCaseId={ currentCaseId } />
        </div>
        <div className="col-3 card">
          <h2 className="mt-4">Activity</h2>
          <hr className="border-dark" />
          <CaseMessages className="row overflow-auto"
            messages={ messages }
          />
          <Suggest className="row suggest"
            style={ style.suggest }
            currentMessage={ currentMessage }
            setCurrentMessage={ setCurrentMessage }
            userMessage={ userMessage }
            ref={ suggestRef }
            selectedSuggestion={ selectedSuggestion }
            setselectedSuggestion={ setselectedSuggestion }
          />
          <div className="row">
            <DebounceInput
              className="col-12 rounded-0 border-left-0"
              placeholder="Message"
              style={ style.inputMessage }
              minLength={ 2 }
              debounceTimeout={ 100 }
              autoFocus={ true }
              value={ currentMessage }
              onChange={ e => { setCurrentMessage( e.target.value ); } }
              onKeyDown={ e => { suggestRef.current.handleKeyDown( e, selectedSuggestion ); } }
            />
            <div style={ style.sendButton }>
              <FontAwesomeIcon icon="location-arrow" className="fa-rotate-315" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VirtualAssistant;