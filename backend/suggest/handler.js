'use strict';
const axios = require('axios')
const suggester = 'mySuggester'

async function getSuggestions(utterance) {
  const suggestUrl = 'http://172.31.83.195:8983/solr/gettingstarted/suggest?suggest=true&suggest.build=true&suggest.dictionary=mySuggester&wt=json&suggest.q='
  let url = suggestUrl + utterance
  let suggestions = []

  try {
    const resp = await axios.get(url)
    let suggestionObjects = resp.data.suggest[suggester][utterance].suggestions
    suggestions = suggestionObjects.map(x => x.term)
    console.log("got suggestions ${suggestions}")
    return suggestions
  }
  catch (err) {
    console.log(err)
    return []
  }
}

module.exports.suggest = async event => {
  try {
    let utterance = event.pathParameters.utterance
    let suggestions = await getSuggestions(utterance)

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
        'Access-Control-Allow-Headers': 'Access-Control-Allow-Methods, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
      },
      body: JSON.stringify(suggestions)
    };
  }
  catch (err) {
    console.error(err)
    return {
      statusCode: 500,
      body: JSON.stringify(err)
    }
  }

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};