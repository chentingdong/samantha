'use strict';
const axios = require('axios')
const suggester = 'mySuggester'

async function getSuggestions(utterance) {
  const solrUrl = config.solrUrlAws

  if (utterance === undefined || '') {
    return []
  }

  try {
    let url = solrUrl + utterance
    const resp = await axios.get(url)
    let suggestionObjects = resp.data.suggest[suggester][utterance].suggestions
    let suggestions = suggestionObjects.map(x => x.term)
    console.log("got suggestions ${suggestions}")
    return suggestions
  }
  catch (err) {
    console.log(err)
    return []
  }
}

module.exports.suggest = async (event, context, callback) => {
  try {
    let utterance = event.pathParameters.utterance
    let suggestions = await getSuggestions(utterance)

    let response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
        'Access-Control-Allow-Headers': 'Access-Control-Allow-Methods, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
      },
      body: JSON.stringify(suggestions)
    };

    callback(null, response);
  }
  catch (err) {
    console.error(err)
    return {
      statusCode: 500,
      body: JSON.stringify(err)
    }
  }
};
