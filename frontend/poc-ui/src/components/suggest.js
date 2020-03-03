import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react'
import axios from 'axios'
import htmlToText from 'html-to-text'
import config from '../config'

/**
* @author tchen@bellhop.io
* @function Suggest
**/

const Suggest = forwardRef((props, ref) => {
  const {activeSuggestion, setActiveSuggestion} = props

  // const Suggest = (props) => {
  const { currentMessage, setCurrentMessage, userMessage } = props

  let [ suggestions, setSuggestions ] = useState([])

  // autocomplete
  function suggest () {
    if (currentMessage !== '') {
      let url = config.suggestUrl + '/' + currentMessage

      axios
        .get(url)
        .then((resp) => {
          setSuggestions(resp.data)
        })
        .catch((err) => {
          console.error(err)
        })
    }
  }

  // suggest input when currentMessage changes
  useEffect(suggest, [ currentMessage ])

  useImperativeHandle(ref, () => ({
    handleKeyDown (e, activeSuggestion) {
      // arrow down, next suggestoins
      if (e.which === 40) {
        e.preventDefault()
        if (activeSuggestion === suggestions.length - 1) {
          setActiveSuggestion(0)
        } else {
          setActiveSuggestion(activeSuggestion + 1)
        }
      }
      // arrow up, prev suggestoins
      else if (e.which === 38) {
        if (activeSuggestion === 0) {
          setActiveSuggestion(suggestions.length - 1)
        } else {
          setActiveSuggestion(activeSuggestion - 1)
        }
      }
      // enter, send message to ws
      else if (e.which === 13) {
        if (suggestions.length > 0) {
          const msg = htmlToText.fromString(suggestions[ activeSuggestion ])
          setCurrentMessage(msg)
          setSuggestions([])
        } else {
          userMessage(currentMessage)
        }
      }
    }
  }));


  return (
    <div>
      {(suggestions.length > 0) &&
        <div className="container-fluid fixed-bottom mb-5">
          <label>Bellhop suggestions:</label><br />
          <div className="row">
            {suggestions.map((suggestion, index) => {
              suggestion = htmlToText.fromString(suggestion)
              const activeClass = (index === activeSuggestion) ? 'btn-light' : null
              return (
                <div key={index}
                  className={`col-12 clickable suggestion ${activeClass}`}
                  onClick={e => userMessage(suggestion)}
                  onKeyDown={e => userMessage(suggestion)}
                  onMouseOver={e => setActiveSuggestion(index)}
                >{index}. {suggestion} </div>
              )
            })}
          </div>
        </div>
      }
    </div>
  )
});

export default Suggest