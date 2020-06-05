import axios from 'axios';
import config from '../config'

const apiWrapper = axios.create( {
  baseURL: config.apiBaseUrl
} )

export default apiWrapper