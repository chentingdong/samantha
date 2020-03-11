import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {DebounceInput} from 'react-debounce-input';
import config from '../config'

function Suggest (props) {
  let [value, setValue] = useState('');
  let initialSuggestions = []
  let [suggestions, setSuggestions] = useState([])
  let suggestUrl = config.suggestUrl

  function getSuggestions(e) {
    setValue(e.target.value)
    let url = suggestUrl + '/' + e.target.value

    return axios
      .get(url)
      .then((resp) => {
        setSuggestions(resp.data)
      })
      .catch(() => {
        setSuggestions(initialSuggestions)
      })
  }

  useEffect(() => {
    console.log(`Got suggestions: ${suggestions}`)
  }, [suggestions])

  return (
    <div className="container">
      <DebounceInput
        minLength={2}
        debounceTimeout={300}
        value={value}
        onChange={getSuggestions}
      />
      <ul>
        {
          suggestions.map((value, index) => {
            return <li key={index} dangerouslySetInnerHTML={{__html: value}}></li>
          })
        }
      </ul>
    </div>
  );
};
export default Suggest;