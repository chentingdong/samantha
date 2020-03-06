import axios from 'axios';
import config from '../config'

console.log( config.caseApiUrl )
const apiWrapper = axios.create( {
  headers: {
    'content-type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  },
  baseURL: config.apiBaseUrl
} )

export default apiWrapper