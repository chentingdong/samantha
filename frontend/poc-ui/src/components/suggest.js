import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import axios from 'axios';
import htmlToText from 'html-to-text';
import config from '../config';

/**
* @author tchen@bellhop.io
* @function Suggest
**/

const Suggest = forwardRef( ( props, ref ) => {
  const { className, userMessage, currentMessage, setCurrentMessage, selectedSuggestion, setselectedSuggestion } = props;
  let [ suggestions, setSuggestions ] = useState( [] );

  // autocomplete
  function suggest () {
    if ( currentMessage === '' ) {
      setSuggestions( [] );
    }
    else {
      let url = config.suggestUrl + '/' + currentMessage;

      axios
        .get( url )
        .then( ( resp ) => {
          setSuggestions( resp.data );
        } )
        .catch( ( err ) => {
          console.error( err );
        } );
    }
  }

  // suggest input when currentMessage changes
  useEffect( suggest, [ currentMessage ] );

  useImperativeHandle( ref, () => ( {
    handleKeyDown ( e, selectedSuggestion ) {
      // arrow down, next suggestoins
      if ( e.which === 40 ) {
        e.preventDefault();
        if ( selectedSuggestion === suggestions.length - 1 ) {
          setselectedSuggestion( 0 );
        } else {
          setselectedSuggestion( selectedSuggestion + 1 );
        }
      }
      // arrow up, prev suggestoins
      else if ( e.which === 38 ) {
        if ( selectedSuggestion === 0 ) {
          setselectedSuggestion( suggestions.length - 1 );
        } else {
          setselectedSuggestion( selectedSuggestion - 1 );
        }
      }
      // enter, send message to ws
      else if ( e.which === 13 ) {
        if ( suggestions.length > 0 ) {
          const msg = htmlToText.fromString( suggestions[ selectedSuggestion ] );
          setCurrentMessage( msg );
          setSuggestions( [] );
        } else {
          userMessage( currentMessage );
        }
      }
    }
  } ) );


  return (
    <div className={ className }>
      { ( suggestions.length > 0 ) &&
        <div className="container-fluid mb-5">
          <label>Bellhop suggestions:</label><br />
          <div className="row">
            { suggestions.map( ( suggestion, index ) => {
              suggestion = htmlToText.fromString( suggestion );
              const activeClass = ( index === selectedSuggestion ) ? 'btn-light' : null;
              return (
                <div key={ index }
                  className={ `col-12 clickable suggestion ${ activeClass }` }
                  onClick={ e => userMessage( suggestion ) }
                  onKeyDown={ e => userMessage( suggestion ) }
                  onMouseOver={ e => setselectedSuggestion( index ) }
                >{ index }. {suggestion } </div>
              );
            } ) }
          </div>
        </div>
      }
    </div>
  );
} );

export default Suggest;